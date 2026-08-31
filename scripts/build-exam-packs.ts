import { lstat, mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { parseDocument } from "yaml";
import {
  examCatalogSchema,
  examDefinitionSchema,
  generatedExamPackSchema,
  type Domain,
  type ExamCatalogEntry,
  type Question,
} from "../src/schemas/exam-pack.js";
import { z } from "zod";

type ValidationIssue = { code: string; file: string; message: string };
const issues: ValidationIssue[] = [];
const root = process.cwd();
const inputRoot = path.join(root, "exam-packs");
const outputRoot = path.join(root, "src", "generated", "exam-packs");
const temporaryRoot = `${outputRoot}.tmp`;

const rawDomainsSchema = z.object({ domains: z.array(z.object({ id: z.string(), name: z.string(), weight: z.number().optional() }).strict()).min(1) }).strict();
const frontMatterSchema = z.object({
  id: z.string(), exam: z.string(), domain: z.string(), type: z.enum(["single", "multiple", "input"]),
  difficulty: z.number(), answers: z.array(z.string()), choices: z.record(z.string(), z.string()).optional(),
  tags: z.array(z.string()).default([]), sources: z.array(z.object({ url: z.string() }).strict()), verifiedAt: z.string(), status: z.literal("approved"),
}).strict();

function addIssue(code: string, file: string, message: string): void { issues.push({ code, file: path.relative(root, file), message }); }

function escapeWorkflowCommand(value: string): string {
  return value.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
}

function reportIssue(issue: ValidationIssue): void {
  const message = `${issue.code} ${issue.file}: ${issue.message}`;
  if (process.env.GITHUB_ACTIONS === "true") {
    process.stderr.write(`::error title=${escapeWorkflowCommand(issue.code)}::${escapeWorkflowCommand(message)}\n`);
    return;
  }
  process.stderr.write(`${message}\n`);
}

async function parseYaml(file: string): Promise<unknown> {
  const text = await readFile(file, "utf8");
  const document = parseDocument(text, { uniqueKeys: true });
  if (document.errors.length > 0) throw new Error(document.errors.map((error) => error.message).join("; "));
  if (document.contents === null) throw new Error("YAMLが空です");
  return document.toJS({ maxAliasCount: 0 });
}

function extractSections(markdown: string, choiceIds: readonly string[]): { question: string; explanation: string; choiceExplanations: Record<string, string> } {
  unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const headings = [...markdown.matchAll(/^#{1,2}\s+(.+)\s*$/gm)];
  const levelOne = headings.filter((entry) => entry[0]?.startsWith("# ")).map((entry) => entry[1]);
  if (levelOne.length !== 2 || levelOne[0] !== "Question" || levelOne[1] !== "Explanation") throw new Error("# Questionと# Explanationをこの順で各1件指定してください");
  const questionMatch = markdown.match(/^# Question\s*\n([\s\S]*?)^# Explanation\s*\n/m);
  const explanationMatch = markdown.match(/^# Explanation\s*\n([\s\S]*)$/m);
  const question = questionMatch?.[1]?.trim() ?? "";
  const explanationBody = explanationMatch?.[1]?.trim() ?? "";
  if (!question || !explanationBody) throw new Error("問題文と解説本文は空にできません");
  const choiceExplanations: Record<string, string> = {};
  let generalExplanation = explanationBody;
  if (choiceIds.length > 0) {
    const firstChoice = explanationBody.search(/^##\s+/m);
    generalExplanation = (firstChoice >= 0 ? explanationBody.slice(0, firstChoice) : "").trim();
    if (!generalExplanation) throw new Error("Explanation直下に全体解説が必要です");
    for (const id of choiceIds) {
      const pattern = new RegExp(`^## ${id}\\s*\\n([\\s\\S]*?)(?=^## |$)`, "m");
      const value = explanationBody.match(pattern)?.[1]?.trim();
      if (!value) throw new Error(`選択肢${id}の解説がありません`);
      choiceExplanations[id] = value;
    }
    const found = [...explanationBody.matchAll(/^##\s+([^\s]+)\s*$/gm)].map((entry) => entry[1]);
    if (found.length !== choiceIds.length || found.some((id) => !choiceIds.includes(id ?? ""))) throw new Error("選択肢解説の見出しがchoicesと一致しません");
  }
  return { question, explanation: generalExplanation, choiceExplanations };
}

async function parseQuestion(file: string): Promise<Question | undefined> {
  try {
    const source = (await readFile(file, "utf8")).replace(/\r\n?/g, "\n");
    const parsed = matter(source);
    const rawDocument = parseDocument(parsed.matter.replace(/^\s*---\s*\r?\n?/, ""), { uniqueKeys: true });
    if (rawDocument.errors.length > 0) throw new Error(rawDocument.errors.map((error) => error.message).join("; "));
    const rawMetadata: unknown = rawDocument.toJS({ maxAliasCount: 0 });
    const metadataResult = frontMatterSchema.safeParse(rawMetadata);
    if (!metadataResult.success) {
      const receivedStatus = typeof rawMetadata === "object" && rawMetadata !== null && "status" in rawMetadata
        ? (rawMetadata as { status?: unknown }).status
        : undefined;
      throw new Error(`${metadataResult.error.message}; 受信status=${JSON.stringify(receivedStatus)} (${typeof receivedStatus})`);
    }
    const metadata = metadataResult.data;
    const choices = metadata.choices === undefined ? [] : Object.entries(metadata.choices).map(([id, text]) => ({ id, text }));
    const sections = extractSections(parsed.content, choices.map((choice) => choice.id));
    const common = {
      id: metadata.id, examId: metadata.exam, domainId: metadata.domain, type: metadata.type,
      difficulty: metadata.difficulty, answers: metadata.answers, question: sections.question,
      explanation: sections.explanation, tags: metadata.tags, sources: metadata.sources,
      verifiedAt: metadata.verifiedAt, status: metadata.status,
    };
    const value = metadata.type === "input" ? common : { ...common, choices, choiceExplanations: sections.choiceExplanations };
    return generatedExamPackSchema.shape.questions.element.parse(value);
  } catch (error) { addIssue("PACK_QUESTION", file, error instanceof Error ? error.message : String(error)); return undefined; }
}

async function main(): Promise<void> {
  await rm(temporaryRoot, { recursive: true, force: true });
  await mkdir(temporaryRoot, { recursive: true });
  let entries: string[] = [];
  try { entries = await readdir(inputRoot); } catch { await mkdir(inputRoot, { recursive: true }); }
  const packs: Array<Awaited<ReturnType<typeof generatedExamPackSchema.parse>>> = [];
  const seenQuestionIds = new Set<string>();
  for (const directoryName of entries.sort()) {
    if (directoryName.startsWith(".")) continue;
    const directory = path.join(inputRoot, directoryName);
    const info = await lstat(directory);
    if (info.isSymbolicLink()) { addIssue("PACK_PATH", directory, "シンボリックリンクは使用できません"); continue; }
    if (!info.isDirectory()) continue;
    try {
      const exam = examDefinitionSchema.parse(await parseYaml(path.join(directory, "exam.yaml")));
      const rawDomains = rawDomainsSchema.parse(await parseYaml(path.join(directory, "domains.yaml")));
      const domains = rawDomains.domains as Domain[];
      if (exam.id !== directoryName) throw new Error("exam.idとディレクトリ名が一致しません");
      if (new Set(exam.questionTypes).size !== exam.questionTypes.length) throw new Error("questionTypesが重複しています");
      if (new Set(domains.map((domain) => domain.id)).size !== domains.length) throw new Error("domain IDが重複しています");
      if (domains.some((domain) => domain.weight !== undefined) && domains.some((domain) => domain.weight === undefined)) throw new Error("weightは全分野で指定するか全分野で省略してください");
      const questionsDirectory = path.join(directory, "questions");
      const questionFiles = (await readdir(questionsDirectory)).filter((file) => file.endsWith(".md")).sort();
      const parsed = await Promise.all(questionFiles.map((file) => parseQuestion(path.join(questionsDirectory, file))));
      const questions = parsed.filter((question): question is Question => question !== undefined);
      const domainIds = new Set(domains.map((domain) => domain.id));
      for (const question of questions) {
        if (question.examId !== exam.id) addIssue("PACK_REFERENCE", directory, `${question.id}: exam参照が一致しません`);
        if (!domainIds.has(question.domainId)) addIssue("PACK_REFERENCE", directory, `${question.id}: 未知のdomainです`);
        if (!exam.questionTypes.includes(question.type)) addIssue("PACK_REFERENCE", directory, `${question.id}: 未対応の問題形式です`);
        if (seenQuestionIds.has(question.id)) addIssue("PACK_DUPLICATE", directory, `${question.id}: question IDがPack横断で重複しています`);
        seenQuestionIds.add(question.id);
        if (question.type !== "input") {
          const choiceIds = question.choices.map((choice) => choice.id);
          if (new Set(choiceIds).size !== choiceIds.length || question.answers.some((answer) => !choiceIds.includes(answer))) addIssue("PACK_ANSWER", directory, `${question.id}: answersとchoicesが整合しません`);
          if (question.type === "multiple" && (new Set(question.answers).size !== question.answers.length || question.answers.length >= choiceIds.length)) addIssue("PACK_ANSWER", directory, `${question.id}: multipleの正解集合が不正です`);
        } else {
          const normalized = question.answers.map((value) => value.normalize("NFC").replace(/\r\n?/g, "\n").trim());
          if (new Set(normalized).size !== normalized.length) addIssue("PACK_ANSWER", directory, `${question.id}: inputの正規化後answersが重複しています`);
        }
      }
      packs.push(generatedExamPackSchema.parse({ schemaVersion: 1, exam, domains, questions: questions.sort((a, b) => a.id.localeCompare(b.id)) }));
    } catch (error) { addIssue("PACK_STRUCTURE", directory, error instanceof Error ? error.message : String(error)); }
  }
  if (issues.length > 0) {
    issues.sort((a, b) => a.file.localeCompare(b.file) || a.code.localeCompare(b.code));
    for (const issue of issues) reportIssue(issue);
    await rm(temporaryRoot, { recursive: true, force: true });
    process.exitCode = 1; return;
  }
  const generatedAt = new Date().toISOString();
  const catalogEntries: ExamCatalogEntry[] = [];
  for (const pack of packs.sort((a, b) => a.exam.id.localeCompare(b.exam.id))) {
    const fileName = `${pack.exam.id}.json`;
    await writeFile(path.join(temporaryRoot, fileName), `${JSON.stringify(pack, null, 2)}\n`, "utf8");
    catalogEntries.push({ examId: pack.exam.id, name: pack.exam.name, vendor: pack.exam.vendor, durationMinutes: pack.exam.exam.durationMinutes, questionCount: pack.exam.exam.questionCount, availableQuestionCount: pack.questions.length, questionTypes: pack.exam.questionTypes, dataPath: fileName });
  }
  const catalog = examCatalogSchema.parse({ schemaVersion: 1, generatedAt, exams: catalogEntries });
  await writeFile(path.join(temporaryRoot, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  await rm(outputRoot, { recursive: true, force: true });
  await rename(temporaryRoot, outputRoot);
  process.stdout.write(`${packs.length} Pack、${packs.reduce((sum, pack) => sum + pack.questions.length, 0)} 問を検証しました。\n`);
}

void main().catch((error: unknown) => { process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`); process.exitCode = 2; });
