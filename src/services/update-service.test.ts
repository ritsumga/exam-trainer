import { afterEach, describe, expect, it, vi } from "vitest";
import { learningRepository } from "../db/repository";
import { UpdateService } from "./update-service";

describe("UpdateService", () => {
  afterEach(() => { vi.restoreAllMocks(); });

  it("60分以内の連続更新確認を抑止する", async () => {
    const service = new UpdateService(); const update = vi.fn().mockResolvedValue(undefined); const registration = { update } as unknown as ServiceWorkerRegistration;
    await service.check(registration, true); await service.check(registration);
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("保存状態の確認失敗時に更新を開始しない", async () => {
    const service = new UpdateService(); const update = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(learningRepository, "getRevision").mockRejectedValueOnce(new Error("保存失敗"));
    await expect(service.activate(update)).rejects.toThrow("保存失敗");
    expect(update).not.toHaveBeenCalled();
  });

  it("Web Locksを取得できないタブでは更新しない", async () => {
    const request = vi.fn(async (_name: string, _options: LockOptions, callback: (lock: Lock | null) => Promise<void>) => callback(null));
    vi.stubGlobal("navigator", { locks: { request } });
    const service = new UpdateService(); const update = vi.fn().mockResolvedValue(undefined);
    expect(await service.activate(update)).toBe(false);
    expect(update).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
