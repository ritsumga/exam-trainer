# DB・バックアップ詳細設計

## 1. 目的

本書はIndexedDBのスキーマ、Repository、トランザクション、別タブ競合、バックアップ版と復元手順を確定する。

## 2. DB定義

- DB名: `exam-trainer`
- Dexie版: `1`
- バックアップ`schemaVersion`: `1`
- 日時はUTC ISO 8601、経過時間は0以上の整数ミリ秒とする。
- v1には旧DB版・旧バックアップ版が存在しないため、マイグレーション表は空とする。将来は版ごとの純粋変換関数と自動試験を追加してから対応版へ登録する。

### 2.1 テーブル

| テーブル | 主キー | 索引 | 値の要点 |
| --- | --- | --- | --- |
| `attempts` | `id` | `examId`, `[examId+questionId]`, `[examId+answeredAt]`, `sessionId` | 確定回答1件を追記保存 |
| `bookmarks` | `[examId+questionId]` | `examId`, `updatedAt` | 現在のお気に入り状態だけを保存 |
| `reviewStates` | `[examId+questionId]` | `examId`, `updatedAt` | 最終表示位置等の復習継続状態 |
| `examSessions` | `id` | `examId`, `[examId+status]`, `deadline`, `updatedAt` | 未完了・完了・破棄済み模試 |
| `settings` | `key` | なし | 共通設定の判別共用体 |
| `meta` | `key` | なし | DB schema版、最終復元日時、書込みrevision |

Dexie stores定義は次で固定する。

```ts
db.version(1).stores({
  attempts: "id, examId, [examId+questionId], [examId+answeredAt], sessionId",
  bookmarks: "[examId+questionId], examId, updatedAt",
  reviewStates: "[examId+questionId], examId, updatedAt",
  examSessions: "id, examId, [examId+status], deadline, updatedAt",
  settings: "key",
  meta: "key",
});
```

## 3. 値型と制約

### 3.1 Attempt

```ts
type Attempt = {
  id: string;
  examId: string;
  questionId: string;
  sessionId: string;
  selectedAnswer: readonly string[];
  isCorrect: boolean;
  elapsedMs: number;
  confidence?: 1 | 2 | 3 | 4;
  answeredAt: string;
  mode: "practice" | "mock";
};
```

IDは`crypto.randomUUID()`によるUUID v4とする。通常演習の`sessionId`もメモリ上の演習開始時にUUID v4を採番する。Attemptは回答確定時に追加し、理解度だけは同じ`id`を更新する。採点結果は保存前に再計算し、呼出し元が渡した`isCorrect`を信用しない。

### 3.2 BookmarkとReviewState

Bookmarkは`{ examId, questionId, bookmarked: true, updatedAt }`とし、解除時はレコードを削除する。ReviewStateは`{ examId, questionId, lastReviewedAt, updatedAt }`とし、v1では弱点一覧から問題を開いた時だけupsertする。

### 3.3 ExamSession

```ts
type ExamSession = {
  id: string;
  examId: string;
  status: "in-progress" | "completed" | "discarded";
  revision: number;
  seed: number;
  questionIds: readonly string[];
  domainAllocations: readonly DomainAllocation[];
  answers: Readonly<Record<string, readonly string[]>>;
  flaggedQuestionIds: readonly string[];
  currentIndex: number;
  startedAt: string;
  deadline: string;
  updatedAt: string;
  submittedAt?: string;
  submitReason?: "manual" | "deadline";
  result?: MockExamResult;
};
```

`questionIds`は重複なし、`currentIndex`は範囲内、answersのキーとflagged IDはquestionIdsの部分集合とする。`deadline`は`startedAt + durationMinutes`と一致する。完了時だけ提出情報とresultを必須とし、破棄済みは回答を保持しても統計対象外とする。

Settingsは`key`を判別子とするunionとし、v1は`{ key: "app"; value: { theme: "system" | "light" | "dark" }; updatedAt }`だけを持つ。

## 4. Repository境界

