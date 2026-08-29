# アプリケーション・UI・例外詳細設計

## 1. 目的

本書は機能サービス、画面loader/action、状態遷移、共通UI、利用者向け例外処理を確定する。

## 2. 機能サービス

UIは次のサービスだけを呼び、Repository、Dexie、生成JSONを直接参照しない。

| サービス | 主な操作 |
| --- | --- |
| `ExamSelectionService` | カタログと試験別学習要約を取得 |
| `PracticeService` | 候補数確認、演習開始、回答確定、理解度、お気に入り |
| `MockExamService` | 設定検証、開始、再開、操作保存、提出、破棄 |
| `StatisticsService` | 現行Packに対する統計を取得 |
| `BackupService` | export、restore検証、preview、全置換 |
| `UpdateService` | Service Worker状態、更新保留、安全な有効化 |

サービスは画面文言を返さず、表示モデルまたは分類済み`AppError`を返す。時刻、乱数、Repository、PackCatalogをconstructorで注入する。

## 3. ルート構成

```text
root
├─ /exams
├─ /exams/:examId
│  ├─ practice/setup
│  ├─ practice/:sessionId
│  ├─ mock/setup
│  ├─ mock/:sessionId
│  ├─ mock/:sessionId/result
│  └─ statistics
└─ /settings/data
```

`createHashRouter`を使う。各exam route loaderはexamId、各session route loaderはsessionIdとexamIdの一致を検証する。未知値は404 responseへ変換し、root error elementが「見つかりません」と試験選択リンクを表示する。`/`は`/exams`へreplaceする。

## 4. UI状態規則

全非同期画面は`idle | loading | ready | empty | error`を判別共用体で表し、booleanの組合せを作らない。保存操作は`idle | saving | failed`を別に持つ。二重実行を防ぐためsaving中は同じ確定操作をdisabledにするが、フォーカス移動と安全な戻る操作は維持する。

### 4.1 通常演習

```ts
type PracticeQuestionState =
  | { status: "answering"; draftAnswer: readonly string[] }
  | { status: "saving"; draftAnswer: readonly string[] }
  | { status: "graded"; attempt: Attempt; grade: GradeResult }
  | { status: "save-failed"; draftAnswer: readonly string[]; error: AppError };
```

回答確定は`answering → saving → graded`の順だけを許可する。失敗は`save-failed`へ進み、入力を保持して再試行できる。`graded`になるまで正誤、正解、解説をDOMへ出力しない。confidenceは回答保存後に任意で更新し、失敗時は回答自体の成功を取り消さない。

### 4.2 模擬試験

模試の画面状態の正本は保存済み`ExamSession`とする。操作ごとに次状態を作り、expectedRevision付きで保存し、成功値で画面stateを置換する。失敗時は直前の保存済みstateを維持し、操作内容を再適用できるようdraftとして保持する。

タイマー表示は1秒間隔で`deadline - Clock.now()`を再計算する。0以下になった最初のtick、`visibilitychange`でvisibleへ戻った時、loaderで再開した時に同じ`submit(reason: "deadline")`を呼ぶ。自動提出中は回答操作を無効にする。

## 5. 入力コンポーネント

| 形式 | HTML | キーボード・検証 |
| --- | --- | --- |
| `single` | 同一nameの`input[type=radio]` | 1件選択後だけ確定可 |
| `multiple` | `input[type=checkbox]` | 選択必要数を常時表示。1件以上かつanswers件数以下で確定可 |
| `input` | `textarea` | 正規化後の空文字は確定不可 |

選択肢はファイル順で表示し、v1では並べ替えない。fieldset/legendとlabelを使用する。設問Markdownはsanitize済みReact要素として描画し、`dangerouslySetInnerHTML`を使わない。

### 5.1 共通コンポーネントAPI

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary" | "danger";
  busy?: boolean;
};

type AlertProps = {
  severity: "info" | "success" | "warning" | "error";
  title: string;
  children?: React.ReactNode;
};

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm(): void;
  onCancel(): void;
};

type QuestionInputProps = {
  question: Question;
  value: readonly string[];
  disabled: boolean;
  onChange(value: readonly string[]): void;
};
```

`Button`は`busy`時に`aria-disabled=true`と進行中文言を持ち、同じclickを無視する。`ConfirmDialog`の初期focusは取消操作、`QuestionInput`は形式別コンポーネントへ判別共用体で委譲する。表、空状態、spinner、通知も共通化するが、ドメイン値をpropsに持たせず表示モデルを受け取る。

### 5.2 デザイントークン

| 用途 | light | dark | 前景 |
| --- | --- | --- | --- |
| canvas | `#f8fafc` | `#0f172a` | `#0f172a` / `#f8fafc` |
| surface | `#ffffff` | `#1e293b` | 同上 |
| primary | `#1d4ed8` | `#60a5fa` | `#ffffff` / `#0f172a` |
| success | `#047857` | `#34d399` | `#ffffff` / `#052e16` |
| warning | `#b45309` | `#fbbf24` | `#ffffff` / `#451a03` |
| error | `#b91c1c` | `#f87171` | `#ffffff` / `#450a0a` |
| focus | `#2563eb` | `#93c5fd` | — |

