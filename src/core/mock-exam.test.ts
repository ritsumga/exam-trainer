import { describe, expect, it } from "vitest";
import { createMockExamPlan } from "./mock-exam";
import { createIndex, singleQuestion } from "../test/fixtures";
import type { Question } from "../types/exam-pack";

function questions(count: number): Question[] { return Array.from({ length: count }, (_, index) => ({ ...singleQuestion, id: `q-${String(index).padStart(2, "0")}`, domainId: index < 2 ? "d-one" : "d-two" })); }
describe("createMockExamPlan", () => {
  it("最大剰余と分野不足再配分を適用し重複させない", () => { const result = createMockExamPlan(createIndex(questions(10)), { questionCount: 6, durationMinutes: 30, seed: 42 }); expect(result.ok).toBe(true); if (result.ok) { expect(new Set(result.value.questionIds).size).toBe(6); expect(result.value.redistributed).toBe(true); expect(result.value.domainAllocations).toEqual([{ domainId: "d-one", initialCount: 3, actualCount: 2, difference: -1 }, { domainId: "d-two", initialCount: 3, actualCount: 4, difference: 1 }]); } });
  it("全体不足を開始前に返す", () => { expect(createMockExamPlan(createIndex(), { questionCount: 4, durationMinutes: 30, seed: 1 })).toEqual({ ok: false, error: { code: "insufficient-total", required: 4, available: 3, shortage: 1 } }); });
  it("固定seedで再現する", () => { const index = createIndex(questions(10)); const first = createMockExamPlan(index, { questionCount: 5, durationMinutes: 30, seed: 123 }); const second = createMockExamPlan(index, { questionCount: 5, durationMinutes: 30, seed: 123 }); expect(first).toEqual(second); });
});
