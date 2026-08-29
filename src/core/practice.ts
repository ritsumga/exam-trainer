import type { Question } from "../types/exam-pack";
import type { Attempt, Bookmark } from "../types/learning-data";
import type { RandomSource, Result } from "../types/ports";
import { rankReviewQuestions } from "./review";
import { shuffle } from "./random";

export type PracticeMode = "unanswered" | "incorrect" | "bookmarked" | "domain" | "random" | "weakness" | "explicit";
export type PracticeRequest = {
  examId: string;
  mode: PracticeMode;
  count: number;
  domainIds?: readonly string[];
  explicitQuestionIds?: readonly string[];
};
export type PracticePlan = { questionIds: readonly string[]; mode: PracticeMode };
export type PracticePlanError = {
  code: "invalid-request" | "no-candidates" | "insufficient-candidates" | "unknown-question";
  availableCount?: number;
  questionId?: string;
};

function latestAttempts(attempts: readonly Attempt[]): ReadonlyMap<string, Attempt> {
  const result = new Map<string, Attempt>();
  for (const attempt of attempts) {
    const current = result.get(attempt.questionId);
    if (current === undefined || attempt.answeredAt > current.answeredAt
      || (attempt.answeredAt === current.answeredAt && attempt.id > current.id)) result.set(attempt.questionId, attempt);
  }
  return result;
}

export function buildPracticeSession(
  request: PracticeRequest,
  questions: readonly Question[],
  attempts: readonly Attempt[],
  bookmarks: readonly Bookmark[],
  now: Date,
  random: RandomSource,
): Result<PracticePlan, PracticePlanError> {
  if (!Number.isInteger(request.count) || request.count < 1) return { ok: false, error: { code: "invalid-request" } };
  const available = questions.filter((question) => question.examId === request.examId);
  const byId = new Map(available.map((question) => [question.id, question]));
  const latest = latestAttempts(attempts.filter((attempt) => attempt.examId === request.examId));
  let ids: string[];
  switch (request.mode) {
    case "unanswered": ids = available.filter((question) => !latest.has(question.id)).map((question) => question.id).sort(); break;
    case "incorrect": ids = available.filter((question) => latest.get(question.id)?.isCorrect === false).map((question) => question.id).sort(); break;
    case "bookmarked": {
      const marked = new Set(bookmarks.filter((value) => value.examId === request.examId).map((value) => value.questionId));
      ids = available.filter((question) => marked.has(question.id)).map((question) => question.id).sort(); break;
    }
    case "domain": {
      if (!request.domainIds?.length) return { ok: false, error: { code: "invalid-request" } };
      const selected = new Set(request.domainIds);
      ids = available.filter((question) => selected.has(question.domainId)).map((question) => question.id).sort(); break;
    }
    case "random": ids = shuffle(available.map((question) => question.id), random) as string[]; break;
    case "weakness": ids = rankReviewQuestions(new Set(byId.keys()), attempts, now).map((item) => item.questionId); break;
    case "explicit": {
      if (!request.explicitQuestionIds?.length) return { ok: false, error: { code: "invalid-request" } };
      const missing = request.explicitQuestionIds.find((id) => !byId.has(id));
      if (missing !== undefined) return { ok: false, error: { code: "unknown-question", questionId: missing } };
      ids = [...request.explicitQuestionIds]; break;
    }
  }
  if (ids.length === 0) return { ok: false, error: { code: "no-candidates", availableCount: 0 } };
  if (request.count > ids.length) return { ok: false, error: { code: "insufficient-candidates", availableCount: ids.length } };
  const selected = ids.slice(0, request.count);
  return { ok: true, value: { mode: request.mode, questionIds: request.mode === "weakness" || request.mode === "explicit" ? selected : shuffle(selected, random) } };
}
