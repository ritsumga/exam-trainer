import type { ExamPackIndex } from "../types/exam-pack";
import type { Attempt, CompletedExamSession } from "../types/learning-data";

export type StatisticsRow = { domainId: string; attemptCount: number; correctCount: number; percentage: number };
export type ExamStatistics = {
  attemptCount: number; correctCount: number; percentage: number; studiedQuestionCount: number;
  domainResults: readonly StatisticsRow[]; weaknessDomainId?: string; averageElapsedMs: number;
  mockSessions: readonly CompletedExamSession[];
};

export function aggregateStatistics(index: ExamPackIndex, attempts: readonly Attempt[], sessions: readonly CompletedExamSession[]): ExamStatistics {
  const valid = attempts.filter((attempt) => index.questionById.has(attempt.questionId));
  const correctCount = valid.filter((attempt) => attempt.isCorrect).length;
  const domainResults = index.pack.domains.map((domain) => {
    const rows = valid.filter((attempt) => index.questionById.get(attempt.questionId)?.domainId === domain.id);
    const correct = rows.filter((attempt) => attempt.isCorrect).length;
    return { domainId: domain.id, attemptCount: rows.length, correctCount: correct, percentage: rows.length === 0 ? 0 : correct / rows.length * 100 };
  });
  const weakness = domainResults.filter((row) => row.attemptCount > 0).sort((a, b) => a.percentage - b.percentage || a.domainId.localeCompare(b.domainId))[0];
  const base = {
    attemptCount: valid.length, correctCount, percentage: valid.length === 0 ? 0 : correctCount / valid.length * 100,
    studiedQuestionCount: new Set(valid.map((attempt) => attempt.questionId)).size,
    domainResults, averageElapsedMs: valid.length === 0 ? 0 : valid.reduce((sum, attempt) => sum + attempt.elapsedMs, 0) / valid.length,
    mockSessions: [...sessions].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt) || a.id.localeCompare(b.id)),
  };
  return weakness === undefined ? base : { ...base, weaknessDomainId: weakness.domainId };
}
