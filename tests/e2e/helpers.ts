import { expect, type Page } from "@playwright/test";

export async function openDemoExam(page: Page): Promise<void> {
  await page.goto("./");
  const card = page.locator("article.exam-card").filter({ hasText: "Web Platform デモ" });
  await card.getByRole("link", { name: "この試験を開く" }).click();
  await expect(page.getByRole("heading", { name: "web-platform-demo" })).toBeVisible();
}

export async function answerCurrentQuestion(page: Page): Promise<"single" | "multiple" | "input"> {
  const panel = page.locator(".question-layout .panel").first();
  await expect(panel.locator('textarea, input[type="checkbox"], input[type="radio"]').first()).toBeVisible();
  const textarea = panel.locator("textarea");
  if (await textarea.count() > 0) {
    await textarea.fill("テスト回答");
    return "input";
  }
  const checkboxes = panel.locator('input[type="checkbox"]');
  if (await checkboxes.count() > 0) {
    const legend = await panel.locator("legend").textContent(); const required = Number(legend?.match(/\d+/)?.[0] ?? "1");
    for (let index = 0; index < required; index += 1) await checkboxes.nth(index).check();
    return "multiple";
  }
  await panel.locator('input[type="radio"]').first().check();
  return "single";
}

export async function prepareServiceWorker(page: Page): Promise<void> {
  await page.goto("./");
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(async () => page.evaluate(() => navigator.serviceWorker.controller !== null)).toBe(true);
}
