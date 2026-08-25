# Exam Trainer 要件定義書

## 1. 概要

### 1.1 目的
資格試験学習向けの、完全無料で利用できるローカル中心のWebアプリを開発する。

主な用途:
- オリジナル問題の演習
- 誤答・弱点の復習
- 分野別・ランダム演習
- 本番相当の模擬試験
- 学習履歴・正答率の分析
- 将来的なローカルAIによる問題生成・レビュー

初期対応試験は **OSS-DB Silver** とするが、アプリ本体は特定試験へ依存させず、AWS等の複数資格試験を追加できる設計とする。

---

## 2. 基本方針

- 開発費・月額運用費を原則0円とする
- サーバーを必須としない
- ログイン機能を初期実装しない
- 問題データはGit管理可能なMarkdownで保持する
- 学習履歴はブラウザのIndexedDBへ保存する
- オフライン利用可能なPWAとする
- 特定資格固有の処理をアプリ本体へ埋め込まない
- 試験追加は原則として「Exam Pack」の追加だけで可能にする
- AI機能は初期リリースでは必須としない
- 将来のAIは有料API必須にせず、Ollama等のローカルLLMを利用可能な構成とする

---

## 3. 技術要件

### 3.1 推奨技術
- React
- TypeScript
- Vite
- Tailwind CSS
- IndexedDB
- Dexie.js
- Zod
- Recharts
- vite-plugin-pwa
- Markdown
- YAML Front Matter
- Git / GitHub
- 将来: Ollama

### 3.2 バックエンド
初期版では不要。

### 3.3 データ保存
以下を分離する。

#### 問題・試験定義
- Markdown / YAML
- Git管理対象

#### 学習履歴
- IndexedDB
- Git管理対象外
- JSONによるバックアップ・復元を可能にする

---

## 4. アーキテクチャ

```text
Exam Trainer
├─ UI
├─ Practice Engine
├─ Exam Engine
├─ Review Engine
├─ Statistics Engine
├─ Storage
│  └─ IndexedDB
└─ Exam Packs
   ├─ ossdb-silver
   ├─ aws-saa
   └─ ...
```

アプリ本体は `examId`、`domainId`、`questionType` 等の共通属性だけを扱う。

---

## 5. 試験パック（Exam Pack）

試験ごとの差分をExam Packとして管理する。

```text
exam-packs/
├─ ossdb-silver/
│  ├─ exam.yaml
│  ├─ domains.yaml
│  └─ questions/
└─ aws-saa/
   ├─ exam.yaml
   ├─ domains.yaml
   └─ questions/
```

### 5.1 exam.yaml 例

```yaml
id: ossdb-silver
name: OSS-DB Silver
vendor: LPI-Japan

exam:
  durationMinutes: 90
  questionCount: 50

questionTypes:
  - single
  - multiple
  - input
```

### 5.2 domains.yaml 例

```yaml
domains:
  - id: general
    name: 一般知識
    weight: 16

  - id: operations
    name: 運用管理
    weight: 52

  - id: development
    name: 開発・SQL
    weight: 32
```

出題比率が存在しない試験では `weight` は任意とする。

---

## 6. 問題データ仕様

問題はMarkdown + YAML Front Matterで管理する。

### 6.1 対応問題形式

初期版:
- `single`: 単一選択
- `multiple`: 複数選択
- `input`: 入力

将来拡張候補:
- ordering
- matching
- case-study

### 6.2 問題例

```md
---
id: ossdb-silver-operations-001
exam: ossdb-silver
domain: operations
type: single
difficulty: 3

choices:
  A: pg_dump
  B: pg_basebackup
  C: vacuumdb
  D: createdb

answers:
  - B

tags:
  - backup
  - physical-backup

sources:
  - https://example.com

verifiedAt: 2026-08-25
---

# Question

問題文。

# Explanation

解説。

## A

Aが誤りである理由。

## B

Bが正しい理由。

## C

Cが誤りである理由。

## D

Dが誤りである理由。
```

### 6.3 必須項目
- id
- exam
- domain
- type
- difficulty
- answers
- Question
- Explanation

### 6.4 推奨項目
- choices
- tags
- sources
- verifiedAt

---

## 7. TypeScript共通モデル

最低限以下の概念を定義する。

```ts
type QuestionType =
  | "single"
  | "multiple"
  | "input";

interface Question {
  id: string;
  examId: string;
  domainId: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  choices?: Choice[];
  answers: string[];
  explanation: string;
  tags: string[];
  sources: Source[];
}
```

特定資格固有の型をUIや学習エンジンへ持ち込まないこと。

---

## 8. 学習履歴

IndexedDBへ保存する。

### 8.1 回答履歴（attempts）

最低限以下を保持する。

