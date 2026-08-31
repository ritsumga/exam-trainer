import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

if (!process.argv.includes("--human-approved")) {
  throw new Error("人の明示承認後に --human-approved を指定してください。");
}

const candidateRoot = path.resolve("question-candidates/ossdb-silver/questions");
const productRoot = path.resolve("exam-packs/ossdb-silver/questions");
await mkdir(productRoot, { recursive: true });

const candidateFiles = (await readdir(candidateRoot)).filter((name) => name.endsWith(".md")).sort();
if (candidateFiles.length !== 150) throw new Error(`候補問題数が150件ではありません: ${candidateFiles.length}`);

for (const fileName of candidateFiles) {
  const source = path.join(candidateRoot, fileName);
  const destination = path.join(productRoot, fileName);
  const content = await readFile(source, "utf8");
  const promoted = content.replace(/^status: reviewed$/m, "status: approved");
  if (promoted === content || !/^status: approved$/m.test(promoted)) {
    throw new Error(`承認状態を昇格できませんでした: ${fileName}`);
  }
  await writeFile(destination, promoted, "utf8");
}

process.stdout.write(`${candidateFiles.length}件を製品Packへ昇格しました。\n`);
