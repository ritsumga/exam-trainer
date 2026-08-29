import { z } from "zod";
import { idSchema, isoDateTimeSchema, nonNegativeIntegerSchema } from "./common";

export const attemptSchema = z.object({
  id: z.string().min(1),
  examId: idSchema,
  questionId: idSchema,
  sessionId: z.string().min(1),
  selectedAnswer: z.array(z.string()).min(1),
  isCorrect: z.boolean(),
  elapsedMs: nonNegativeIntegerSchema,
  confidence: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  answeredAt: isoDateTimeSchema,
  mode: z.enum(["practice", "mock"]),
}).strict();

export const bookmarkSchema = z.object({
  examId: idSchema,
  questionId: idSchema,
  bookmarked: z.literal(true),
  updatedAt: isoDateTimeSchema,
}).strict();

export const reviewStateSchema = z.object({
  examId: idSchema,
  questionId: idSchema,
  lastReviewedAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}).strict();

export const domainAllocationSchema = z.object({
  domainId: idSchema,
  initialCount: nonNegativeIntegerSchema,
  actualCount: nonNegativeIntegerSchema,
  difference: z.number().int(),
}).strict();

export const domainResultSchema = z.object({
  domainId: idSchema,
  totalCount: nonNegativeIntegerSchema,
  correctCount: nonNegativeIntegerSchema,
  percentage: z.number().nonnegative(),
}).strict();

export const mockExamResultSchema = z.object({
  totalCount: nonNegativeIntegerSchema,
  answeredCount: nonNegativeIntegerSchema,
  correctCount: nonNegativeIntegerSchema,
  percentage: z.number().nonnegative(),
  elapsedMs: nonNegativeIntegerSchema,
  domainResults: z.array(domainResultSchema),
  incorrectQuestionIds: z.array(idSchema),
  unansweredQuestionIds: z.array(idSchema),
  flaggedQuestionIds: z.array(idSchema),
}).strict();

const sessionBase = z.object({
  id: z.string().min(1),
  examId: idSchema,
  revision: nonNegativeIntegerSchema,
  seed: z.number().int().min(0).max(0xffffffff),
  questionIds: z.array(idSchema).min(1),
  domainAllocations: z.array(domainAllocationSchema),
  answers: z.record(idSchema, z.array(z.string())),
  flaggedQuestionIds: z.array(idSchema),
  currentIndex: nonNegativeIntegerSchema,
  startedAt: isoDateTimeSchema,
  deadline: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const inProgressExamSessionSchema = sessionBase.extend({ status: z.literal("in-progress") }).strict();
export const completedExamSessionSchema = sessionBase.extend({
  status: z.literal("completed"),
  submittedAt: isoDateTimeSchema,
  submitReason: z.enum(["manual", "deadline"]),
  result: mockExamResultSchema,
}).strict();
export const discardedExamSessionSchema = sessionBase.extend({ status: z.literal("discarded") }).strict();
export const examSessionSchema = z.discriminatedUnion("status", [
  inProgressExamSessionSchema,
  completedExamSessionSchema,
  discardedExamSessionSchema,
]);

export const settingSchema = z.object({
  key: z.literal("app"),
  value: z.object({ theme: z.enum(["system", "light", "dark"]) }).strict(),
  updatedAt: isoDateTimeSchema,
}).strict();

export type Attempt = z.infer<typeof attemptSchema>;
export type Bookmark = z.infer<typeof bookmarkSchema>;
export type ReviewState = z.infer<typeof reviewStateSchema>;
export type DomainAllocation = z.infer<typeof domainAllocationSchema>;
export type MockExamResult = z.infer<typeof mockExamResultSchema>;
export type ExamSession = z.infer<typeof examSessionSchema>;
export type InProgressExamSession = z.infer<typeof inProgressExamSessionSchema>;
export type CompletedExamSession = z.infer<typeof completedExamSessionSchema>;
export type Setting = z.infer<typeof settingSchema>;
