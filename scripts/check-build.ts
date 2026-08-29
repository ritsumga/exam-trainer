import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}

const files = await walk(path.resolve("dist"));
for (const file of files) {
  const content = await readFile(file);
  const text = content.toString("utf8");
  if (text.includes("tests/fixtures") || text.includes("fixture-5000") || text.includes("fixture-50")) {
    throw new Error(`試験fixtureが製品成果物へ混入しました: ${file}`);
  }
}
process.stdout.write(`${files.length}個のbuild成果物を検査しました。\n`);
