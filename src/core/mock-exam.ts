import type { ExamPackIndex } from "../types/exam-pack";
import type { DomainAllocation, InProgressExamSession, MockExamResult } from "../types/learning-data";
import type { Result } from "../types/ports";
import { gradeAnswer } from "./scoring";
import { createMulberry32, shuffle } from "./random";

export type MockExamPlan = { questionIds: readonly string[]; domainAllocations: readonly DomainAllocation[]; redistributed: boolean };
export type MockExamPlanError = { code: "invalid-request" | "insufficient-total"; required?: number; available?: number; shortage?: number };

export function createMockExamPlan(
  index: ExamPackIndex,
  request: { questionCount: number; durationMinutes: number; seed: number },
): Result<MockExamPlan, MockExamPlanError> {
  const { exam, domains, questions } = index.pack;
  if (!Number.isInteger(request.questionCount) || request.questionCount < 1 || request.questionCount > exam.exam.questionCount
    || !Number.isInteger(request.durationMinutes) || request.durationMinutes < 1 || request.durationMinutes > exam.exam.durationMinutes
    || !Number.isInteger(request.seed) || request.seed < 0 || request.seed > 0xffffffff) return { ok: false, error: { code: "invalid-request" } };
  if (questions.length < request.questionCount) return { ok: false, error: { code: "insufficient-total", required: request.questionCount, available: questions.length, shortage: request.questionCount - questions.length } };
  const random = createMulberry32(request.seed);
  const weighted = domains.every((domain) => domain.weight !== undefined);
  if (!weighted) {
    const selected = shuffle(questions, random).slice(0, request.questionCount);
    const counts = new Map<string, number>();
    selected.forEach((question) => counts.set(question.domainId, (counts.get(question.domainId) ?? 0) + 1));
    return { ok: true, value: { questionIds: selected.map((question) => question.id), redistributed: false, domainAllocations: domains.map((domain) => ({ domainId: domain.id, initialCount: counts.get(domain.id) ?? 0, actualCount: counts.get(domain.id) ?? 0, difference: 0 })) } };
  }
  const totalWeight = domains.reduce((sum, domain) => sum + (domain.weight ?? 0), 0);
  const details = domains.map((domain) => {
    const quota = request.questionCount * (domain.weight ?? 0) / totalWeight;
    return { domain, quota, remainder: quota - Math.floor(quota), initial: Math.floor(quota) };
  });
  let remaining = request.questionCount - details.reduce((sum, item) => sum + item.initial, 0);
  const order = [...details].sort((a, b) => b.remainder - a.remainder || a.domain.id.localeCompare(b.domain.id));
  for (const item of order) { if (remaining-- <= 0) break; item.initial += 1; }
  const actual = new Map<string, number>();
  let shortage = 0;
  for (const item of details) {
    const count = Math.min(item.initial, index.questionsByDomainId.get(item.domain.id)?.length ?? 0);
    actual.set(item.domain.id, count); shortage += item.initial - count;
  }
  while (shortage > 0) {
    let changed = false;
    for (const item of order) {
      const count = actual.get(item.domain.id) ?? 0;
      const capacity = index.questionsByDomainId.get(item.domain.id)?.length ?? 0;
      if (count < capacity && shortage > 0) { actual.set(item.domain.id, count + 1); shortage -= 1; changed = true; }
    }
    if (!changed) break;
  }
  const selected = details.flatMap((item) => shuffle(index.questionsByDomainId.get(item.domain.id) ?? [], random).slice(0, actual.get(item.domain.id) ?? 0));
  const allocations = details.map((item) => ({ domainId: item.domain.id, initialCount: item.initial, actualCount: actual.get(item.domain.id) ?? 0, difference: (actual.get(item.domain.id) ?? 0) - item.initial }));
  return { ok: true, value: { questionIds: shuffle(selected, random).map((question) => question.id), domainAllocations: allocations, redistributed: allocations.some((item) => item.difference !== 0) } };
}

export function calculateMockExamResult(index: ExamPackIndex, session: InProgressExamSession, submittedAt: Date, reason: "manual" | "deadline"): MockExamResult {
  let answeredCount = 0; let correctCount = 0;
  const incorrectQuestionIds: string[] = []; const unansweredQuestionIds: string[] = [];
  const byDomain = new Map<string, { total: number; correct: number }>();
  for (const questionId of session.questionIds) {
    const question = index.questionById.get(questionId);
    if (question === undefined) continue;
    const value = session.answers[questionId];
    const grade = value === undefined ? undefined : gradeAnswer(question, value);
    const state = byDomain.get(question.domainId) ?? { total: 0, correct: 0 }; state.total += 1;
    if (grade?.isAnswered) { answeredCount += 1; if (grade.isCorrect) { correctCount += 1; state.correct += 1; } else incorrectQuestionIds.push(questionId); }
    else unansweredQuestionIds.push(questionId);
    byDomain.set(question.domainId, state);
  }
  const deadline = new Date(session.deadline).valueOf();
  const end = reason === "deadline" ? Math.min(submittedAt.valueOf(), deadline) : submittedAt.valueOf();
  return {
    totalCount: session.questionIds.length, answeredCount, correctCount,
    percentage: session.questionIds.length === 0 ? 0 : correctCount / session.questionIds.length * 100,
    elapsedMs: Math.max(0, end - new Date(session.startedAt).valueOf()),
    domainResults: index.pack.domains.map((domain) => { const state = byDomain.get(domain.id) ?? { total: 0, correct: 0 }; return { domainId: domain.id, totalCount: state.total, correctCount: state.correct, percentage: state.total === 0 ? 0 : state.correct / state.total * 100 }; }),
    incorrectQuestionIds, unansweredQuestionIds, flaggedQuestionIds: [...session.flaggedQuestionIds],
  };
}
