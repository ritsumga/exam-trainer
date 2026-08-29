import { z } from "zod";
import {
  dateOnlySchema,
  difficultySchema,
  idSchema,
  nonEmptyTextSchema,
  questionTypeSchema,
} from "./common";

export const examDefinitionSchema = z.object({
  id: idSchema,
  name: nonEmptyTextSchema,
  vendor: nonEmptyTextSchema,
  exam: z.object({
    durationMinutes: z.number().int().positive(),
    questionCount: z.number().int().positive(),
  }).strict(),
  questionTypes: z.array(questionTypeSchema).min(1),
}).strict();

export const domainSchema = z.object({
  id: idSchema,
  name: nonEmptyTextSchema,
  weight: z.number().finite().positive().optional(),
}).strict();

const sourceSchema = z.object({ url: z.string().url().startsWith("https://") }).strict();
const choiceSchema = z.object({ id: idSchema, text: nonEmptyTextSchema }).strict();
const questionBase = {
  id: idSchema,
  examId: idSchema,
  domainId: idSchema,
  difficulty: difficultySchema,
  question: nonEmptyTextSchema,
  explanation: nonEmptyTextSchema,
  tags: z.array(idSchema),
  sources: z.array(sourceSchema).min(1),
  verifiedAt: dateOnlySchema,
  status: z.literal("approved"),
};

const selectedQuestionFields = {
  choices: z.array(choiceSchema).min(2),
  choiceExplanations: z.record(idSchema, nonEmptyTextSchema),
};

export const singleQuestionSchema = z.object({
  ...questionBase,
  ...selectedQuestionFields,
  type: z.literal("single"),
  answers: z.array(nonEmptyTextSchema).length(1),
}).strict();

export const multipleQuestionSchema = z.object({
  ...questionBase,
  ...selectedQuestionFields,
  type: z.literal("multiple"),
  answers: z.array(nonEmptyTextSchema).min(1),
}).strict();

export const inputQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("input"),
  answers: z.array(nonEmptyTextSchema).min(1),
}).strict();

export const questionSchema = z.discriminatedUnion("type", [
  singleQuestionSchema,
  multipleQuestionSchema,
  inputQuestionSchema,
]);

export const generatedExamPackSchema = z.object({
  schemaVersion: z.literal(1),
  exam: examDefinitionSchema,
  domains: z.array(domainSchema).min(1),
  questions: z.array(questionSchema),
}).strict();

export const examCatalogEntrySchema = z.object({
  examId: idSchema,
  name: nonEmptyTextSchema,
  vendor: nonEmptyTextSchema,
  durationMinutes: z.number().int().positive(),
  questionCount: z.number().int().positive(),
  availableQuestionCount: z.number().int().nonnegative(),
  questionTypes: z.array(questionTypeSchema).min(1),
  dataPath: nonEmptyTextSchema,
}).strict();

export const examCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().datetime({ offset: false }),
  exams: z.array(examCatalogEntrySchema),
}).strict();

export type ExamDefinition = z.infer<typeof examDefinitionSchema>;
export type Domain = z.infer<typeof domainSchema>;
export type Question = z.infer<typeof questionSchema>;
export type SingleQuestion = z.infer<typeof singleQuestionSchema>;
export type MultipleQuestion = z.infer<typeof multipleQuestionSchema>;
export type InputQuestion = z.infer<typeof inputQuestionSchema>;
export type GeneratedExamPack = z.infer<typeof generatedExamPackSchema>;
export type ExamCatalog = z.infer<typeof examCatalogSchema>;
export type ExamCatalogEntry = z.infer<typeof examCatalogEntrySchema>;
