import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

type RawQuestion = {
  number: number;
  question: string;
  choices: Record<string, string>;
  answers: string[];
  explanation: string;
  domain: "structure" | "operation" | "sql";
};

const candidateRoot = path.resolve("question-candidates/ossdb-silver");
const questionRoot = path.join(candidateRoot, "questions");
const outlineUrl = "https://oss-db.jp/outline/silver";
const postgresDocsUrl = "https://www.postgresql.org/docs/current/";
const sourceUrlsFor = (raw: RawQuestion) => {
  const text = `${raw.question}\n${Object.values(raw.choices).join("\n")}\n${raw.explanation}`.toLowerCase();
  if (/(license|ライセンス|メジャーバージョン|マイナーリリース|サポート)/.test(text)) return ["https://www.postgresql.org/support/versioning/"];
  if (/(initdb|pgdata|template0|template1)/.test(text)) return ["https://www.postgresql.org/docs/current/app-initdb.html", "https://www.postgresql.org/docs/current/manage-ag-overview.html"];
  if (/(pg_ctl|createuser|createdb|psql|pg_isready|pg_config|pg_controldata|pg_resetwal)/.test(text)) return ["https://www.postgresql.org/docs/current/reference-client.html"];
  if (/(postgresql\.conf|pg_hba\.conf|listen_addresses|logging_collector|pg_settings|\bshow\b|\bset\b)/.test(text)) return ["https://www.postgresql.org/docs/current/runtime-config.html", "https://www.postgresql.org/docs/current/auth-pg-hba-conf.html"];
  if (/(pg_dump|pg_restore|pg_basebackup|pit r|pitr|wal|recovery\.signal|バックアップ|アーカイブ)/.test(text)) return ["https://www.postgresql.org/docs/current/backup.html", "https://www.postgresql.org/docs/current/continuous-archiving.html"];
  if (/(role|ロール|grant|revoke|権限|current_user)/.test(text)) return ["https://www.postgresql.org/docs/current/user-manag.html", "https://www.postgresql.org/docs/current/ddl-priv.html"];
  if (/(vacuum|analyze|autovacuum)/.test(text)) return ["https://www.postgresql.org/docs/current/routine-vacuuming.html"];
  if (/(replication|レプリケーション|publication|subscription)/.test(text)) return ["https://www.postgresql.org/docs/current/warm-standby.html", "https://www.postgresql.org/docs/current/logical-replication.html"];
  if (/(select|where|order by|distinct|limit|offset|group by|having|join|insert|update|delete|count\(|lower\(|current_timestamp|commit|read committed|トランザクション|ロック)/.test(text)) return ["https://www.postgresql.org/docs/current/sql.html", "https://www.postgresql.org/docs/current/tutorial-sql.html"];
  if (/(varchar|text|bytea|jsonb|boolean|bigint|not null|unique|check|identity|インデックス|ビュー|パーティション)/.test(text)) return ["https://www.postgresql.org/docs/current/datatype.html", "https://www.postgresql.org/docs/current/ddl-constraints.html"];
  return [postgresDocsUrl];
};

const normalize = (value: string) => value.replace(/\r\n/g, "\n").trim();
const yamlString = (value: string) => JSON.stringify(value);
const capture = (match: RegExpMatchArray, index: number) => {
  const value = match[index];
  if (value === undefined) throw new Error("正規表現のキャプチャが不足しています。");
  return value;
};

const answerMap = (source: string) => {
  const answers = new Map<number, string[]>();
  for (const match of source.matchAll(/(\d{3}):([A-E](?:\s*,\s*[A-E])*)/g)) {
    answers.set(Number(capture(match, 1)), capture(match, 2).split(",").map((answer) => answer.trim().toLowerCase()));
  }
  return answers;
};

const parseChoices = (source: string) => {
  const choices: Record<string, string> = {};
  for (const match of source.matchAll(/^\s*-?\s*([A-E])\.\s+(.+)$/gm)) {
    choices[capture(match, 1).toLowerCase()] = normalize(capture(match, 2));
  }
  return choices;
};

const candidateMarkdown = (id: string, raw: RawQuestion) => {
  const type = raw.answers.length === 1 ? "single" : "multiple";
  const choiceLines = Object.entries(raw.choices).map(([key, value]) => `  ${key}: ${yamlString(value)}`).join("\n");
  const choiceExplanations = Object.keys(raw.choices).map((key) => {
    const message = raw.answers.includes(key)
      ? `正解です。${raw.explanation}`
      : `不正解です。この選択肢は問題の前提における正解条件を満たしません。${raw.explanation}`;
    return `## ${key}\n\n${message}`;
  }).join("\n\n");
  const sourceLines = sourceUrlsFor(raw).map((url) => `  - url: ${url}`).join("\n");
  return `---
id: ${id}
exam: ossdb-silver
domain: ${raw.domain}
type: ${type}
difficulty: 2
answers: [${raw.answers.join(", ")}]
choices:
${choiceLines}
tags: [ossdb-silver, candidate]
sources:
  - url: ${outlineUrl}
${sourceLines}
verifiedAt: 2026-08-31
status: reviewed
---
# Question

${raw.question}

# Explanation

${raw.explanation}

${choiceExplanations}
`;
};

const parseV3 = (problems: string, answers: string): RawQuestion[] => {
  const mappedAnswers = answerMap(answers);
  const answerBlocks = new Map<number, string>();
  for (const match of answers.matchAll(/^### 問(\d+)\s+—.+?\n([\s\S]*?)(?=^### 問|(?![\s\S]))/gm)) {
    answerBlocks.set(Number(capture(match, 1)), normalize(capture(match, 2)));
  }
  const output: RawQuestion[] = [];
  for (const match of problems.matchAll(/^## 問(\d+)\s+[^\n]*\n([\s\S]*?)(?=^## 問|(?![\s\S]))/gm)) {
    const number = Number(capture(match, 1));
    const body = normalize(capture(match, 2));
    const firstChoice = body.search(/^\s*-\s*A\.\s+/m);
    const question = normalize(body.slice(0, firstChoice));
    const choices = parseChoices(body.slice(firstChoice));
    const questionAnswers = mappedAnswers.get(number);
    const explanation = answerBlocks.get(number);
    if (!question || Object.keys(choices).length < 2 || !questionAnswers || !explanation) {
      throw new Error(`Ver.3問題 ${number} を完全に抽出できませんでした。`);
    }
    if (number === 53) {
      output.push({
        number,
        question: "稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するための公式ユーティリティはどれか。1つ選びなさい。",
        choices: { a: "pg_basebackup", b: "pg_dump", c: "pg_restore", d: "vacuumdb" },
        answers: ["a"],
        explanation: "`pg_basebackup`は稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するユーティリティです。`pg_dump`は論理バックアップ、`pg_restore`はアーカイブ形式の復元、`vacuumdb`は保守処理に使用します。",
        domain: "operation",
      });
      continue;
    }
    output.push({ number, question, choices, answers: questionAnswers, explanation, domain: number <= 16 ? "structure" : number <= 68 ? "operation" : "sql" });
  }
  return output;
};

const parseMock = (problems: string, answers: string): RawQuestion[] => {
  const answerBlocks = new Map<number, { answers: string[]; explanation: string }>();
  for (const match of answers.matchAll(/<a id="a(\d+)"><\/a>\s*\n### 問\d+[^\n]*正解[：:]\s*([A-E](?:[、,]\s*[A-E])*)\s*\n([\s\S]*?)(?=<a id="a\d+"|(?![\s\S]))/gm)) {
    answerBlocks.set(Number(capture(match, 1)), {
      answers: capture(match, 2).split(/[、,]/).map((answer) => answer.trim().toLowerCase()),
      explanation: normalize(capture(match, 3).split(/\n---\n/)[0] ?? ""),
    });
  }
  const output: RawQuestion[] = [];
  for (const match of problems.matchAll(/<a id="q(\d+)"><\/a>\s*\n### 問\d+\s*\n([\s\S]*?)(?=\n\[解答・解説\]|<a id="q\d+"|(?![\s\S]))/gm)) {
    const number = Number(capture(match, 1));
    const body = normalize(capture(match, 2));
    const firstChoice = body.search(/^A\.\s+/m);
    const question = normalize(body.slice(0, firstChoice));
    const choices = parseChoices(body.slice(firstChoice));
    const answer = answerBlocks.get(number);
    if (!question || Object.keys(choices).length < 2 || !answer) {
      throw new Error(`模擬試験問題 ${number} を完全に抽出できませんでした。`);
    }
    output.push({ number, question, choices, answers: answer.answers, explanation: answer.explanation, domain: number <= 8 ? "structure" : number <= 34 ? "operation" : "sql" });
  }
  return output;
};

await rm(questionRoot, { recursive: true, force: true });
await mkdir(questionRoot, { recursive: true });
await writeFile(path.join(candidateRoot, "exam.yaml"), `id: ossdb-silver\nname: OSS-DB Silver 学習用（候補）\nvendor: LPI-Japan\nexam:\n  durationMinutes: 90\n  questionCount: 150\nquestionTypes:\n  - single\n  - multiple\n  - input\n`, "utf8");
await writeFile(path.join(candidateRoot, "domains.yaml"), `domains:\n  - id: sql\n    name: SQL\n  - id: operation\n    name: 運用管理\n  - id: structure\n    name: データベース構造\n`, "utf8");

const [v3Problems, v3Answers, mockProblems, mockAnswers] = await Promise.all([
  readFile(path.join(candidateRoot, "oss-db-silver_ver3_problem_set_100.md"), "utf8"),
  readFile(path.join(candidateRoot, "oss-db-silver_ver3_answers_explanations.md"), "utf8"),
  readFile(path.join(candidateRoot, "模擬試験_問題.md"), "utf8"),
  readFile(path.join(candidateRoot, "模擬試験_解答解説.md"), "utf8"),
]);
const v3 = parseV3(v3Problems, v3Answers);
const mock = parseMock(mockProblems, mockAnswers);
if (v3.length !== 100 || mock.length !== 50) throw new Error(`抽出件数が不正です: Ver.3=${v3.length}, 模擬試験=${mock.length}`);
for (const question of v3) await writeFile(path.join(questionRoot, `ossdb-v3-${String(question.number).padStart(3, "0")}.md`), candidateMarkdown(`ossdb-v3-${String(question.number).padStart(3, "0")}`, question), "utf8");
for (const question of mock) await writeFile(path.join(questionRoot, `ossdb-mock-${String(question.number).padStart(3, "0")}.md`), candidateMarkdown(`ossdb-mock-${String(question.number).padStart(3, "0")}`, question), "utf8");
console.log(`候補問題を ${v3.length + mock.length} 件生成しました。`);
