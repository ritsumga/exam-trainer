import { learningRepository } from "../db/repository";

type UpdateMessage = { type: "update-available" | "update-started"; tabId: string };

export class UpdateService {
  private readonly tabId = crypto.randomUUID();
  private readonly channel = typeof BroadcastChannel === "undefined" ? undefined : new BroadcastChannel("exam-trainer-pwa");
  private lastCheckedAt = 0;

  subscribe(listener: (message: UpdateMessage) => void): () => void {
    if (this.channel === undefined) return () => undefined;
    const handle = (event: MessageEvent<UpdateMessage>) => { if (event.data.tabId !== this.tabId) listener(event.data); };
    this.channel.addEventListener("message", handle);
    return () => this.channel?.removeEventListener("message", handle);
  }

  announce(type: UpdateMessage["type"]): void { this.channel?.postMessage({ type, tabId: this.tabId } satisfies UpdateMessage); }

  async check(registration: ServiceWorkerRegistration | undefined, force = false): Promise<void> {
    if (registration === undefined || (!force && Date.now() - this.lastCheckedAt < 60 * 60 * 1000)) return;
    this.lastCheckedAt = Date.now(); await registration.update();
  }

  async activate(update: () => Promise<void>): Promise<boolean> {
    const run = async () => { await learningRepository.getRevision(); this.announce("update-started"); await update(); };
    if (navigator.locks === undefined) { await run(); return true; }
    let activated = false;
    await navigator.locks.request("exam-trainer-pwa-update", { ifAvailable: true }, async (lock) => { if (lock === null) return; activated = true; await run(); });
    return activated;
  }
}

export const updateService = new UpdateService();
