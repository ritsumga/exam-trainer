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
}).strict().superRefine((pack, context) => {
  const domainIds = pack.domains.map((domain) => domain.id); const questionIds = pack.questions.map((question) => question.id);
  if (new Set(pack.exam.questionTypes).size !== pack.exam.questionTypes.length) context.addIssue({ code: "custom", path: ["exam", "questionTypes"], message: "問題形式が重複しています" });
  if (new Set(domainIds).size !== domainIds.length) context.addIssue({ code: "custom", path: ["domains"], message: "分野IDが重複しています" });
  if (pack.domains.some((domain) => domain.weight !== undefined) && pack.domains.some((domain) => domain.weight === undefined)) context.addIssue({ code: "custom", path: ["domains"], message: "weightは全分野で指定するか全分野で省略してください" });
  if (new Set(questionIds).size !== questionIds.length) context.addIssue({ code: "custom", path: ["questions"], message: "問題IDが重複しています" });
  const knownDomains = new Set(domainIds);
  pack.questions.forEach((question, index) => {
    if (question.examId !== pack.exam.id) context.addIssue({ code: "custom", path: ["questions", index, "examId"], message: "試験参照が一致しません" });
    if (!knownDomains.has(question.domainId)) context.addIssue({ code: "custom", path: ["questions", index, "domainId"], message: "未知の分野です" });
    if (!pack.exam.questionTypes.includes(question.type)) context.addIssue({ code: "custom", path: ["questions", index, "type"], message: "試験が対応しない問題形式です" });
    if (question.type === "input") {
      const normalized = question.answers.map((value) => value.normalize("NFC").replace(/\r\n?/g, "\n").trim());
      if (new Set(normalized).size !== normalized.length) context.addIssue({ code: "custom", path: ["questions", index, "answers"], message: "正規化後の正解候補が重複しています" });
      return;
    }
    const choiceIds = question.choices.map((choice) => choice.id);
    if (new Set(choiceIds).size !== choiceIds.length || question.answers.some((answer) => !choiceIds.includes(answer))) context.addIssue({ code: "custom", path: ["questions", index, "answers"], message: "正解と選択肢が整合しません" });
    if (Object.keys(question.choiceExplanations).length !== choiceIds.length || choiceIds.some((id) => question.choiceExplanations[id] === undefined)) context.addIssue({ code: "custom", path: ["questions", index, "choiceExplanations"], message: "選択肢解説が選択肢と一致しません" });
    if (question.type === "multiple" && (new Set(question.answers).size !== question.answers.length || question.answers.length >= choiceIds.length)) context.addIssue({ code: "custom", path: ["questions", index, "answers"], message: "複数選択の正解集合が不正です" });
  });
});

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
