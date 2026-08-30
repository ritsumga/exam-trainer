import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { expect, test } from "@playwright/test";
import { prepareServiceWorker } from "./helpers";

const execFileAsync = promisify(execFile);

test("新buildを待機状態で通知し、後で選択後に明示更新する", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await prepareServiceWorker(page);
  const originalBuildId = await page.locator("footer").getAttribute("data-build-id"); if (originalBuildId === null) throw new Error("build IDを取得できません");
  const updateBuildId = `update-test-${Date.now()}-${testInfo.retry}`;
  const viteCli = path.resolve("node_modules/vite/bin/vite.js");
  await execFileAsync(process.execPath, [viteCli, "build"], { cwd: process.cwd(), env: { ...process.env, VITE_BUILD_ID: updateBuildId }, maxBuffer: 10 * 1024 * 1024 });
  await page.evaluate(async () => { const registration = await navigator.serviceWorker.getRegistration(); await registration?.update(); });
  await expect(page.getByText("新しい版を利用できます。", { exact: true })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: "後で" }).click();
  await expect(page.getByText("新しい版を利用できます。", { exact: true })).toHaveCount(0);
  await expect(page.locator("footer")).toHaveAttribute("data-build-id", originalBuildId);
  await page.reload();
  await expect(page.getByText("新しい版を利用できます。", { exact: true })).toBeVisible({ timeout: 30_000 });
  await page.getByRole("button", { name: "更新する" }).click();
  await expect(page.locator("footer")).toHaveAttribute("data-build-id", updateBuildId, { timeout: 30_000 });
});
