import type { Attempt } from "../../../src/schemas/learning-data";
import type { Domain, GeneratedExamPack, Question } from "../../../src/schemas/exam-pack";
import type { ExamPackIndex } from "../../../src/types/exam-pack";

export type FixtureSize = 50 | 5_000;

export function createExamPackFixture(size: FixtureSize): GeneratedExamPack {
  const fixtureId = size === 50 ? "fixture-50" : "fixture-5000";
  const domains: Domain[] = Array.from({ length: 10 }, (_, index) => ({ id: `domain-${String(index + 1).padStart(2, "0")}`, name: `試験分野${index + 1}`, weight: 1 }));
  const questions: Question[] = Array.from({ length: size }, (_, index) => ({
    id: `${fixtureId}-q-${String(index + 1).padStart(5, "0")}`,
    examId: fixtureId,
    domainId: domains[index % domains.length]?.id ?? "domain-01",
    difficulty: (index % 5 + 1) as 1 | 2 | 3 | 4 | 5,
    type: "single" as const,
    question: `性能試験専用の問題${index + 1}です。`,
    choices: [{ id: "a", text: "正解" }, { id: "b", text: "誤答" }],
    answers: ["a"],
    explanation: "性能試験専用の解説です。",
    choiceExplanations: { a: "正解です。", b: "誤答です。" },
    tags: ["performance"],
    sources: [{ url: "https://example.com/performance-fixture" }],
    verifiedAt: "2026-08-29",
    status: "approved" as const,
  }));
  return {
    schemaVersion: 1,
    exam: { id: fixtureId, name: `${size}問fixture`, vendor: "Exam Trainer", exam: { durationMinutes: 60, questionCount: 50 }, questionTypes: ["single"] },
    domains,
    questions,
  };
}

export function createFixtureIndex(pack: GeneratedExamPack): ExamPackIndex {
  return {
    pack,
    questionById: new Map(pack.questions.map((question) => [question.id, question])),
    questionsByDomainId: new Map(pack.domains.map((domain) => [domain.id, pack.questions.filter((question) => question.domainId === domain.id)])),
  };
}

export function createFixtureAttempts(pack: GeneratedExamPack, attemptsPerQuestion = 10): readonly Attempt[] {
  return pack.questions.flatMap((question, questionIndex) => Array.from({ length: attemptsPerQuestion }, (_, attemptIndex) => ({
    id: `${question.id}-attempt-${attemptIndex}`,
    examId: pack.exam.id,
    questionId: question.id,
    sessionId: `session-${questionIndex}`,
    selectedAnswer: [attemptIndex % 3 === 0 ? "b" : "a"],
    isCorrect: attemptIndex % 3 !== 0,
    elapsedMs: 30_000 + attemptIndex,
    confidence: (attemptIndex % 4 + 1) as 1 | 2 | 3 | 4,
    answeredAt: new Date(Date.UTC(2026, 0, 1, 0, 0, questionIndex * attemptsPerQuestion + attemptIndex)).toISOString(),
    mode: "practice" as const,
  })));
}
