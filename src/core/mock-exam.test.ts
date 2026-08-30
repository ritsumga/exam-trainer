import { describe, expect, it } from "vitest";
import { calculateMockExamResult, createMockExamPlan } from "./mock-exam";
import { createIndex, multipleQuestion, singleQuestion } from "../test/fixtures";
import type { Question } from "../types/exam-pack";
import type { InProgressExamSession } from "../types/learning-data";

function questions(count: number): Question[] { return Array.from({ length: count }, (_, index) => ({ ...singleQuestion, id: `q-${String(index).padStart(2, "0")}`, domainId: index < 2 ? "d-one" : "d-two" })); }
describe("createMockExamPlan", () => {
  it("最大剰余と分野不足再配分を適用し重複させない", () => { const result = createMockExamPlan(createIndex(questions(10)), { questionCount: 6, durationMinutes: 30, seed: 42 }); expect(result.ok).toBe(true); if (result.ok) { expect(new Set(result.value.questionIds).size).toBe(6); expect(result.value.redistributed).toBe(true); expect(result.value.domainAllocations).toEqual([{ domainId: "d-one", initialCount: 3, actualCount: 2, difference: -1 }, { domainId: "d-two", initialCount: 3, actualCount: 4, difference: 1 }]); } });
  it("全体不足を開始前に返す", () => { expect(createMockExamPlan(createIndex(), { questionCount: 4, durationMinutes: 30, seed: 1 })).toEqual({ ok: false, error: { code: "insufficient-total", required: 4, available: 3, shortage: 1 } }); });
  it("固定seedで再現する", () => { const index = createIndex(questions(10)); const first = createMockExamPlan(index, { questionCount: 5, durationMinutes: 30, seed: 123 }); const second = createMockExamPlan(index, { questionCount: 5, durationMinutes: 30, seed: 123 }); expect(first).toEqual(second); });
  it("最大剰余が同率ならdomainId昇順で枠を付与する", () => { const result = createMockExamPlan(createIndex(questions(10)), { questionCount: 1, durationMinutes: 1, seed: 1 }); expect(result.ok && result.value.domainAllocations).toEqual([{ domainId: "d-one", initialCount: 1, actualCount: 1, difference: 0 }, { domainId: "d-two", initialCount: 0, actualCount: 0, difference: 0 }]); });
  it("weight欠落時は抽出結果を数えて配分とする", () => { const index = createIndex(questions(10), [{ id: "d-one", name: "分野1" }, { id: "d-two", name: "分野2" }]); const result = createMockExamPlan(index, { questionCount: 5, durationMinutes: 30, seed: 1 }); expect(result.ok).toBe(true); if (result.ok) { expect(result.value.redistributed).toBe(false); expect(result.value.domainAllocations.reduce((sum, row) => sum + row.actualCount, 0)).toBe(5); } });
  it.each([
    [0, 1], [51, 1], [1.5, 1], [1, 0], [1, 61], [1, 1.5],
  ])("問題数%s・時間%sを境界外として拒否する", (questionCount, durationMinutes) => { expect(createMockExamPlan(createIndex(questions(50)), { questionCount, durationMinutes, seed: 1 })).toEqual({ ok: false, error: { code: "invalid-request" } }); });
  it.each([[1, 1], [50, 60]])("問題数%s・時間%sを受理する", (questionCount, durationMinutes) => { expect(createMockExamPlan(createIndex(questions(50)), { questionCount, durationMinutes, seed: 1 }).ok).toBe(true); });
  it("期限提出では未回答を分母へ含め、deadlineで回答時間を打ち切る", () => {
    const session: InProgressExamSession = { id: "session", examId: "demo", status: "in-progress", revision: 1, seed: 1, questionIds: [singleQuestion.id, multipleQuestion.id], domainAllocations: [], answers: { [singleQuestion.id]: ["a"] }, flaggedQuestionIds: [multipleQuestion.id], currentIndex: 1, startedAt: "2026-01-01T00:00:00.000Z", deadline: "2026-01-01T00:10:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" };
    const result = calculateMockExamResult(createIndex([singleQuestion, multipleQuestion]), session, new Date("2026-01-01T00:20:00.000Z"), "deadline");
    expect(result).toMatchObject({ totalCount: 2, answeredCount: 1, correctCount: 1, percentage: 50, elapsedMs: 600_000, unansweredQuestionIds: [multipleQuestion.id], flaggedQuestionIds: [multipleQuestion.id] });
  });
});
