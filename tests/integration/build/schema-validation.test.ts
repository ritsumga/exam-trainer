import { describe, expect, it } from "vitest";
import { generatedExamPackSchema } from "../../../src/schemas/exam-pack";
import { createExamPackFixture } from "../../fixtures/exam-packs/factory";

describe("Exam Pack異常系", () => {
  const valid = createExamPackFixture(50);
  const question = valid.questions[0];
  if (question?.type !== "single") throw new Error("fixtureの形式が不正です");

  it.each([
    ["必須値欠落", { ...question, question: undefined }],
    ["未知キー", { ...question, unknown: true }],
    ["型違い", { ...question, difficulty: "2" }],
    ["difficulty下限外", { ...question, difficulty: 0 }],
    ["difficulty上限外", { ...question, difficulty: 6 }],
    ["difficulty小数", { ...question, difficulty: 2.5 }],
    ["日時不正", { ...question, verifiedAt: "2026-02-30" }],
    ["未承認status", { ...question, status: "reviewed" }],
    ["HTTP出典", { ...question, sources: [{ url: "http://example.com" }] }],
  ])("%sを拒否する", (_name, invalidQuestion) => {
    expect(() => generatedExamPackSchema.parse({ ...valid, questions: [invalidQuestion] })).toThrow();
  });

  it("正常な50問Packを受理する", () => {
    expect(generatedExamPackSchema.parse(valid).questions).toHaveLength(50);
  });

  it.each([
    ["分野ID重複", { ...valid, domains: [valid.domains[0], valid.domains[0]] }],
    ["weight混在", { ...valid, domains: [valid.domains[0], { ...valid.domains[1], weight: undefined }] }],
    ["問題ID重複", { ...valid, questions: [question, question] }],
    ["試験参照不一致", { ...valid, questions: [{ ...question, examId: "other" }] }],
    ["未知分野", { ...valid, questions: [{ ...question, domainId: "unknown" }] }],
    ["未知選択肢を正解指定", { ...valid, questions: [{ ...question, answers: ["unknown"] }] }],
  ])("%sを意味検証で拒否する", (_name, invalidPack) => {
    expect(() => generatedExamPackSchema.parse(invalidPack)).toThrow();
  });
});
