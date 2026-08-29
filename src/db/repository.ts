import type { Table } from "dexie";
import { backupEnvelopeV1Schema, type BackupEnvelopeV1 } from "../schemas/backup";
import {
  attemptSchema, bookmarkSchema, examSessionSchema, reviewStateSchema, settingSchema,
  type Attempt, type Bookmark, type ExamSession,
} from "../schemas/learning-data";
import type { Question } from "../types/exam-pack";
import { AppError, ConflictError } from "../types/errors";
import { gradeAnswer } from "../core/scoring";
import { calculateMockExamResult } from "../core/mock-exam";
import type { ExamPackIndex } from "../types/exam-pack";
import { ExamTrainerDatabase, database } from "./database";

export type PracticeAttemptInput = {
  question: Question;
  sessionId: string;
  selectedAnswer: readonly string[];
  elapsedMs: number;
  answeredAt: string;
};
export type RestorePreview = {
  snapshot: BackupEnvelopeV1;
  expectedRevision: number;
  currentCounts: Record<string, number>;
  restoredCounts: Record<string, number>;
  outsidePackReferences: number;
};

function parseRows<T>(schema: { parse(input: unknown): T }, rows: readonly unknown[]): readonly T[] {
  try { return rows.map((row) => schema.parse(row)); }
  catch (cause) { throw new AppError("data-integrity", "保存データが壊れています", { cause }); }
}

function sorted<T>(rows: readonly T[], key: (row: T) => string): readonly T[] {
  return [...rows].sort((a, b) => key(a).localeCompare(key(b)));
}

function ensureSessionIntegrity(session: ExamSession): void {
  const questionIds = new Set(session.questionIds);
  if (questionIds.size !== session.questionIds.length || session.currentIndex >= session.questionIds.length
    || Object.keys(session.answers).some((id) => !questionIds.has(id))
    || session.flaggedQuestionIds.some((id) => !questionIds.has(id))
    || new Set(session.flaggedQuestionIds).size !== session.flaggedQuestionIds.length) {
    throw new AppError("data-integrity", "模擬試験データの参照が不正です");
  }
}

function ensureUnique<T>(rows: readonly T[], key: (row: T) => string): void {
  const keys = rows.map(key);
  if (new Set(keys).size !== keys.length) throw new AppError("backup-invalid", "バックアップ内の主キーが重複しています");
}

function ensureBackupIntegrity(snapshot: BackupEnvelopeV1): void {
  ensureUnique(snapshot.data.attempts, (row) => row.id);
  ensureUnique(snapshot.data.bookmarks, (row) => `${row.examId}\0${row.questionId}`);
  ensureUnique(snapshot.data.reviewStates, (row) => `${row.examId}\0${row.questionId}`);
  ensureUnique(snapshot.data.examSessions, (row) => row.id);
  ensureUnique(snapshot.data.settings, (row) => row.key);
  snapshot.data.examSessions.forEach(ensureSessionIntegrity);
  const sessionIds = new Set(snapshot.data.examSessions.map((session) => session.id));
  if (snapshot.data.attempts.some((attempt) => attempt.mode === "mock" && !sessionIds.has(attempt.sessionId))) {
    throw new AppError("backup-invalid", "模試回答が存在しないセッションを参照しています");
  }
}

export class LearningRepository {
  constructor(private readonly db: ExamTrainerDatabase = database) {}

  private async revision(): Promise<number> { return Number((await this.db.meta.get("write-revision"))?.value ?? 0); }
  private async incrementRevision(): Promise<number> {
    const next = await this.revision() + 1;
    await this.db.meta.put({ key: "write-revision", value: next });
    return next;
  }

  async getRevision(): Promise<number> { return this.revision(); }

  async addPracticeAttempt(input: PracticeAttemptInput): Promise<Attempt> {
    const grade = gradeAnswer(input.question, input.selectedAnswer);
    if (!grade.isAnswered) throw new AppError("validation", "回答を入力してください");
    const attempt = attemptSchema.parse({
      id: crypto.randomUUID(), examId: input.question.examId, questionId: input.question.id,
      sessionId: input.sessionId, selectedAnswer: grade.normalizedSelectedAnswer, isCorrect: grade.isCorrect,
      elapsedMs: input.elapsedMs, answeredAt: input.answeredAt, mode: "practice",
    });
    await this.db.transaction("rw", this.db.attempts, this.db.meta, async () => { await this.db.attempts.add(attempt); await this.incrementRevision(); });
    return attempt;
  }

