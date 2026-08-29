# 型・スキーマ・Exam Pack詳細設計

## 1. 目的

本書は、Exam Trainer v1で公開するTypeScript型、Zodスキーマ、Exam Pack原本と生成物、Validatorの判定順を確定する。Zodスキーマを外部入力と永続化データの正本とし、TypeScript型は`z.infer`から導出する。

## 2. 共通規則

- TypeScriptは`strict: true`、`noUncheckedIndexedAccess: true`、`exactOptionalPropertyTypes: true`とする。
- IDは`^[a-z0-9]+(?:-[a-z0-9]+)*$`、長さ1〜100文字とする。`examId`、`domainId`、`questionId`へ同じ規則を適用する。
- 永続化日時はUTCのISO 8601文字列`YYYY-MM-DDTHH:mm:ss.sssZ`へ正規化する。確認日は実在する暦日の`YYYY-MM-DD`とする。
- 利用者回答は全形式で`string[]`とする。保存時の`single`と`input`は1件、`multiple`は重複のない1件以上とする。
- 空文字列、前後空白を含むID、非有限数、Zodの未知キーを拒否する。外部入力用object schemaは`.strict()`とする。
- エンジン入力は`Readonly`、返却配列は`readonly`を基本とし、入力を破壊的に変更しない。

## 3. ディレクトリと公開単位

```text
src/
├─ schemas/
│  ├─ common.ts
│  ├─ exam-pack.ts
│  ├─ learning-data.ts
│  └─ backup.ts
├─ types/
│  ├─ exam-pack.ts
│  ├─ learning-data.ts
│  ├─ ports.ts
│  └─ errors.ts
└─ generated/exam-packs/       # Git管理外、ビルドごとに再生成
   ├─ catalog.json
   └─ <exam-id>.json
```

`src/types/`は再exportだけを行い、同じ構造をinterfaceで再定義しない。`src/generated/exam-packs/`は`npm run validate`または`npm run build:packs`で生成し、Viteが内容ハッシュ付きアセットとして出力する。

## 4. Exam Packモデル

### 4.1 列挙型

```ts
const questionTypeSchema = z.enum(["single", "multiple", "input"]);
const difficultySchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
]);
const approvedStatusSchema = z.literal("approved");
```

### 4.2 試験と分野

```ts
const examDefinitionSchema = z.object({
  id: idSchema,
  name: nonEmptyTextSchema,
  vendor: nonEmptyTextSchema,
  exam: z.object({
    durationMinutes: z.number().int().positive(),
    questionCount: z.number().int().positive(),
  }).strict(),
  questionTypes: z.array(questionTypeSchema).min(1),
}).strict();

const domainSchema = z.object({
  id: idSchema,
  name: nonEmptyTextSchema,
  weight: z.number().positive().optional(),
}).strict();

const domainsFileSchema = z.object({
  domains: z.array(domainSchema).min(1),
}).strict();
```

`questionTypes`と`domains[].id`はファイル内で重複不可とする。`weight`は全分野に存在して正数であるか、全分野で省略するかのどちらかだけを許可する。試験設定値は製品問題数を超えてもよい。UIの初期値と入力上限はPack設定値を維持し、利用可能問題数未満であれば開始前に不足情報を表示する。

### 4.3 問題判別共用体

共通フィールドは次とする。

```ts
const questionBaseSchema = z.object({
  id: idSchema,
  examId: idSchema,
  domainId: idSchema,
  difficulty: difficultySchema,
  answers: z.array(nonEmptyTextSchema).min(1),
  question: nonEmptyMarkdownSchema,
  explanation: nonEmptyMarkdownSchema,
  tags: z.array(idSchema),
  sources: z.array(z.object({ url: z.string().url().startsWith("https://") }).strict()).min(1),
  verifiedAt: dateOnlySchema,
  status: approvedStatusSchema,
});
```

形式別の制約は次とする。

| 形式 | 追加フィールド | 制約 |
| --- | --- | --- |
| `single` | `choices: Choice[]`、`choiceExplanations: Record<string, string>` | choiceは2件以上、値は重複不可、answersは1件、正解はchoice内、解説キーはchoiceと完全一致 |
| `multiple` | 同上 | choiceは2件以上、answersは重複なしで1件以上かつchoice数未満、全正解はchoice内、解説キーはchoiceと完全一致 |
| `input` | `choices`と`choiceExplanations`を持たない | answersは正規化後に重複なし、1件以上 |

```ts
type Question =
  | SingleQuestion
  | MultipleQuestion
  | InputQuestion;
```

`Choice`は`{ id: string; text: string }`とする。Markdown原本のmapping形式をキー昇順ではなくYAML記載順の配列へ変換する。回答値はchoiceの`id`であり表示文ではない。

