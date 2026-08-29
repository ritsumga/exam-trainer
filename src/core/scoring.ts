import type { Question, QuestionType } from "../types/exam-pack";

export type GradeResult = {
  isAnswered: boolean;
  isCorrect: boolean;
  normalizedSelectedAnswer: readonly string[];
  normalizedCorrectAnswer: readonly string[];
};

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function normalizeAnswer(questionType: QuestionType, raw: readonly string[]): readonly string[] {
  if (questionType === "input") {
    return raw.map((value) => value.normalize("NFC").replace(/\r\n?/g, "\n").trim());
  }
  const values = unique(raw);
  return questionType === "multiple" ? values.sort((a, b) => a < b ? -1 : a > b ? 1 : 0) : values;
}

export function gradeAnswer(question: Question, raw: readonly string[]): GradeResult {
  const selected = normalizeAnswer(question.type, raw);
  const correct = normalizeAnswer(question.type, question.answers);
  const choiceIds = question.type === "input" ? undefined : new Set(question.choices.map((choice) => choice.id));
  const validChoice = choiceIds === undefined || selected.every((value) => choiceIds.has(value));
  const isAnswered = question.type === "multiple"
    ? selected.length > 0 && validChoice
    : selected.length === 1 && selected[0] !== "" && validChoice;
  const isCorrect = isAnswered && (question.type === "input"
    ? correct.includes(selected[0] ?? "")
    : selected.length === correct.length && selected.every((value, index) => value === correct[index]));
  return {
    isAnswered,
    isCorrect,
    normalizedSelectedAnswer: selected,
    normalizedCorrectAnswer: correct,
  };
}
