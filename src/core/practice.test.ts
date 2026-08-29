import { describe, expect, it } from "vitest";
import { buildPracticeSession } from "./practice";
import { createMulberry32 } from "./random";
import { createIndex } from "../test/fixtures";
import type { Attempt } from "../types/learning-data";

const attempt = (questionId: string, isCorrect: boolean, answeredAt: string): Attempt => ({ id: `${questionId}-${answeredAt}`, examId: "demo", questionId, sessionId: "session", selectedAnswer: ["a"], isCorrect, elapsedMs: 1000, answeredAt, mode: "practice" });
describe("buildPracticeSession", () => {
  const questions = createIndex().pack.questions;
  it("未回答と最新誤答を抽出する", () => {
    const attempts = [attempt("q-single", false, "2026-01-01T00:00:00.000Z"), attempt("q-single", true, "2026-01-02T00:00:00.000Z"), attempt("q-multiple", false, "2026-01-01T00:00:00.000Z")];
    const unanswered = buildPracticeSession({ examId: "demo", mode: "unanswered", count: 1 }, questions, attempts, [], new Date(), createMulberry32(1));
    expect(unanswered.ok && unanswered.value.questionIds).toEqual(["q-input"]);
    const incorrect = buildPracticeSession({ examId: "demo", mode: "incorrect", count: 1 }, questions, attempts, [], new Date(), createMulberry32(1));
    expect(incorrect.ok && incorrect.value.questionIds).toEqual(["q-multiple"]);
  });
  it("候補不足を件数付きで返す", () => { expect(buildPracticeSession({ examId: "demo", mode: "random", count: 4 }, questions, [], [], new Date(), createMulberry32(1))).toEqual({ ok: false, error: { code: "insufficient-candidates", availableCount: 3 } }); });
});
