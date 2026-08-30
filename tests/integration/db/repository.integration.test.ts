import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createIndex, inputQuestion, multipleQuestion, singleQuestion } from "../../../src/test/fixtures";
import { ExamTrainerDatabase } from "../../../src/db/database";
import { LearningRepository, parseBackup } from "../../../src/db/repository";
import type { InProgressExamSession } from "../../../src/schemas/learning-data";

const startedAt = "2026-08-29T00:00:00.000Z";
function session(): InProgressExamSession {
  return {
    id: "mock-session", examId: "demo", status: "in-progress", revision: 0, seed: 1,
    questionIds: [singleQuestion.id, multipleQuestion.id],
    domainAllocations: [{ domainId: "d-one", initialCount: 1, actualCount: 1, difference: 0 }, { domainId: "d-two", initialCount: 1, actualCount: 1, difference: 0 }],
    answers: { [singleQuestion.id]: ["a"] }, flaggedQuestionIds: [multipleQuestion.id], currentIndex: 1,
    startedAt, deadline: "2026-08-29T01:00:00.000Z", updatedAt: startedAt,
  };
}

describe("LearningRepository結合", () => {
  let name: string; let db: ExamTrainerDatabase; let repository: LearningRepository;
  beforeEach(() => { name = `integration-${crypto.randomUUID()}`; db = new ExamTrainerDatabase(name); repository = new LearningRepository(db); });
  afterEach(async () => { vi.restoreAllMocks(); await db.delete(); });

  it("3形式の回答、理解度、お気に入り、未完了模試を再open後も保持する", async () => {
    const questions = [singleQuestion, multipleQuestion, inputQuestion];
    for (const [index, question] of questions.entries()) await repository.addPracticeAttempt({ question, sessionId: `practice-${index}`, selectedAnswer: question.answers, elapsedMs: index, answeredAt: new Date(Date.UTC(2026, 7, 29, 0, 0, index)).toISOString() });
    const first = (await repository.listAttempts())[0]; if (first === undefined) throw new Error("回答履歴がありません");
    await repository.updateConfidence(first.id, 4);
    await repository.setBookmark("demo", singleQuestion.id, true, new Date(startedAt));
    const savedSession = await repository.saveExamSession(session(), 0);
    db.close(); db = new ExamTrainerDatabase(name); repository = new LearningRepository(db);
    expect(await repository.listAttempts("demo")).toHaveLength(3);
    expect((await repository.listAttempts("demo")).find((attempt) => attempt.id === first.id)?.confidence).toBe(4);
    expect(await repository.listBookmarks("demo")).toHaveLength(1);
    expect(await repository.findInProgressSession("demo")).toEqual(savedSession);
  });

  it("古いrevisionによる保存競合を拒否する", async () => {
    const saved = await repository.saveExamSession(session(), 0);
    await repository.saveExamSession({ ...saved, currentIndex: 0 }, saved.revision);
    await expect(repository.saveExamSession({ ...saved, currentIndex: 1 }, saved.revision)).rejects.toThrow("別の画面でデータが更新されました");
  });

  it("手動提出を冪等にし、未回答のAttemptを作らない", async () => {
    const saved = await repository.saveExamSession(session(), 0); const index = createIndex([singleQuestion, multipleQuestion]);
    const completed = await repository.submitExam(index, saved.id, saved.revision, "manual", new Date("2026-08-29T00:10:00.000Z"));
    const repeated = await repository.submitExam(index, saved.id, saved.revision, "deadline", new Date("2026-08-29T00:20:00.000Z"));
    expect(repeated).toEqual(completed);
    expect(await repository.listAttempts("demo")).toHaveLength(1);
    expect(completed.status === "completed" ? completed.result.unansweredQuestionIds : []).toEqual([multipleQuestion.id]);
  });

  it("容量不足相当のtransaction abort時に既存データを保持する", async () => {
    await repository.setBookmark("demo", singleQuestion.id, true, new Date(startedAt));
    const before = await repository.readSnapshot(new Date(startedAt)); const revision = await repository.getRevision();
    const replacement = { ...before, data: { ...before.data, bookmarks: [{ examId: "demo", questionId: multipleQuestion.id, bookmarked: true as const, updatedAt: startedAt }] } };
    vi.spyOn(db.bookmarks, "bulkAdd").mockRejectedValueOnce(new DOMException("容量不足", "QuotaExceededError"));
    await expect(repository.replaceAll(replacement, revision)).rejects.toThrow();
    expect(await repository.listBookmarks()).toEqual(before.data.bookmarks);
    expect(await repository.getRevision()).toBe(revision);
  });

  it("保存値破損を読み取り時に拒否する", async () => {
    await db.attempts.put({ id: "broken", examId: "demo" } as never);
    await expect(repository.listAttempts()).rejects.toThrow("壊れています");
  });

  it.each([0, 2])("未対応schemaVersion %iを拒否する", (schemaVersion) => {
    expect(() => parseBackup(JSON.stringify({ product: "exam-trainer", schemaVersion }))).toThrow("対応していません");
  });
});
