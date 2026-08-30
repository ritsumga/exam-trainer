import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { answerCurrentQuestion, openDemoExam } from "./helpers";

test("第2Packの3形式を通常演習し、採点詳細と永続化を確認する", async ({ page }) => {
  await openDemoExam(page);
  await page.getByRole("link", { name: "通常演習" }).click();
  await page.getByLabel("演習モード").selectOption("random");
  await page.getByLabel("問題数").fill("3");
  await page.getByRole("button", { name: "演習を始める" }).click();

  const observed = new Set<string>();
  for (let position = 0; position < 3; position += 1) {
    observed.add(await answerCurrentQuestion(page));
    if (position === 0) await page.getByRole("button", { name: "☆ お気に入り" }).click();
    await page.getByRole("button", { name: "回答を確定" }).click();
    await expect(page.getByRole("heading", { name: "回答内容" })).toBeVisible();
    await expect(page.getByText("正解", { exact: true })).toBeVisible();
    await expect(page.getByText("自分の回答", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "解説" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "参照資料" })).toBeVisible();
    await page.getByLabel("理解度").selectOption("3");
    if (position < 2) await page.getByRole("button", { name: "次の問題" }).click();
  }
  expect([...observed].sort()).toEqual(["input", "multiple", "single"]);

  await page.reload();
  await expect(page.getByRole("button", { name: "★ お気に入り" })).toBeVisible();
  await page.goto("./#/exams/web-platform-demo");
  await page.getByRole("link", { name: "成績" }).click();
  await expect(page.getByText("回答回数").locator("..").getByText("3")).toBeVisible();
});

test("模擬試験を保存してページ再open後に再開し、結果を表示する", async ({ page, context }) => {
  await openDemoExam(page);
  await page.getByRole("link", { name: "模擬試験" }).click();
  await page.getByLabel("問題数").fill("2");
  await page.getByRole("button", { name: "模擬試験を始める" }).click();
  await expect(page.getByRole("heading", { name: "解説" })).toHaveCount(0);
  const type = await answerCurrentQuestion(page);
  await page.getByRole("button", { name: "回答を保存" }).click();
  await expect(page.getByText("回答済み 1")).toBeVisible();
  await page.getByRole("button", { name: "⚐ 見直しに追加" }).click();
  await expect(page.getByRole("button", { name: "⚑ 見直しを解除" })).toBeVisible();
  const url = page.url(); await page.close(); const reopened = await context.newPage(); await reopened.goto(url);
  await expect(reopened.getByRole("button", { name: "⚑ 見直しを解除" })).toBeVisible();
  if (type === "input") await expect(reopened.locator(".question-layout textarea")).toHaveValue("テスト回答");
  else await expect(reopened.locator(".question-layout input:checked")).not.toHaveCount(0);
  await reopened.getByRole("button", { name: "模擬試験を提出" }).click();
  await expect(reopened.getByRole("heading", { name: "模擬試験の結果" })).toBeVisible();
  await expect(reopened.getByText(/回答時間/)).toBeVisible();
  await expect(reopened.getByRole("heading", { name: "未回答" })).toBeVisible();
  await expect(reopened.getByRole("heading", { name: "見直し対象" })).toBeVisible();
});

test("期限到達時に模擬試験を自動提出する", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-08-29T00:00:00.000Z") });
  await openDemoExam(page);
  await page.getByRole("link", { name: "模擬試験" }).click();
  await page.getByLabel("問題数").fill("1");
  await page.getByLabel("制限時間（分）").fill("1");
  await page.getByRole("button", { name: "模擬試験を始める" }).click();
  await page.clock.fastForward(60_001);
  await expect(page.getByRole("heading", { name: "模擬試験の結果" })).toBeVisible();
  await expect(page.getByText("提出理由: 時間切れ", { exact: true })).toBeVisible();
});

test("バックアップを出力し、同版を確認後に全置換して未知版を拒否する", async ({ page }) => {
  await page.goto("./#/settings/data");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "JSONをダウンロード" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^exam-trainer-backup-\d{8}-\d{6}\.json$/);
  await expect(page.getByText("バックアップを作成しました。", { exact: true })).toBeVisible();
  const snapshot = { product: "exam-trainer", schemaVersion: 1, createdAt: "2026-08-29T00:00:00.000Z", data: { attempts: [], bookmarks: [], reviewStates: [], examSessions: [], settings: [{ key: "app", value: { theme: "dark" }, updatedAt: "2026-08-29T00:00:00.000Z" }] } };
  const input = page.getByLabel("バックアップファイル");
  await input.setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(snapshot)) });
  await expect(page.getByRole("heading", { name: "置換内容の確認" })).toBeVisible();
  await page.getByLabel("現在の学習データが全置換されることを確認しました").check();
  await page.getByRole("button", { name: "現在の学習データを置き換える" }).click();
  await expect(page.getByText("学習データをすべて置き換えました。", { exact: true })).toBeVisible();
  await input.setInputFiles({ name: "future.json", mimeType: "application/json", buffer: Buffer.from('{"product":"exam-trainer","schemaVersion":2}') });
  await expect(page.getByText("バックアップを検証できませんでした。版と内容を確認してください。", { exact: true })).toBeVisible();
});

test("主要画面に重大なaxe違反がない", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "学習する試験を選ぶ" })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await openDemoExam(page);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