### 4.4 Markdown見出し

- レベル1の`Question`と`Explanation`を各1件必須とし、順序もこの順とする。
- 選択式では`Explanation`配下に各choice IDと同名のレベル2見出しを各1件必須とする。
- 未知のレベル1見出し、同名見出し、空本文を拒否する。
- MarkdownはHTMLを許可せず、リンク、段落、リスト、インラインコード、コードブロック、表だけを表示対象とする。
- 原本Front Matterの`exam`、`domain`は生成時に`examId`、`domainId`へ変換する。

## 5. 生成物

### 5.1 カタログ

```ts
type ExamCatalog = {
  schemaVersion: 1;
  generatedAt: string;
  exams: readonly ExamCatalogEntry[];
};

type ExamCatalogEntry = {
  examId: string;
  name: string;
  vendor: string;
  durationMinutes: number;
  questionCount: number;
  availableQuestionCount: number;
  questionTypes: readonly QuestionType[];
  dataPath: string;
};
```

### 5.2 試験単位データ

```ts
type GeneratedExamPack = {
  schemaVersion: 1;
  exam: ExamDefinition;
  domains: readonly Domain[];
  questions: readonly Question[];
};
```

カタログは`examId`昇順、分野は原本順、問題は`questionId`昇順で固定する。`dataPath`はViteの`import.meta.glob("../generated/exam-packs/*.json")`から作るloader表のキーと対応させ、利用者入力をimport文字列へ連結しない。読込後にZodで再検証し、次の実行時索引をメモリ上に一度だけ構築する。

```ts
type ExamPackIndex = {
  pack: GeneratedExamPack;
  questionById: ReadonlyMap<string, Question>;
  questionsByDomainId: ReadonlyMap<string, readonly Question[]>;
};
```

## 6. Validator

YAMLは`yaml`を`uniqueKeys: true`、alias上限0で使用し、Front Matterの区切り検出は`gray-matter`、Markdown構文木は`unified`、`remark-parse`、`remark-gfm`で解析する。ValidatorとUIは同じMarkdown許可要素定義を共有する。依存バージョンは工程4開始時のNode.js 24環境で選定して`package.json`へ完全固定する。

検証は次の順で行い、可能な限り同一段階の全エラーを収集する。

1. 製品入力を`exam-packs/*/exam.yaml`から列挙する。シンボリックリンクと隠しディレクトリを拒否する。
2. YAML、Front Matter、Markdownを構文解析する。YAML alias、重複キー、複数文書を拒否する。
3. ファイル単位のZodスキーマを検証する。
4. Pack内でexam IDとディレクトリ名、questionのexam/domain参照、対応形式を検証する。
5. Pack横断でexam IDとquestion IDの重複を検証する。
6. 形式別のanswers、choices、選択肢解説を検証する。
7. `sources`、`verifiedAt`、`status: approved`を検証する。
8. カタログと試験単位JSONを一時領域へ生成し、生成物スキーマで自己検証する。
9. 成功時だけ生成先を置換する。失敗時は既存生成物を利用しない。

エラーは`PACK_<分類>`コード、相対パス、可能なら行・列、JSON Path、原因を持つ。表示順は相対パス、行、コードの昇順とする。終了コードは成功0、検証失敗1、ツール障害2とする。

## 7. Pack境界

```ts
interface ExamPackCatalog {
  list(): Promise<readonly ExamCatalogEntry[]>;
  load(examId: string): Promise<ExamPackIndex>;
}
```

`list`はカタログを一度だけ読込み、`load`は試験単位でPromiseをキャッシュする。未知IDは`NotFoundError`、取得失敗は`PackLoadError`、スキーマ不一致は`DataIntegrityError`とする。失敗Promiseはキャッシュから除去し、再試行可能にする。

## 8. AI拡張型

```ts
type CandidateStatus = "draft" | "reviewed" | "rejected";

interface AIProvider {
  generateQuestions(input: GenerateQuestionsInput): Promise<Result<readonly QuestionCandidate[], AIProviderError>>;
  reviewQuestion(input: ReviewQuestionInput): Promise<Result<QuestionReview, AIProviderError>>;
}
```

`QuestionCandidate`は製品`Question`と別型とし、`status: "approved"`を表現できない。`AIProviderError.code`は`unavailable | invalid-input | generation-failed | review-failed`とする。v1では型だけを配置し、実装、依存注入、画面、設定を作らない。

## 9. 対応要件

FR-001〜FR-004、FR-016〜FR-022、AC-01〜AC-03、AC-11、QR-01〜QR-03、QR-06に対応する。