```text
id
examId
questionId
sessionId
selectedAnswer
isCorrect
elapsedMs
confidence
answeredAt
mode
```

### 8.2 理解度（confidence）

回答後に理解度を記録可能にする。

例:
- 1: 分からない
- 2: あやふや
- 3: 理解した
- 4: 十分理解

### 8.3 その他保存対象
- bookmarks
- examSessions
- userSettings
- reviewState

---

## 9. 主要画面

### 9.1 試験選択
表示内容:
- 試験名
- 学習済み問題数
- 正答率
- 最終学習日時

操作:
- 試験を選択
- Exam Pack追加

### 9.2 試験ホーム
機能:
- 弱点復習
- 未回答
- ランダム
- 分野別
- 模擬試験
- 成績

### 9.3 通常演習
表示:
- 問題文
- 選択肢または入力欄
- 問題番号
- お気に入り
- 前後移動

回答後:
- 正誤
- 正解
- 自分の回答
- 詳細解説
- 各選択肢の解説
- 理解度
- 参照資料

### 9.4 模擬試験
機能:
- 試験設定に基づく問題数
- 制限時間
- 分野比率に基づく出題
- 問題移動
- 見直しフラグ
- 未回答確認
- 試験終了確認
- 試験中は解説非表示

### 9.5 試験結果
表示:
- 得点
- 正答率
- 分野別正答率
- 回答時間
- 誤答一覧
- 見直し対象
- 誤答のみ再演習

### 9.6 成績
表示:
- 全体正答率
- 分野別正答率
- 学習問題数
- 弱点分野
- 模擬試験履歴
- 回答時間傾向

---

## 10. 演習モード

最低限以下を実装する。

- 未回答
- 誤答
- 弱点
- お気に入り
- 分野別
- ランダム
- 指定問題数
- 模擬試験

---

## 11. 弱点・復習ロジック

初期版ではAI不要。

以下を使って復習優先度を計算する。

- 直近の正誤
- 累積正答率
- 理解度
- 最終回答からの経過日数
- 連続正解数
- 回答時間

ロジックは独立モジュール化し、将来差し替え可能にする。

---

## 12. 模擬試験生成

Exam Packの設定を使って生成する。

例:

```text
questionCount = 50
durationMinutes = 90
domainWeights = 16 / 52 / 32
```

要件:
- 同一試験内の問題プールから抽出
- 出題比率が指定されている場合は可能な限り従う
- 問題数不足時の例外処理を実装
- 問題順、選択肢順は必要に応じてランダム化可能
- セッション途中の状態を保持可能にする

---

## 13. バックアップ・復元

ユーザーの学習履歴をJSONでExport / Importできること。

バックアップ対象:
- attempts
- bookmarks
- reviewState
- examSessions
- settings

要件:
- schemaVersionを持たせる
- インポート時にZod等で検証する
- 将来のスキーマ変更へ対応可能にする

---

## 14. PWA・オフライン

要件:
- インストール可能
- 問題演習はオフラインで動作
- 学習履歴もローカル保存
- PC・スマートフォン双方で利用可能なレスポンシブUI

初期版では端末間自動同期は実装しない。

---

## 15. AI機能（将来）

初期版では必須ではない。

### 15.1 AI Provider抽象化

```ts
interface AIProvider {
  generateQuestions(...): Promise<Question[]>;
  reviewQuestion(...): Promise<ReviewResult>;
}
```

将来候補:
- OllamaProvider
- OpenAIProvider
- GeminiProvider
- AnthropicProvider

初期の無料構成ではOllamaを想定する。

### 15.2 問題生成フロー

```text
公式資料
↓
関連箇所抽出
↓
問題生成
↓
AIレビュー
↓
検証
↓
人間による承認
↓
正式問題
```

AI生成問題を自動的に正式問題へ登録しない。

### 15.3 問題状態

例:
- draft
- reviewed
- approved
- rejected

---

## 16. 品質要件

問題Validatorで可能な範囲を自動検証する。

確認項目:
- ID重複なし
- 必須属性あり
- Exam / Domainが存在
- QuestionTypeが対応範囲内
- 単一選択で正解が1件
- 選択式で正解がchoices内に存在
- difficultyが1〜5
- 解説あり
- Markdown解析エラーなし

将来:
- 類似問題検出
- 重複問題検出
- AIによる技術レビュー

---

## 17. 推奨ディレクトリ構成

