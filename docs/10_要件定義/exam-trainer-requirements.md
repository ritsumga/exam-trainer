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
  - https://www.postgresql.org/docs/current/app-pgbasebackup.html

verifiedAt: 2026-08-29
status: approved
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
- 選択式ではchoices
- 選択式では各choiceが誤りまたは正しい理由
- 製品同梱問題では1件以上のsources
- 製品同梱問題ではverifiedAt
- 製品同梱問題では`status: approved`

### 6.4 任意項目
- tags

### 6.5 公開条件と独自性

`sources`は、正解と主要な解説を直接確認できる公式資料または一次資料のHTTPS URLを原則とする。一次資料が存在しない場合だけ、理由を問題レビュー記録へ残して信頼できる二次資料を使用できる。`verifiedAt`は、最後に全出典と内容を照合した日付を`YYYY-MM-DD`で記録する。

下書きは製品Pack外で管理し、`sources`、`verifiedAt`、`status`を省略できる。製品へ同梱できるのは、Validator成功、内容レビューで`承認候補`、人の明示承認をすべて満たし、`status: approved`となった問題だけとする。AIまたは自動処理は`approved`へ変更してはならない。

実在試験の記憶問題、試験ダンプ、第三者問題集の転記や軽微な言い換えを禁止する。出典から技術的事実を確認したうえで、問題文、選択肢、解説を独自に構成する。

### 6.6 難易度

`difficulty`は次の基準で指定する。

- `1`: 用語または単一の基本事実をそのまま再生すれば解ける
- `2`: 1つの基本概念を既知の典型例へ適用すれば解ける
- `3`: 複数の基本事実を組み合わせるか、近い選択肢を区別する必要がある
- `4`: 条件、例外、複数段階の推論のいずれかを必要とする
- `5`: 複数の条件と例外を統合し、対象試験範囲内で高度な判断を必要とする

### 6.7 採点と入力正規化

- `single`は選択値が唯一の正解と一致した場合だけ正解とする。
- `multiple`は選択すべき個数を`answers`の件数から表示する。重複を除いた選択集合と正解集合が完全一致した場合だけ正解とする。選択順は無視し、部分点は設けない。
- `input`は回答と各正解候補へ、Unicode NFC正規化、CRLFまたはCRからLFへの改行統一、文字列前後のUnicode空白除去を順に適用する。大文字小文字、全角半角、内部空白は変換しない。正規化後に`answers`のいずれかと完全一致した場合だけ正解とする。
- 未回答は正解にしない。

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
  verifiedAt: string;
  status: "approved";
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

`selectedAnswer`はすべての問題形式で文字列配列として保存する。回答を確定して`attempts`を作成する時点では、`single`と`input`は必ず1件、`multiple`は1件以上とする。模擬試験の未回答問題には`attempts`を作成しない。

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

v1のExam Pack追加は開発者が`exam-packs/<exam-id>/`へファイルを配置し、Validator成功後にアプリを再ビルドする方式とする。利用者が画面からPackをインポート、更新、削除する機能はv1対象外とする。

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

### 11.1 v1の復習優先度

1回以上回答した問題について、次の各値を0以上1以下で算出し、100点満点の復習優先度を求める。

```text
recentWrong = 最終回答が誤答なら1、それ以外は0
errorRate = 1 - 正答数 / 回答数
lowConfidence = 最終回答のconfidenceがあれば(4 - confidence) / 3、なければ0.5
elapsedFactor = min(最終回答のelapsedMs / 120000, 1)
ageFactor = min(最終回答からの経過日数 / 30, 1)
streakFactor = 1 - min(末尾の連続正解数, 3) / 3

priority = 30 * recentWrong
         + 25 * errorRate
         + 15 * lowConfidence
         + 10 * elapsedFactor
         + 10 * ageFactor
         + 10 * streakFactor
```

- 経過日数は現在日時と`answeredAt`の差を24時間単位の小数で求め、負値は0とする。
- 得点は表示時だけ整数へ四捨五入し、並び替えには丸め前の値を使う。
- 弱点演習は得点降順、最終回答日時昇順、`questionId`昇順で並べる。
- 回答履歴のない問題は弱点演習に含めず、未回答演習で扱う。
- 削除または現在のPackに存在しない問題の履歴は集計へ使用しないが、利用者データから自動削除しない。

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
- 設定画面では問題数と制限時間を1以上の整数で指定でき、初期値はExam Packの`questionCount`と`durationMinutes`とする
- 指定問題数の上限はExam Packの`questionCount`、指定時間の上限はExam Packの`durationMinutes`とする
- 全分野に正の`weight`がある場合、指定問題数と比率から最大剰余法で分野別の整数枠を割り当てる。余りの同率は`domainId`昇順とする
- 一部の分野で枠数を満たせない場合、不足分を小数残余の大きい順、同率は`domainId`昇順で、未使用問題のある分野へ1問ずつ再配分する
- `weight`がない分野を1つでも含む場合、分野枠を設けず試験全体の問題プールから抽出する
- 試験全体の利用可能な承認済み問題数が指定問題数未満の場合は開始せず、必要数、利用可能数、不足数を表示する
- 分野不足を再配分した場合は、設定比率との差を開始前に通知する
- セッション途中の状態を保持する

問題の抽出と問題順はランダム化する。選択肢順のランダム化はv1の必須要件としない。同一問題を1セッションへ重複して出題しない。

### 12.1 中断再開と時間切れ

