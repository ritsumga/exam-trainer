import type { Attempt } from "../types/learning-data";

export type ReviewPriority = {
  questionId: string;
  rawPriority: number;
  displayPriority: number;
  latestAnsweredAt: string;
};

export function rankReviewQuestions(
  questionIds: ReadonlySet<string>,
  attempts: readonly Attempt[],
  now: Date,
): readonly ReviewPriority[] {
  const grouped = new Map<string, Attempt[]>();
  for (const attempt of attempts) {
    if (!questionIds.has(attempt.questionId)) continue;
    const group = grouped.get(attempt.questionId) ?? [];
    group.push(attempt);
    grouped.set(attempt.questionId, group);
  }
  const result: ReviewPriority[] = [];
  for (const [questionId, group] of grouped) {
    group.sort((a, b) => a.answeredAt.localeCompare(b.answeredAt) || a.id.localeCompare(b.id));
    const latest = group.at(-1);
    if (latest === undefined) continue;
    let streak = 0;
    for (let index = group.length - 1; index >= 0 && streak < 3; index -= 1) {
      if (!group[index]?.isCorrect) break;
      streak += 1;
    }
    const correctCount = group.filter((attempt) => attempt.isCorrect).length;
    const ageDays = Math.max(0, (now.valueOf() - new Date(latest.answeredAt).valueOf()) / 86_400_000);
    const recentWrong = latest.isCorrect ? 0 : 1;
    const errorRate = 1 - correctCount / group.length;
    const lowConfidence = latest.confidence === undefined ? 0.5 : (4 - latest.confidence) / 3;
    const elapsedFactor = Math.min(latest.elapsedMs / 120_000, 1);
    const ageFactor = Math.min(ageDays / 30, 1);
    const streakFactor = 1 - streak / 3;
    const rawPriority = 30 * recentWrong + 25 * errorRate + 15 * lowConfidence
      + 10 * elapsedFactor + 10 * ageFactor + 10 * streakFactor;
    result.push({ questionId, rawPriority, displayPriority: Math.round(rawPriority), latestAnsweredAt: latest.answeredAt });
  }
  return result.sort((a, b) => b.rawPriority - a.rawPriority
    || a.latestAnsweredAt.localeCompare(b.latestAnsweredAt)
    || a.questionId.localeCompare(b.questionId));
}