本文は16px、行高1.5、主見出し30px、節見出し24px、補助文14pxとする。操作対象は最小44×44px、角丸8px、間隔は4px基準の`4/8/12/16/24/32`を使う。本文・操作文字はWCAG AAの4.5:1、大文字18pt相当以上は3:1、focusとUI境界は3:1以上を自動検査する。

## 6. 画面別確定仕様

### 6.1 試験選択・ホーム

- カタログカードは試験名を見出し、vendor、学習済み数、正答率、最終学習日時を表示する。
- 正答率の分母0は`—`、日時なしは`未学習`と表示する。
- ホームは未完了模試をloaderで確認し、存在すれば初回描画後に再開・破棄ダイアログへフォーカスする。
- 候補0の演習入口はdisabledにせず説明付きボタンとして表示し、押下時に空状態へ遷移しない形で理由を通知する。

### 6.2 設定画面

- 問題数と時間はPack既定値を初期値・上限とする。利用可能問題数が初期問題数に満たない場合も値を黙って縮小せず、不足情報を表示して利用者の変更を待つ。
- HTML number inputに加え、serviceで整数・範囲を再検証する。
- 分野再配分はdomain名、当初数、実数、差を表で表示し、利用者が「配分を確認しました」をcheckした後だけ開始可能にする。
- 全体不足は必要数、利用可能数、不足数を`role=alert`で表示する。

### 6.3 結果・成績

- 正答率は小数第1位、経過時間は`h:mm:ss`または`m:ss`、priorityは整数表示とする。
- 誤答再演習は`incorrectQuestionIds`をexplicitモードへ渡す。0件なら操作を表示しない。
- グラフと同じ内容の表を用意し、Rechartsだけに情報を持たせない。

### 6.4 データ管理

- exportは件数確認後にBlob URLを作成し、download開始後にURLをrevokeする。
- import file選択後に検証し、previewが変わるたび以前の確認状態を破棄する。
- 全置換ボタンの文言は「現在の学習データを置き換える」とし、既定フォーカスをキャンセルへ置く。
- 成功後は各件数、復元日時を表示して画面内キャッシュを全破棄する。

## 7. レスポンシブとアクセシビリティ

- Tailwind breakpointは`lg: 1024px`だけを主要レイアウト切替に使い、最小検証幅360px、最大コンテンツ幅`max-w-[1440px]`とする。
- 360〜1023pxは1列、1024px以上は設問/ナビゲーションまたは主情報/補助情報の2列とする。
- `main`見出しに`tabIndex={-1}`を設定し、route変更後にfocusする。
- focus ringは`focus-visible:outline-2 outline-offset-2`相当とし、非表示にしない。
- 正誤はアイコン、文言、色の3つで示す。色だけで区別しない。
- 通知は情報`role=status`、操作失敗`role=alert`。タイマーは10分、5分、1分、30秒、0秒だけ読み上げる。
- modalはネイティブ`dialog`または同等のfocus trap、Escape、起点focus復元を試験する。

## 8. エラー分類と表示

```ts
type AppErrorCode =
  | "not-found" | "validation" | "pack-load" | "data-integrity"
  | "storage-unavailable" | "quota-exceeded" | "conflict"
  | "transaction" | "backup-version" | "backup-invalid"
  | "pwa-registration" | "unexpected";
```

| 分類 | 表示 | 回復操作 |
| --- | --- | --- |
| not-found | 全画面404 | 試験選択へ |
| validation | 入力欄近傍と要約 | 入力修正 |
| pack-load/data-integrity | 全画面 | 再読込、試験選択 |
| storage/quota/transaction | 操作箇所のalert | 再試行、安全に戻る |
| conflict | modal | 最新状態を再読込 |
| backup-version/invalid | preview前のalert | 別ファイル選択 |
| pwa-registration | 非遮断通知 | オンライン利用を継続 |
| unexpected | error boundary | 再読込、試験選択 |

技術例外のmessage、stack、ファイル内容を利用者へ表示しない。開発buildだけ`console.error`へcauseを出し、本番buildではエラーコードと操作名だけを記録する。外部送信は行わない。

## 9. 離脱確認

- 通常演習の未確定入力、模試の保存中/保存失敗、復元の書込み中だけ離脱確認対象とする。
- 保存済みの未完了模試は離脱しても再開できるため、通常のroute移動で確認しない。
- `beforeunload`は対象状態の間だけ登録する。独自文言には依存しない。

## 10. 対応要件

FR-007〜FR-015、FR-023、FR-024、AC-01〜AC-10、QR-05に対応する。
