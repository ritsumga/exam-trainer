import { describe, expect, it } from "vitest";
import { rankReviewQuestions } from "./review";
import type { Attempt } from "../types/learning-data";

const value = (questionId: string, isCorrect: boolean, id: string, confidence?: 1 | 2 | 3 | 4, answeredAt = "2026-01-01T00:00:00.000Z", elapsedMs = 120_000): Attempt => ({ id, examId: "demo", questionId, sessionId: "s", selectedAnswer: ["a"], isCorrect, elapsedMs, ...(confidence === undefined ? {} : { confidence }), answeredAt, mode: "practice" });
describe("rankReviewQuestions", () => {
  it("6要素で得点し、Pack外と履歴なしを除外する", () => { const result = rankReviewQuestions(new Set(["a", "b", "no-attempt"]), [value("a", false, "1", 1), value("b", true, "2", 4), value("outside", false, "3")], new Date("2026-01-31T00:00:00.000Z")); expect(result.map((row) => row.questionId)).toEqual(["a", "b"]); expect(result[0]?.rawPriority).toBeGreaterThan(result[1]?.rawPriority ?? 0); });
  it("6要素の下限・中間・上限と未来日時を規定式へ適用する", () => {
    const maximum = rankReviewQuestions(new Set(["max"]), [value("max", false, "1", 1)], new Date("2026-01-31T00:00:00.000Z"))[0];
    expect(maximum?.rawPriority).toBe(100);
    const minimum = rankReviewQuestions(new Set(["min"]), [value("min", true, "1", 4, "2026-02-01T00:00:00.000Z", 0), value("min", true, "2", 4, "2026-02-01T00:00:01.000Z", 0), value("min", true, "3", 4, "2026-02-01T00:00:02.000Z", 0)], new Date("2026-01-31T00:00:00.000Z"))[0];
    expect(minimum?.rawPriority).toBe(0);
    const middle = rankReviewQuestions(new Set(["mid"]), [value("mid", true, "1", undefined, "2026-01-16T00:00:00.000Z", 60_000)], new Date("2026-01-31T00:00:00.000Z"))[0];
    expect(middle?.rawPriority).toBeCloseTo(7.5 + 5 + 5 + 20 / 3);
  });
  it("同点時は最終回答日時の昇順、次にquestionIdの昇順で並べる", () => {
    const attempts = [value("c", false, "1", 2, "2026-02-02T00:00:00.000Z"), value("b", false, "2", 2, "2026-02-01T00:00:00.000Z"), value("a", false, "3", 2, "2026-02-01T00:00:00.000Z")];
    expect(rankReviewQuestions(new Set(["a", "b", "c"]), attempts, new Date("2026-01-01T00:00:00.000Z")).map((row) => row.questionId)).toEqual(["a", "b", "c"]);
  });
});