```text
exam-trainer/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ features/
│  │  ├─ practice/
│  │  ├─ exam/
│  │  ├─ review/
│  │  ├─ statistics/
│  │  ├─ questions/
│  │  └─ ai/
│  ├─ core/
│  │  ├─ exam-engine/
│  │  ├─ question-engine/
│  │  ├─ review-engine/
│  │  └─ scoring/
│  ├─ db/
│  ├─ schemas/
│  └─ types/
│
├─ exam-packs/
│  ├─ ossdb-silver/
│  │  ├─ exam.yaml
│  │  ├─ domains.yaml
│  │  └─ questions/
│  └─ aws-saa/
│
├─ scripts/
│  ├─ validate-exams.ts
│  ├─ validate-questions.ts
│  ├─ build-question-packs.ts
│  └─ duplicate-check.ts
│
├─ tests/
└─ package.json
```

---

## 18. 非機能要件

### 18.1 費用
- 必須機能について有料サービスを使用しない
- 月額固定費0円
- AI API課金を必須にしない

### 18.2 パフォーマンス
- 数千問規模でも通常演習が実用的な速度で動作すること
- 初回ロード後の画面遷移で不要な全件再読込を避けること

### 18.3 保守性
- TypeScript strict推奨
- 試験固有ロジックと共通ロジックを分離
- データ形式をZod等で検証
- 機能単位でモジュール化

### 18.4 拡張性
新しい資格試験の追加時に、原則として以下のみで対応可能にする。

```text
exam-packs/<new-exam>/
├─ exam.yaml
├─ domains.yaml
└─ questions/
```

共通UIや共通エンジンの変更を極力不要とする。

### 18.5 利用者体験（UX）
- PC / スマホ対応
- 回答操作が少ない
- 正誤と解説が視認しやすい
- キーボード操作も考慮
- 模擬試験では残り時間と回答状況を常時確認可能

---

## 19. 初期リリース対象

### v1 必須
- React + TypeScript + Vite
- Exam Pack読込
- OSS-DB Silver 1試験対応
- Markdown問題読込
- single / multiple / input
- 通常演習
- 即時採点
- 解説表示
- 回答履歴
- 理解度
- お気に入り
- 未回答
- 誤答
- 分野別
- ランダム
- 弱点復習
- 模擬試験
- タイマー
- 見直しフラグ
- 試験結果
- 基本成績表示
- IndexedDB
- バックアップ / 復元
- PWA
- オフライン動作

### v1 対象外
- ログイン
- クラウドDB
- ユーザー管理
- 課金
- ランキング
- SNS
- リアルタイム同期
- AI問題自動生成
- AI弱点分析

### v2候補
- Ollama連携
- 問題生成
- AIレビュー
- 公式資料を利用したRAG
- 問題重複検出
- AI弱点分析
- 複数端末同期Provider

---

## 20. 実装順序

1. Vite + React + TypeScriptセットアップ
2. 共通型定義
3. Zodスキーマ
4. Exam Pack仕様
5. Markdownパーサー
6. 問題バリデーター
7. OSS-DB Silverサンプル問題を10〜20問投入
8. 通常演習UI
9. 採点
10. 解説表示
11. Dexie / IndexedDB
12. 回答履歴
13. 各演習モード
14. 弱点判定
15. 模擬試験エンジン
16. 試験結果
17. 成績画面
18. バックアップ・復元
19. PWA
20. AWS等の2つ目のExam Packを追加し、アプリ本体変更なしで動作することを検証

---

## 21. 受け入れ条件

v1完成条件:

1. OSS-DB Silverの問題をMarkdownから読み込める
2. 3種類の問題形式へ回答できる
3. 正誤判定と解説表示ができる
4. 回答履歴がブラウザ再起動後も残る
5. 誤答・未回答・お気に入り・分野別・ランダム演習ができる
6. 弱点問題を抽出できる
7. 模擬試験を問題数・制限時間付きで実施できる
8. 試験終了後に分野別結果を確認できる
9. 学習データをJSONへバックアップ・復元できる
10. オフラインで主要学習機能が動作する
11. 2つ目の試験をExam Pack追加のみで利用できる
12. 有料サービスなしで主要機能が利用できる

---

## 22. 実装上の禁止事項

- OSS-DB固有のdomain名や問題数をUIへハードコードしない
- AWS固有ロジックを共通エンジンへ追加しない
- 学習履歴を問題Markdownへ書き込まない
- 初期版で不要なバックエンドを導入しない
- 有料APIを必須依存にしない
- AI生成問題を無検証で正式問題へ追加しない
- 問題形式を単一選択だけ前提に設計しない

---

## 23. Codexへの実装方針

実装時は以下を優先すること。

1. シンプルさ
2. 型安全性
3. 試験非依存
4. データ駆動
5. ローカルファースト
6. 無料運用
7. テスト可能性
8. 将来拡張性

機能追加時に特定Exam Packだけを特別扱いする必要が生じた場合、まずデータモデルまたは共通インターフェースで解決できないか検討すること。
