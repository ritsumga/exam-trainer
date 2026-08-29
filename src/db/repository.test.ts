import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ExamTrainerDatabase } from "./database";
import { LearningRepository, parseBackup, serializeBackup } from "./repository";
import { singleQuestion } from "../test/fixtures";

describe("LearningRepository", () => {
  let db: ExamTrainerDatabase; let repository: LearningRepository;
  beforeEach(() => { db = new ExamTrainerDatabase(`test-${crypto.randomUUID()}`); repository = new LearningRepository(db); });
  afterEach(async () => { await db.delete(); });
  it("全形式共通の配列回答を保存して再open相当で読める", async () => { const saved = await repository.addPracticeAttempt({ question: singleQuestion, sessionId: "session", selectedAnswer: ["a"], elapsedMs: 500, answeredAt: "2026-01-01T00:00:00.000Z" }); expect(saved.selectedAnswer).toEqual(["a"]); expect((await repository.listAttempts("demo"))[0]).toEqual(saved); });
  it("バックアップを安定出力し全置換する", async () => { await repository.setBookmark("demo", "q-single", true, new Date("2026-01-01T00:00:00.000Z")); const snapshot = await repository.readSnapshot(new Date("2026-01-02T00:00:00.000Z")); const text = serializeBackup(snapshot); expect(text.endsWith("\n")).toBe(true); const parsed = parseBackup(text); const revision = await repository.getRevision(); await repository.replaceAll({ ...parsed, data: { ...parsed.data, bookmarks: [] } }, revision, new Date("2026-01-03T00:00:00.000Z")); expect(await repository.listBookmarks()).toEqual([]); });
  it("未知バックアップ版を無変更で拒否する", () => { expect(() => parseBackup('{"product":"exam-trainer","schemaVersion":2}')).toThrow("対応していません"); });
  it("主キー重複を復元前に拒否する", async () => { const snapshot = await repository.readSnapshot(new Date("2026-01-02T00:00:00.000Z")); const duplicate = { ...snapshot, data: { ...snapshot.data, bookmarks: [{ examId: "demo", questionId: "q-single", bookmarked: true as const, updatedAt: "2026-01-01T00:00:00.000Z" }, { examId: "demo", questionId: "q-single", bookmarked: true as const, updatedAt: "2026-01-01T00:00:00.000Z" }] } }; expect(() => parseBackup(JSON.stringify(duplicate))).toThrow("重複"); });
});
