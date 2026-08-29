import type { Question } from "./exam-pack";

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
export type Clock = { now(): Date };
export type RandomSource = { next(): number };

export type CandidateStatus = "draft" | "reviewed" | "rejected";
export type QuestionCandidate = Omit<Question, "status"> & { status: CandidateStatus };
export type AIProviderError = { code: "unavailable" | "invalid-input" | "generation-failed" | "review-failed" };
export type AIProvider = {
  generateQuestions(input: Readonly<Record<string, unknown>>): Promise<Result<readonly QuestionCandidate[], AIProviderError>>;
  reviewQuestion(input: Readonly<Record<string, unknown>>): Promise<Result<Readonly<Record<string, unknown>>, AIProviderError>>;
};
