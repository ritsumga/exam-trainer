import type { Domain, GeneratedExamPack, Question } from "../schemas/exam-pack";
import type { ExamPackIndex } from "../types/exam-pack";

const base = { examId: "demo", difficulty: 2 as const, explanation: "解説です。", tags: [], sources: [{ url: "https://example.com/reference" }], verifiedAt: "2026-08-29", status: "approved" as const };
export const singleQuestion: Question = { ...base, id: "q-single", domainId: "d-one", type: "single", question: "正しいものはどれですか。", choices: [{ id: "a", text: "正解" }, { id: "b", text: "誤り" }], answers: ["a"], choiceExplanations: { a: "正しいため。", b: "誤りのため。" } };
export const multipleQuestion: Question = { ...base, id: "q-multiple", domainId: "d-two", type: "multiple", question: "正しいものを選んでください。", choices: [{ id: "a", text: "正解1" }, { id: "b", text: "誤り" }, { id: "c", text: "正解2" }], answers: ["a", "c"], choiceExplanations: { a: "正しいため。", b: "誤りのため。", c: "正しいため。" } };
export const inputQuestion: Question = { ...base, id: "q-input", domainId: "d-two", type: "input", question: "入力してください。", answers: ["Café"] };
export const domains: Domain[] = [{ id: "d-one", name: "分野1", weight: 1 }, { id: "d-two", name: "分野2", weight: 1 }];
export function createIndex(questions: readonly Question[] = [singleQuestion, multipleQuestion, inputQuestion], customDomains: readonly Domain[] = domains): ExamPackIndex {
  const pack: GeneratedExamPack = { schemaVersion: 1, exam: { id: "demo", name: "デモ", vendor: "Exam Trainer", exam: { durationMinutes: 60, questionCount: 50 }, questionTypes: ["single", "multiple", "input"] }, domains: [...customDomains], questions: [...questions] };
  return { pack, questionById: new Map(pack.questions.map((question) => [question.id, question])), questionsByDomainId: new Map(pack.domains.map((domain) => [domain.id, pack.questions.filter((question) => question.domainId === domain.id)])) };
}
