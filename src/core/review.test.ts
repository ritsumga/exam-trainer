import { describe, expect, it } from "vitest";
import { rankReviewQuestions } from "./review";
import type { Attempt } from "../types/learning-data";

const value = (questionId: string, isCorrect: boolean, id: string, confidence?: 1 | 2 | 3 | 4): Attempt => ({ id, examId: "demo", questionId, sessionId: "s", selectedAnswer: ["a"], isCorrect, elapsedMs: 120000, ...(confidence === undefined ? {} : { confidence }), answeredAt: "2026-01-01T00:00:00.000Z", mode: "practice" });
describe("rankReviewQuestions", () => {
  it("6要素で得点し、Pack外と履歴なしを除外する", () => { const result = rankReviewQuestions(new Set(["a", "b", "no-attempt"]), [value("a", false, "1", 1), value("b", true, "2", 4), value("outside", false, "3")], new Date("2026-01-31T00:00:00.000Z")); expect(result.map((row) => row.questionId)).toEqual(["a", "b"]); expect(result[0]?.rawPriority).toBeGreaterThan(result[1]?.rawPriority ?? 0); });
});
