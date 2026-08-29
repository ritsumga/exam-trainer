# ドメインエンジン詳細設計

## 1. 目的

本書は採点、通常演習生成、模擬試験生成、復習優先度、結果・統計集計の純粋関数と決定的アルゴリズムを確定する。

## 2. 共通境界

```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

interface Clock { now(): Date }
interface RandomSource { next(): number }
```

`RandomSource.next()`は0以上1未満の有限数を返す。範囲外は`InvalidRandomSourceError`とする。エンジンは例外を通常分岐に使わず、利用者入力に起因する失敗は`Result`で返す。不変条件違反だけを例外とする。

## 3. 回答正規化と採点

```ts
function normalizeAnswer(questionType: QuestionType, raw: readonly string[]): readonly string[];
function gradeAnswer(question: Question, raw: readonly string[]): GradeResult;

type GradeResult = {
  isAnswered: boolean;
  isCorrect: boolean;
  normalizedSelectedAnswer: readonly string[];
  normalizedCorrectAnswer: readonly string[];
};
```

共通処理として配列要素以外の型を受け付けず、選択式は同一値の重複を除去する。形式別規則は次とする。

| 形式 | 正規化 | 正解条件 |
| --- | --- | --- |
| `single` | 重複除去のみ | 要素数1で唯一のanswersと一致 |
| `multiple` | 重複除去後、コードポイント辞書順 | 正規化済み集合がanswers集合と完全一致 |
| `input` | 各値へNFC、CRLF/CR→LF、前後のUnicode White_Space除去 | 要素数1かつ空文字でなく、answers候補のいずれかと一致 |

入力の前後除去にはECMAScriptの`String.prototype.trim()`を使う。内部空白、大小文字、全半角は変更しない。未回答、複数値のsingle/input、choice外の値は`isAnswered`または`isCorrect`をfalseとし、保存サービスが不正回答を拒否する。

## 4. 乱数

### 4.1 シード

シードは符号なし32 bit整数`0..4294967295`とする。新規セッションでは`crypto.getRandomValues(new Uint32Array(1))[0]`を生成し保存する。試験では固定値を渡す。

### 4.2 生成器とシャッフル

生成器はMulberry32、並べ替えはFisher–Yatesとする。

```ts
function createMulberry32(seed: number): RandomSource;
function shuffle<T>(values: readonly T[], random: RandomSource): readonly T[];
```

Fisher–Yatesは末尾`i = length - 1`から1まで降順に処理し、`j = floor(next() * (i + 1))`と交換する。入力配列を複製してから操作する。アルゴリズム変更は再現性に影響するため、DB/セッションschema変更として扱う。

## 5. 通常演習生成

```ts
type PracticeMode = "unanswered" | "incorrect" | "bookmarked" | "domain" | "random" | "weakness" | "explicit";

type PracticeRequest = {
  examId: string;
  mode: PracticeMode;
  count: number;
  domainIds?: readonly string[];
  explicitQuestionIds?: readonly string[];
};

function buildPracticeSession(
  request: PracticeRequest,
  questions: readonly Question[],
  attempts: readonly Attempt[],
  bookmarks: readonly Bookmark[],
  now: Date,
  random: RandomSource,
): Result<PracticePlan, PracticePlanError>;
```

候補判定は現行Packの対象examの問題だけに限定する。最新Attemptは`answeredAt`降順、同時刻なら`id`降順で決める。

| モード | 候補・順序 |
| --- | --- |
| `unanswered` | Attemptがない問題、questionId昇順 |
| `incorrect` | 最新Attemptが誤答、questionId昇順 |
| `bookmarked` | bookmarkあり、questionId昇順 |
| `domain` | 指定domainの和集合、questionId昇順 |
| `random` | 全問題をshuffle |
| `weakness` | 7章の順位 |
| `explicit` | 指定IDの順。存在しないIDは除外せずエラー |

`domainIds`はdomainモードだけ1件以上、`explicitQuestionIds`はexplicitだけ1件以上を必須とする。`count`は1以上。候補0件は`no-candidates`、countが候補より多い場合は`insufficient-candidates`として利用可能数を返す。random以外も、選択問題を決めた後に提示順をshuffleする。ただしweaknessとexplicitは意味のある順序を維持しshuffleしない。

## 6. 模擬試験生成

```ts
function createMockExamPlan(
  pack: ExamPackIndex,
  request: { questionCount: number; durationMinutes: number; seed: number },
): Result<MockExamPlan, MockExamPlanError>;
```

### 6.1 設定検証