```ts
interface LearningRepository {
  addPracticeAttempt(input: PracticeAttemptInput): Promise<Attempt>;
  updateConfidence(attemptId: string, confidence: Confidence): Promise<void>;
  listAttempts(examId: string): Promise<readonly Attempt[]>;
  setBookmark(examId: string, questionId: string, value: boolean): Promise<void>;
  listBookmarks(examId: string): Promise<readonly Bookmark[]>;
  saveExamSession(session: ExamSession, expectedRevision: number): Promise<ExamSession>;
  findInProgressSession(examId: string): Promise<ExamSession | undefined>;
  getExamSession(sessionId: string): Promise<ExamSession | undefined>;
  submitExam(input: SubmitExamInput): Promise<ExamSession>;
  discardExamSession(sessionId: string, expectedRevision: number): Promise<void>;
}

interface BackupRepository {
  readSnapshot(): Promise<BackupDataV1>;
  replaceAll(snapshot: BackupDataV1, expectedRevision: number): Promise<RestoreReceipt>;
}
```

RepositoryはZod検証済み値だけを返す。読出し時の不正レコードは黙って除外せず`DataIntegrityError`とする。

## 5. トランザクションと競合

### 5.1 revision

`meta["write-revision"]`を0から始まる整数として全書込みトランザクションの最後に1増加させる。模試セッションはさらにレコード単位の`revision`を持ち、更新時に`expectedRevision`と一致しない場合は`ConflictError`として書き込まない。

### 5.2 模試保存

- 開始時は同一examの`in-progress`がないことをread-writeトランザクション内で再確認する。
- 回答変更、移動、見直し変更を単一の`saveExamSession`呼出しへまとめ、保存成功後だけUI stateを確定する。
- 提出は`examSessions`、`attempts`、`meta`を1トランザクションで更新する。
- `status !== in-progress`なら既存のcompleted結果を返し、Attemptを再作成しない。これを提出の冪等性とする。
- Attempt IDは`${sessionId}:${questionId}`とし、模試提出の再実行でも同じ主キーとなる。通常演習だけUUID v4を使う。

### 5.3 別タブ

アプリ起動時にタブIDをUUID v4で作り、`BroadcastChannel("exam-trainer")`で`{ type: "data-changed"; revision; tabId }`を通知する。受信側はキャッシュを破棄して再読込する。競合時は後勝ちにせず、revision不一致を表示して再読込を促す。BroadcastChannelが使えなくてもDB内revision照合により安全性を保つ。

## 6. バックアップ形式

```ts
type BackupEnvelopeV1 = {
  product: "exam-trainer";
  schemaVersion: 1;
  createdAt: string;
  data: {
    attempts: readonly Attempt[];
    bookmarks: readonly Bookmark[];
    reviewStates: readonly ReviewState[];
    examSessions: readonly ExamSession[];
    settings: readonly Setting[];
  };
};
```

出力順は各主キーの辞書順とし、2空白インデントと末尾改行を付ける。ファイル名は`exam-trainer-backup-YYYYMMDD-HHmmss.json`とする。`meta`、Exam Pack、キャッシュは含めない。出力直前にZodで自己検証する。

## 7. 復元

### 7.1 検証

1. UTF-8 JSONとして読み、50 MiBを超えるファイルを拒否する。
2. `product`と`schemaVersion`を判定する。欠落、未知、2以上は拒否する。
3. v1 schemaを`.strict()`で検証する。
4. 全テーブルの主キー重複、模試answers・flaggedのsession内参照、模試Attemptのsession参照を検証する。
5. 現行Packにないexam/question参照は拒否せず件数を警告へ含める。
6. 現在件数、復元後件数、対象外参照件数を含む`RestorePreview`を返す。この時点では書き込まない。

### 7.2 全置換

利用者確認時にpreview作成時のwrite revisionを`expectedRevision`として渡す。全6テーブルを単一read-writeトランザクションへ含め、対象5テーブルをclearしてbulkAddし、`meta["last-restored-at"]`とrevisionを更新する。revision不一致、容量不足、abort、検証失敗のいずれでも全体をrollbackする。

既知版表は次とする。

| 入力版 | 処理 |
| --- | --- |
| 1 | そのまま検証・復元 |
| 0、欠落、2以上 | 未対応として無変更で拒否 |

## 8. エラー変換

Dexie/DOM例外はRepository境界で次へ変換する。

| エラー | 条件 | 再試行 |
| --- | --- | --- |
| `StorageUnavailableError` | DB open不可、private mode制約 | 状況変更後 |
| `QuotaExceededError` | 容量不足 | 不要データ整理後 |
| `ConflictError` | revision不一致 | 再読込後 |
| `DataIntegrityError` | 保存済み値のschema不一致 | バックアップ後に案内 |
| `TransactionError` | abort、未知の書込み失敗 | 可 |

## 9. 対応要件

FR-004、FR-010〜FR-015、AC-04、AC-07〜AC-09、QR-01、QR-07に対応する。
