import { expect, test } from "@playwright/test";
import { createExamPackFixture } from "../fixtures/exam-packs/factory";

test("5,000問読込後の次問題表示を20回とも1秒以内に完了する", async ({ page }) => {
  const source = createExamPackFixture(5_000);
  const questions = source.questions.map((question) => ({ ...question, examId: "ossdb-silver" }));
  const pack = { ...source, exam: { ...source.exam, id: "ossdb-silver" }, questions };
  await page.route(/ossdb-silver.*\.json/, async (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(pack) }));
  const questionIds = questions.slice(0, 24).map((question) => question.id);
  await page.addInitScript(({ ids }) => { sessionStorage.setItem("practice:performance", JSON.stringify({ examId: "ossdb-silver", questionIds: ids, startedAt: Date.now() })); }, { ids: questionIds });
  await page.goto("./#/exams/ossdb-silver/practice/performance");
  await expect(page.getByText("問題 1 / 24")).toBeVisible();
  const durations: number[] = [];
  for (let position = 0; position < 23; position += 1) {
    await page.locator('.question-layout input[type="radio"]').first().check();
    await page.getByRole("button", { name: "回答を確定" }).click();
    await page.getByRole("button", { name: "次の問題" }).click();
    await expect(page.getByText(`問題 ${position + 2} / 24`)).toBeVisible();
    await expect.poll(async () => page.evaluate(() => performance.getEntriesByName("practice-next-render", "measure").length)).toBeGreaterThan(0);
    const duration = await page.evaluate(() => performance.getEntriesByName("practice-next-render", "measure").at(-1)?.duration ?? Number.POSITIVE_INFINITY);
    if (position >= 3) durations.push(duration);
  }
  expect(durations).toHaveLength(20);
  console.info(`次問題表示の最大値: ${Math.max(...durations).toFixed(2)}ms`);
  expect(Math.max(...durations)).toBeLessThanOrEqual(1_000);
});
