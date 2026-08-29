import Dexie, { type EntityTable, type Table } from "dexie";
import type { Attempt, Bookmark, ExamSession, ReviewState, Setting } from "../types/learning-data";

export type MetaRecord = { key: "write-revision" | "last-restored-at"; value: number | string };

export class ExamTrainerDatabase extends Dexie {
  attempts!: EntityTable<Attempt, "id">;
  bookmarks!: Table<Bookmark, [string, string]>;
  reviewStates!: Table<ReviewState, [string, string]>;
  examSessions!: EntityTable<ExamSession, "id">;
  settings!: EntityTable<Setting, "key">;
  meta!: EntityTable<MetaRecord, "key">;

  constructor(name = "exam-trainer") {
    super(name);
    this.version(1).stores({
      attempts: "id, examId, [examId+questionId], [examId+answeredAt], sessionId",
      bookmarks: "[examId+questionId], examId, updatedAt",
      reviewStates: "[examId+questionId], examId, updatedAt",
      examSessions: "id, examId, [examId+status], deadline, updatedAt",
      settings: "key",
      meta: "key",
    });
  }
}

export const database = new ExamTrainerDatabase();