  async updateConfidence(attemptId: string, confidence: 1 | 2 | 3 | 4): Promise<void> {
    await this.db.transaction("rw", this.db.attempts, this.db.meta, async () => {
      const current = await this.db.attempts.get(attemptId);
      if (current === undefined) throw new AppError("not-found", "回答履歴が見つかりません");
      await this.db.attempts.put(attemptSchema.parse({ ...current, confidence })); await this.incrementRevision();
    });
  }

  async listAttempts(examId?: string): Promise<readonly Attempt[]> {
    const rows = examId === undefined ? await this.db.attempts.toArray() : await this.db.attempts.where("examId").equals(examId).toArray();
    return parseRows(attemptSchema, rows);
  }

  async setBookmark(examId: string, questionId: string, value: boolean, now = new Date()): Promise<void> {
    await this.db.transaction("rw", this.db.bookmarks, this.db.meta, async () => {
      if (value) await this.db.bookmarks.put(bookmarkSchema.parse({ examId, questionId, bookmarked: true, updatedAt: now.toISOString() }));
      else await this.db.bookmarks.delete([examId, questionId]);
      await this.incrementRevision();
    });
  }

  async listBookmarks(examId?: string): Promise<readonly Bookmark[]> {
    const rows = examId === undefined ? await this.db.bookmarks.toArray() : await this.db.bookmarks.where("examId").equals(examId).toArray();
    return parseRows(bookmarkSchema, rows);
  }

  async listExamSessions(examId?: string): Promise<readonly ExamSession[]> {
    const rows = examId === undefined ? await this.db.examSessions.toArray() : await this.db.examSessions.where("examId").equals(examId).toArray();
    return parseRows(examSessionSchema, rows);
  }

  async findInProgressSession(examId: string): Promise<ExamSession | undefined> {
    const row = await this.db.examSessions.where("[examId+status]").equals([examId, "in-progress"]).first();
    return row === undefined ? undefined : examSessionSchema.parse(row);
  }

  async saveExamSession(session: ExamSession, expectedRevision: number): Promise<ExamSession> {
    ensureSessionIntegrity(session);
    return this.db.transaction("rw", this.db.examSessions, this.db.meta, async () => {
      const current = await this.db.examSessions.get(session.id);
      if (current === undefined) {
        if (expectedRevision !== 0 || await this.findInProgressSession(session.examId) !== undefined) throw new ConflictError();
      } else if (current.revision !== expectedRevision) throw new ConflictError();
      const saved = examSessionSchema.parse({ ...session, revision: expectedRevision + 1 });
      await this.db.examSessions.put(saved); await this.incrementRevision(); return saved;
    });
  }

  async discardExamSession(sessionId: string, expectedRevision: number, now = new Date()): Promise<void> {
    const current = await this.db.examSessions.get(sessionId);
    if (current === undefined || current.revision !== expectedRevision) throw new ConflictError();
    await this.saveExamSession({ ...current, status: "discarded", updatedAt: now.toISOString() }, expectedRevision);
  }

  async getExamSession(sessionId: string): Promise<ExamSession | undefined> {
    const value = await this.db.examSessions.get(sessionId);
    return value === undefined ? undefined : examSessionSchema.parse(value);
  }

