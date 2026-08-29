import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { parseDocument } from "yaml";
import { z } from "zod";
import { idSchema, dateOnlySchema, difficultySchema } from "../src/schemas/common.js";

const candidateSchema = z.object({
  id: idSchema, exam: idSchema, domain: idSchema, type: z.enum(["single", "multiple", "input"]),
  difficulty: difficultySchema, answers: z.array(z.string().min(1)).min(1),
  choices: z.record(idSchema, z.string().min(1)).optional(), tags: z.array(idSchema),
  sources: z.array(z.object({ url: z.url().startsWith("https://") }).strict()).min(1),
  verifiedAt: dateOnlySchema, status: z.literal("reviewed"),
}).strict();

const root = path.resolve("question-candidates");
const errors: string[] = []; let count = 0;
const candidatePacks = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
for (const packName of candidatePacks) {
  const packRoot = path.join(root, packName);
  const exam = parseDocument(await readFile(path.join(packRoot, "exam.yaml"), "utf8"), { uniqueKeys: true }).toJS({ maxAliasCount: 0 }) as { id?: string };
  const domainsFile = parseDocument(await readFile(path.join(packRoot, "domains.yaml"), "utf8"), { uniqueKeys: true }).toJS({ maxAliasCount: 0 }) as { domains?: Array<{ id?: string }> };
  const domainIds = new Set(domainsFile.domains?.map((domain) => domain.id) ?? []);
  for (const fileName of (await readdir(path.join(packRoot, "questions"))).filter((name) => name.endsWith(".md")).sort()) {
    const file = path.join(packRoot, "questions", fileName);
    try {
      const parsed = matter(await readFile(file, "utf8"));
      const document = parseDocument(parsed.matter.replace(/^\s*---\s*\r?\n?/, ""), { uniqueKeys: true });
      if (document.errors.length > 0) throw new Error(document.errors.map((error) => error.message).join("; "));
      const metadata = candidateSchema.parse(document.toJS({ maxAliasCount: 0 }));
      if (metadata.exam !== exam.id || !domainIds.has(metadata.domain)) throw new Error("examまたはdomain参照が不正です");
      const levelOne = [...parsed.content.matchAll(/^#\s+(.+)\s*$/gm)].map((match) => match[1]);
      if (levelOne.length !== 2 || levelOne[0] !== "Question" || levelOne[1] !== "Explanation") throw new Error("QuestionとExplanationの見出しが不正です");
      if (metadata.type === "input" && metadata.choices !== undefined) throw new Error("inputへchoicesは指定できません");
      if (metadata.type !== "input") {
        const choiceIds = Object.keys(metadata.choices ?? {}); const explanations = [...parsed.content.matchAll(/^##\s+([^\s]+)\s*$/gm)].map((match) => match[1]);
        if (choiceIds.length < 2 || explanations.length !== choiceIds.length || choiceIds.some((id) => !explanations.includes(id))) throw new Error("choicesと選択肢解説が一致しません");
        if (metadata.answers.some((answer) => !choiceIds.includes(answer))) throw new Error("正解がchoicesにありません");
        if (metadata.type === "single" && metadata.answers.length !== 1) throw new Error("singleの正解は1件です");
        if (metadata.type === "multiple" && (metadata.answers.length >= choiceIds.length || new Set(metadata.answers).size !== metadata.answers.length)) throw new Error("multipleの正解集合が不正です");
      }
      count += 1;
    } catch (error) { errors.push(`${path.relative(process.cwd(), file)}: ${error instanceof Error ? error.message : String(error)}`); }
  }
}
if (errors.length > 0) { errors.forEach((error) => process.stderr.write(`${error}\n`)); process.exitCode = 1; }
else process.stdout.write(`${count}件の承認候補を検証しました。statusはreviewedのままです。\n`);
