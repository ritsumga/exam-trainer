export type * from "../schemas/exam-pack";
export type QuestionType = "single" | "multiple" | "input";

export type ExamPackIndex = {
  pack: import("../schemas/exam-pack").GeneratedExamPack;
  questionById: ReadonlyMap<string, import("../schemas/exam-pack").Question>;
  questionsByDomainId: ReadonlyMap<string, readonly import("../schemas/exam-pack").Question[]>;
};