- `questionCount`と`durationMinutes`は整数かつ1以上。
- 問題数上限は`pack.exam.exam.questionCount`。
- 時間上限は`pack.exam.exam.durationMinutes`。
- 全問題数が指定数未満なら`insufficient-total`に必要数、利用可能数、不足数を返す。

### 6.2 最大剰余法

全domainに正のweightがある場合、各domainについて次を算出する。

```text
quota = questionCount * weight / sum(weights)
base = floor(quota)
remainder = quota - base
```

`questionCount - sum(base)`個を、remainder降順、同率はdomainIdのUnicodeコードポイント昇順で1枠ずつ加算する。浮動小数の同率判定には演算結果の厳密一致を使い、epsilon比較を行わない。入力weightは有限正数だけのため結果は決定的である。

### 6.3 分野不足再配分

1. 各domainの実割当を`min(initialAllocation, availableCount)`とし不足合計を求める。
2. 空きがあるdomainを、元quotaのremainder降順、同率はdomainId昇順に並べる。
3. 並び順に1問ずつ加算し、末尾後は先頭へ戻る。空きがなくなったdomainを除く。
4. 不足が0になるまで繰り返す。全体数検証済みのため必ず完了する。
5. `initialCount`, `actualCount`, `difference`を全domainについて返し、差が1件でもあれば`redistributed: true`とする。

weightが1つでもない場合は全体プールをshuffleして先頭N件を採用し、`domainAllocations`は実際の選択数だけを返す。

weightありではdomainごとの問題配列をquestionId昇順からそれぞれ独立にshuffleして必要数を取得し、結合した問題ID列を同じRandomSourceの続きで再度shuffleする。重複は許可しない。

## 7. 復習優先度

```ts
function rankReviewQuestions(
  questionIds: ReadonlySet<string>,
  attempts: readonly Attempt[],
  now: Date,
): readonly ReviewPriority[];
```

問題ごとに`answeredAt`昇順、同時刻は`id`昇順へ並べる。要件11.1の6要素をそのまま計算する。追加規則は次とする。

- futureの`answeredAt`は経過日数0とする。
- `elapsedMs`は保存schemaで0以上に制限済みとし、120,000以上は1とする。
- 最新confidence欠落は0.5とする。
- 末尾の連続正解は最新から逆順に最初の誤答まで数え、3で打ち切る。
- 丸め前得点を`rawPriority`、`Math.round`した値を`displayPriority`として返す。
- 並び順はrawPriority降順、最新answeredAt昇順、questionId昇順とする。

PackにないIDとAttemptのないIDは返さない。不正日時はschema境界で拒否し、エンジン内で補正しない。

## 8. 模試提出と結果

```ts
function calculateMockExamResult(
  pack: ExamPackIndex,
  session: InProgressExamSession,
  submittedAt: Date,
  reason: "manual" | "deadline",
): MockExamResult;
```

questionIdsの全件を分母とし、回答配列が存在し有効な問題だけ採点する。未回答は不正解だがAttempt候補を返さない。結果は次を持つ。

```ts
type MockExamResult = {
  totalCount: number;
  answeredCount: number;
  correctCount: number;
  percentage: number;
  elapsedMs: number;
  domainResults: readonly DomainResult[];
  incorrectQuestionIds: readonly string[];
  unansweredQuestionIds: readonly string[];
  flaggedQuestionIds: readonly string[];
};
```

`percentage`は`correctCount / totalCount * 100`の小数値を保持し、表示時だけ小数第1位へ丸める。`elapsedMs`は0以上`submittedAt - startedAt`で、deadline提出では期限を上限とする。domainResultsはPackのdomain順、各ID列はセッション提示順とする。

## 9. 統計

```ts
function aggregateStatistics(
  pack: ExamPackIndex,
  attempts: readonly Attempt[],
  completedSessions: readonly CompletedExamSession[],
): ExamStatistics;
```

- 現行question IDだけを対象とする。
- 回答履歴正答率はAttempt件数を分母とし、未回答を含めない。
- 学習済み問題数はAttemptが1件以上ある一意question数とする。
- 分野別集計はPackのdomain順とする。
- 弱点分野は分野ごとの最新Attempt正答率が最低の分野とし、同率はdomainId昇順。Attemptなしの分野は候補外とする。
- 回答時間傾向は暦日UTC単位で件数、中央値、平均を返す。中央値は昇順中央、偶数は中央2値の平均とする。
- 模試履歴はsubmittedAt降順、同時刻はsession ID昇順とする。

## 10. 対応要件

FR-001〜FR-009、FR-011、FR-023、AC-02、AC-05〜AC-08、QR-02、QR-04に対応する。
