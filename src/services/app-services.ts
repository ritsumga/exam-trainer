import { buildPracticeSession, type PracticeRequest } from "../core/practice";
import { createMockExamPlan } from "../core/mock-exam";
import { createMulberry32 } from "../core/random";
import { aggregateStatistics } from "../core/statistics";
import { examPackCatalog } from "../data/exam-pack-catalog";
import { learningRepository, parseBackup, serializeBackup } from "../db/repository";
import { examSessionSchema, type ExamSession } from "../schemas/learning-data";
import type { Question } from "../types/exam-pack";

export const services = {
  catalog: examPackCatalog,
  repository: learningRepository,
  async createPractice(examId: string, request: Omit<PracticeRequest, "examId">) {
    const [index, attempts, bookmarks] = await Promise.all([examPackCatalog.load(examId), learningRepository.listAttempts(examId), learningRepository.listBookmarks(examId)]);
    return buildPracticeSession({ ...request, examId }, index.pack.questions, attempts, bookmarks, new Date(), createMulberry32(crypto.getRandomValues(new Uint32Array(1))[0] ?? 0));
  },
  async savePracticeAnswer(question: Question, sessionId: string, selectedAnswer: readonly string[], elapsedMs: number) {
    return learningRepository.addPracticeAttempt({ question, sessionId, selectedAnswer, elapsedMs, answeredAt: new Date().toISOString() });
  },
  async previewMock(examId: string, questionCount: number, durationMinutes: number, seed: number) {
    return createMockExamPlan(await examPackCatalog.load(examId), { questionCount, durationMinutes, seed });
  },
  async createMock(examId: string, questionCount: number, durationMinutes: number, seed = crypto.getRandomValues(new Uint32Array(1))[0] ?? 0): Promise<ExamSession> {
    const index = await examPackCatalog.load(examId);
    const plan = createMockExamPlan(index, { questionCount, durationMinutes, seed });
    if (!plan.ok) throw new Error(plan.error.code);
    const now = new Date();
    const session = examSessionSchema.parse({ id: crypto.randomUUID(), examId, status: "in-progress", revision: 0, seed, questionIds: plan.value.questionIds, domainAllocations: plan.value.domainAllocations, answers: {}, flaggedQuestionIds: [], currentIndex: 0, startedAt: now.toISOString(), deadline: new Date(now.valueOf() + durationMinutes * 60_000).toISOString(), updatedAt: now.toISOString() });
    return learningRepository.saveExamSession(session, 0);
  },
  async statistics(examId: string) {
    const [index, attempts, sessions] = await Promise.all([examPackCatalog.load(examId), learningRepository.listAttempts(examId), learningRepository.listExamSessions(examId)]);
    return aggregateStatistics(index, attempts, sessions.filter((session) => session.status === "completed"));
  },
  async exportBackup() { return serializeBackup(await learningRepository.readSnapshot()); },
  async previewBackup(text: string) {
    const snapshot = parseBackup(text); const [expectedRevision, current, entries] = await Promise.all([learningRepository.getRevision(), learningRepository.readSnapshot(), examPackCatalog.list()]);
    const knownQuestions = new Set<string>();
    for (const entry of entries) { const index = await examPackCatalog.load(entry.examId); index.pack.questions.forEach((question) => knownQuestions.add(`${entry.examId}\0${question.id}`)); }
    const references = [...snapshot.data.attempts, ...snapshot.data.bookmarks, ...snapshot.data.reviewStates];
    return {
      snapshot, expectedRevision,
      currentCounts: { attempts: current.data.attempts.length, bookmarks: current.data.bookmarks.length, reviewStates: current.data.reviewStates.length, examSessions: current.data.examSessions.length, settings: current.data.settings.length },
      restoredCounts: { attempts: snapshot.data.attempts.length, bookmarks: snapshot.data.bookmarks.length, reviewStates: snapshot.data.reviewStates.length, examSessions: snapshot.data.examSessions.length, settings: snapshot.data.settings.length },
      outsidePackReferences: references.filter((row) => !knownQuestions.has(`${row.examId}\0${row.questionId}`)).length,
    };
  },
};
