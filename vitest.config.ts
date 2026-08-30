import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 15_000,
    coverage: { provider: "v8", reporter: ["text", "html"] }
  }
});
