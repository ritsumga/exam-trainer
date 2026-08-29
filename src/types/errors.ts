export type AppErrorCode =
  | "not-found" | "validation" | "pack-load" | "data-integrity"
  | "storage-unavailable" | "quota-exceeded" | "conflict"
  | "transaction" | "backup-version" | "backup-invalid"
  | "pwa-registration" | "unexpected";

export class AppError extends Error {
  constructor(public readonly code: AppErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "AppError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "別の画面でデータが更新されました") { super("conflict", message); }
}