  async submitExam(index: ExamPackIndex, sessionId: string, expectedRevision: number, reason: "manual" | "deadline", submittedAt = new Date()): Promise<ExamSession> {
    return this.db.transaction("rw", this.db.examSessions, this.db.attempts, this.db.meta, async () => {
      const current = await this.db.examSessions.get(sessionId);
      if (current === undefined) throw new AppError("not-found", "模擬試験が見つかりません");
      if (current.status === "completed") return examSessionSchema.parse(current);
      if (current.status !== "in-progress" || current.revision !== expectedRevision) throw new ConflictError();
      const result = calculateMockExamResult(index, current, submittedAt, reason);
      const completed = examSessionSchema.parse({ ...current, status: "completed", revision: current.revision + 1, submittedAt: submittedAt.toISOString(), submitReason: reason, result, updatedAt: submittedAt.toISOString() });
      const attempts: Attempt[] = [];
      for (const questionId of current.questionIds) {
        const question = index.questionById.get(questionId); const selectedAnswer = current.answers[questionId];
        if (question === undefined || selectedAnswer === undefined) continue;
        const grade = gradeAnswer(question, selectedAnswer); if (!grade.isAnswered) continue;
        attempts.push(attemptSchema.parse({ id: `${current.id}:${questionId}`, examId: current.examId, questionId, sessionId: current.id, selectedAnswer: grade.normalizedSelectedAnswer, isCorrect: grade.isCorrect, elapsedMs: result.elapsedMs, answeredAt: submittedAt.toISOString(), mode: "mock" }));
      }
      await this.db.examSessions.put(completed); if (attempts.length > 0) await this.db.attempts.bulkPut(attempts); await this.incrementRevision(); return completed;
    });
  }

  async readSnapshot(now = new Date()): Promise<BackupEnvelopeV1> {
    const [attempts, bookmarks, reviewStates, examSessions, settings] = await Promise.all([
      this.db.attempts.toArray(), this.db.bookmarks.toArray(), this.db.reviewStates.toArray(), this.db.examSessions.toArray(), this.db.settings.toArray(),
    ]);
    return backupEnvelopeV1Schema.parse({ product: "exam-trainer", schemaVersion: 1, createdAt: now.toISOString(), data: {
      attempts: sorted(parseRows(attemptSchema, attempts), (row) => row.id),
      bookmarks: sorted(parseRows(bookmarkSchema, bookmarks), (row) => `${row.examId}\0${row.questionId}`),
      reviewStates: sorted(parseRows(reviewStateSchema, reviewStates), (row) => `${row.examId}\0${row.questionId}`),
      examSessions: sorted(parseRows(examSessionSchema, examSessions), (row) => row.id),
      settings: sorted(parseRows(settingSchema, settings), (row) => row.key),
    } });
  }

  async replaceAll(snapshot: BackupEnvelopeV1, expectedRevision: number, now = new Date()): Promise<number> {
    const validated = backupEnvelopeV1Schema.parse(snapshot);
    ensureBackupIntegrity(validated);
    return this.db.transaction("rw", [this.db.attempts, this.db.bookmarks, this.db.reviewStates, this.db.examSessions, this.db.settings, this.db.meta], async () => {
      if (await this.revision() !== expectedRevision) throw new ConflictError();
      await Promise.all([
        this.replaceTable(this.db.attempts, validated.data.attempts),
        this.replaceTable(this.db.bookmarks, validated.data.bookmarks),
        this.replaceTable(this.db.reviewStates, validated.data.reviewStates),
        this.replaceTable(this.db.examSessions, validated.data.examSessions),
        this.replaceTable(this.db.settings, validated.data.settings),
      ]);
      await this.db.meta.put({ key: "last-restored-at", value: now.toISOString() });
      return this.incrementRevision();
    });
  }

  private async replaceTable<T, Key>(table: Table<T, Key>, rows: readonly T[]): Promise<void> {
    await table.clear(); if (rows.length > 0) await table.bulkAdd([...rows]);
  }
}

export const learningRepository = new LearningRepository();

export function serializeBackup(snapshot: BackupEnvelopeV1): string { return `${JSON.stringify(backupEnvelopeV1Schema.parse(snapshot), null, 2)}\n`; }

export function parseBackup(text: string): BackupEnvelopeV1 {
  if (new TextEncoder().encode(text).length > 50 * 1024 * 1024) throw new AppError("backup-invalid", "バックアップは50 MiB以下にしてください");
  let raw: unknown;
  try { raw = JSON.parse(text); } catch (cause) { throw new AppError("backup-invalid", "JSONを読み取れません", { cause }); }
  if (typeof raw !== "object" || raw === null || !("schemaVersion" in raw) || raw.schemaVersion !== 1) throw new AppError("backup-version", "このバックアップ版には対応していません");
  try { const snapshot = backupEnvelopeV1Schema.parse(raw); ensureBackupIntegrity(snapshot); return snapshot; } catch (cause) { if (cause instanceof AppError) throw cause; throw new AppError("backup-invalid", "バックアップの内容が不正です", { cause }); }
}
