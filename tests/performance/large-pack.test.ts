import { describe, expect, it } from "vitest";
import { createMockExamPlan } from "../../src/core/mock-exam";
import { rankReviewQuestions } from "../../src/core/review";
import { generatedExamPackSchema } from "../../src/schemas/exam-pack";
import { createExamPackFixture, createFixtureAttempts, createFixtureIndex } from "../fixtures/exam-packs/factory";

function maximumDuration(run: () => void): number {
  run();
  const durations = Array.from({ length: 5 }, () => { const startedAt = performance.now(); run(); return performance.now() - startedAt; });
  return Math.max(...durations);
}

describe("5,000問性能", () => {
  const pack = createExamPackFixture(5_000);
  const index = createFixtureIndex(pack);
  const attempts = createFixtureAttempts(pack);

  it("Pack検証を2秒以内に完了する", () => {
    const maximum = maximumDuration(() => { generatedExamPackSchema.parse(pack); });
    console.info(`Pack検証の最大値: ${maximum.toFixed(2)}ms`);
    expect(maximum).toBeLessThanOrEqual(2_000);
  });

  it("50問の模擬試験生成を2秒以内かつ重複なしで完了する", () => {
    let questionIds: readonly string[] = [];
    const maximum = maximumDuration(() => { const result = createMockExamPlan(index, { questionCount: 50, durationMinutes: 60, seed: 20260829 }); if (!result.ok) throw new Error(result.error.code); questionIds = result.value.questionIds; });
    console.info(`模擬試験生成の最大値: ${maximum.toFixed(2)}ms`);
    expect(maximum).toBeLessThanOrEqual(2_000);
    expect(questionIds).toHaveLength(50);
    expect(new Set(questionIds).size).toBe(50);
  });

  it("各10履歴の弱点計算を2秒以内に完了する", () => {
    let resultCount = 0;
    const ids = new Set(pack.questions.map((question) => question.id));
    const maximum = maximumDuration(() => { resultCount = rankReviewQuestions(ids, attempts, new Date("2026-08-29T00:00:00.000Z")).length; });
    console.info(`弱点計算の最大値: ${maximum.toFixed(2)}ms`);
    expect(maximum).toBeLessThanOrEqual(2_000);
    expect(resultCount).toBe(5_000);
  });
});

describe("50問fixture", () => {
  it("全問を重複なしで模擬試験へ割り当てる", () => {
    const pack = createExamPackFixture(50); const result = createMockExamPlan(createFixtureIndex(pack), { questionCount: 50, durationMinutes: 60, seed: 1 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(new Set(result.value.questionIds).size).toBe(50);
  });
});
