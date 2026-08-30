import { describe, expect, it } from "vitest";
import { buildPracticeSession } from "./practice";
import { createMulberry32 } from "./random";
import { createIndex } from "../test/fixtures";
import type { Attempt, Bookmark } from "../types/learning-data";

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
  it("お気に入り・分野別・ランダムを対象内かつ重複なしで抽出する", () => {
    const bookmarks: Bookmark[] = [{ examId: "demo", questionId: "q-single", bookmarked: true, updatedAt: "2026-01-01T00:00:00.000Z" }];
    const bookmarked = buildPracticeSession({ examId: "demo", mode: "bookmarked", count: 1 }, questions, [], bookmarks, new Date(), createMulberry32(1));
    expect(bookmarked.ok && bookmarked.value.questionIds).toEqual(["q-single"]);
    const domain = buildPracticeSession({ examId: "demo", mode: "domain", count: 2, domainIds: ["d-two"] }, questions, [], [], new Date(), createMulberry32(1));
    expect(domain.ok && new Set(domain.value.questionIds)).toEqual(new Set(["q-multiple", "q-input"]));
    const random = buildPracticeSession({ examId: "demo", mode: "random", count: 3 }, questions, [], [], new Date(), createMulberry32(1));
    expect(random.ok && new Set(random.value.questionIds).size).toBe(3);
  });
  it("弱点順と明示順を保持し、未知問題を拒否する", () => {
    const attempts = [attempt("q-single", true, "2026-01-01T00:00:00.000Z"), attempt("q-multiple", false, "2026-01-01T00:00:00.000Z")];
    const weakness = buildPracticeSession({ examId: "demo", mode: "weakness", count: 2 }, questions, attempts, [], new Date("2026-02-01T00:00:00.000Z"), createMulberry32(1));
    expect(weakness.ok && weakness.value.questionIds).toEqual(["q-multiple", "q-single"]);
    const explicit = buildPracticeSession({ examId: "demo", mode: "explicit", count: 2, explicitQuestionIds: ["q-input", "q-single"] }, questions, [], [], new Date(), createMulberry32(1));
    expect(explicit.ok && explicit.value.questionIds).toEqual(["q-input", "q-single"]);
    expect(buildPracticeSession({ examId: "demo", mode: "explicit", count: 1, explicitQuestionIds: ["unknown"] }, questions, [], [], new Date(), createMulberry32(1))).toEqual({ ok: false, error: { code: "unknown-question", questionId: "unknown" } });
  });
  it.each([0, 1.5])("問題数%sを不正条件として拒否する", (count) => { expect(buildPracticeSession({ examId: "demo", mode: "random", count }, questions, [], [], new Date(), createMulberry32(1))).toEqual({ ok: false, error: { code: "invalid-request" } }); });
});
