import { expect, test } from "@playwright/test";

test("不明URL、試験、模擬試験sessionを安全な導線で処理する", async ({ page }) => {
  await page.goto("./#/unknown");
  await expect(page.getByRole("heading", { name: "ページを表示できません" })).toBeVisible();
  await page.goto("./#/exams/unknown-exam");
  await expect(page.getByText("試験が見つかりません", { exact: true })).toBeVisible();
  await page.goto("./#/exams/web-platform-demo/mock/unknown-session");
  await expect(page.getByText("模擬試験が見つかりません", { exact: true })).toBeVisible();
  await page.evaluate(() => { sessionStorage.setItem("practice:unknown-question", JSON.stringify({ examId: "web-platform-demo", questionIds: ["unknown-question"], startedAt: Date.now() })); });
  await page.goto("./#/exams/web-platform-demo/practice/unknown-question");
  await expect(page.getByText("問題を読み込めません", { exact: true })).toBeVisible();
});

test("Packの404と壊れたJSONを利用者へ通知する", async ({ page }) => {
  await page.route(/web-platform-demo.*\.json/, async (route) => route.fulfill({ status: 404, body: "not found" }));
  await page.goto("./#/exams/web-platform-demo/practice/setup");
  await expect(page.getByText("試験データを読み込めません。", { exact: true })).toBeVisible();
  await page.unrouteAll();
  await page.reload();
  await page.route(/web-platform-demo.*\.json/, async (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{" }));
  await page.goto("./#/exams/web-platform-demo/practice/setup");
  await expect(page.getByText("試験データを読み込めません。", { exact: true })).toBeVisible();
});

for (const width of [360, 1_024, 1_440]) {
  test(`${width}pxで横overflowがなく、キーボードで主要操作を実行できる`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    await expect(page.getByRole("heading", { name: "学習する試験を選ぶ" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => { const element = document.activeElement; if (!(element instanceof HTMLElement)) return { tag: "", outline: "" }; return { tag: element.tagName, outline: getComputedStyle(element).outlineStyle }; });
    expect(focus.tag).toBe("A"); expect(focus.outline).not.toBe("none");
    const target = page.locator("article.exam-card").filter({ hasText: "Web Platform デモ" }).getByRole("link", { name: "この試験を開く" });
    for (let index = 0; index < 10 && !await target.evaluate((element) => element === document.activeElement); index += 1) await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "web-platform-demo" })).toBeVisible();
  });
}