- 開始、回答の選択または入力、問題移動、見直しフラグ変更のたびに、未完了セッションをIndexedDBへ保存する。
- セッションには開始時刻と絶対期限を保存し、残り時間は絶対期限との差から算出する。アプリやブラウザを閉じている間も制限時間は経過する。
- 起動時に未完了セッションがある場合、利用者は再開または破棄を選べる。破棄には確認を求める。
- 絶対期限へ到達した時点で自動提出する。再起動時点ですでに期限を超えている場合も直ちに自動提出する。
- 未回答は不正解として得点と正答率の分母へ含め、結果に未回答として表示する。ただし回答履歴`attempts`は作成しない。
- 手動提出と自動提出は、同じ採点規則と結果保存処理を使用する。

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

### 13.1 復元規則

- バックアップ対象は`attempts`、`bookmarks`、`reviewState`、`examSessions`、`settings`の全件とし、Exam Packの問題本文は含めない。
- 復元はファイル全体を構文・スキーマ・参照整合性まで検証し、件数と置換対象をプレビューして利用者の確認を得た後に実行する。
- v1では既存データとのマージを行わず、全バックアップ対象をインポート内容で置換する。
- 置換は単一トランザクションで行い、検証、マイグレーション、保存のいずれかが失敗した場合は既存データを変更しない。
- 現行と同じ`schemaVersion`はそのまま復元する。対応を実装し自動試験済みの既知旧版だけをマイグレーションして復元する。
- 現行より新しい`schemaVersion`、欠落した版、対応表にない版は、既存データを変更せず拒否し、理由を表示する。
- 復元成功後に、置換件数と復元日時を表示する。

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
- 5,000問の試験fixtureに対するPack検証、セッション生成、弱点計算の各自動試験は、CIの基準環境でそれぞれ2秒以内に完了すること
- 5,000問読込後の通常演習における次問題表示は、Playwrightの基準環境で操作から1秒以内に完了すること

### 18.3 保守性
- TypeScriptのstrictモードを必須とする
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
- 横幅360pxから1,440pxで主要機能を利用でき、ページ全体の意図しない横スクロールを発生させない
- すべての操作可能要素を`Tab`と`Shift+Tab`で移動でき、`Enter`または`Space`で実行できる
- フォーカス位置を視覚的に識別でき、マウスだけを必須とする操作を設けない
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
- OSS-DB Silverの人が承認した独自問題10問以上。初期同梱は10〜20問とし、公開後は検証・レビュー・人の承認を通過した問題を継続追加できる
- 第2試験のデモPackとして3形式を各1問以上含む合計3問以上

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
- 利用者によるExam Packの実行時追加・更新・削除
- バックアップ復元時の既存データとのマージ

### 試験専用データ

- 50問と5,000問の自動試験fixtureは`tests/fixtures/exam-packs/`だけに置く。
- fixtureは製品Pack索引、製品ビルド成果物、PWAキャッシュへ含めない。
- 製品ビルドにfixtureのIDまたは問題本文が含まれないことを自動試験で確認する。

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
7. OSS-DB Silverサンプル問題を初期10〜20問投入し、公開後は承認済み問題を継続追加
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

1. `AC-01`: Validatorを通過し人が承認したOSS-DB Silverの独自問題10問以上をMarkdownから読み込み、問題ID、分野、本文、選択肢、出典を表示できる。
2. `AC-02`: `single`、`multiple`、`input`へ回答でき、6.7の境界値を含む採点試験がすべて成功する。
3. `AC-03`: 回答確定後に正誤、正解、自分の回答、詳細解説、選択式の各選択肢の解説、出典を表示でき、模擬試験中は提出まで表示しない。
4. `AC-04`: 回答履歴、理解度、お気に入り、未完了模擬試験を保存し、ブラウザ再起動後に同じ内容を取得または再開できる。
5. `AC-05`: 誤答、未回答、お気に入り、分野別、ランダム、指定問題数の各条件で、該当する問題だけから重複なしの通常演習を開始できる。
6. `AC-06`: 11.1の各要素、境界値、同点条件に対する単体試験が成功し、弱点演習が規定順で問題を提示する。
7. `AC-07`: 12および12.1の設定境界、分野割当、全体不足、分野不足、中断再開、手動提出、自動提出を自動試験で再現し、利用可能数以下に設定した問題数と制限時間で模擬試験を実施できる。
8. `AC-08`: 試験終了後に得点、全体正答率、分野別の問題数・正答数・正答率、回答時間、誤答、未回答、見直し対象を確認でき、誤答だけを再演習できる。
9. `AC-09`: 13.1の全対象をJSONへ出力し、同版、既知旧版、不正データ、未知版、保存失敗の試験で、規定どおり全置換または無変更となる。
10. `AC-10`: 一度オンラインで読み込んだ後にネットワークを遮断して再起動しても、試験選択、通常演習、採点、解説、履歴保存、模擬試験の中断再開、成績確認が動作する。
11. `AC-11`: 3形式を各1問以上含む第2試験デモPackを追加し、Pack固有の条件分岐を共通UI・エンジンへ追加せず、ValidatorとAC-02、AC-03、AC-05、AC-07を通過する。
12. `AC-12`: v1のインストール、ビルド、実行、主要学習機能、バックアップに、有料ライセンス、課金API、バックエンド、ログイン、クラウドDBが不要であることを依存一覧とオフラインE2Eで確認できる。

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
