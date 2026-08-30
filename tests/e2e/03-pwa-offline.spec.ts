import { expect, test } from "@playwright/test";
import { answerCurrentQuestion, openDemoExam, prepareServiceWorker } from "./helpers";

test("online初回読込後、offline再openでも演習・保存・模試再開・成績が動作する", async ({ page, context }) => {
  test.setTimeout(60_000);
  await prepareServiceWorker(page);
  await openDemoExam(page);
  await page.getByRole("link", { name: "通常演習" }).click();
  await page.getByRole("button", { name: "演習を始める" }).click();
  await answerCurrentQuestion(page);
  await page.getByRole("button", { name: "回答を確定" }).click();
  await expect(page.getByRole("heading", { name: "解説" })).toBeVisible();
  await page.getByRole("link", { name: "演習を終了" }).click();

  await context.setOffline(true);
  await page.close(); const offlinePage = await context.newPage(); await offlinePage.goto("./");
  await expect(offlinePage.getByRole("heading", { name: "学習する試験を選ぶ" })).toBeVisible();
  const card = offlinePage.locator("article.exam-card").filter({ hasText: "Web Platform デモ" });
  await card.getByRole("link", { name: "この試験を開く" }).click();
  await offlinePage.getByRole("link", { name: "成績" }).click();
  await expect(offlinePage.getByText("回答回数").locator("..").getByText("1")).toBeVisible();
  await offlinePage.getByRole("link", { name: "← 試験ホーム" }).click();
  await offlinePage.getByRole("link", { name: "模擬試験" }).click();
  await offlinePage.getByLabel("問題数").fill("1");
  await offlinePage.getByRole("button", { name: "模擬試験を始める" }).click();
  await answerCurrentQuestion(offlinePage);
  await offlinePage.getByRole("button", { name: "回答を保存" }).click();
  await expect(offlinePage.getByText("回答済み 1")).toBeVisible();
  const mockUrl = offlinePage.url(); await offlinePage.close(); const resumed = await context.newPage(); await resumed.goto(mockUrl);
  await expect(resumed.getByText("回答済み 1")).toBeVisible();
  await resumed.getByRole("button", { name: "模擬試験を提出" }).click();
  await expect(resumed.getByRole("heading", { name: "模擬試験の結果" })).toBeVisible();
});
