import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const typed = tseslint.configs.strictTypeChecked.map((config) => ({ ...config, files: ["**/*.{ts,tsx}"] }));
const stylistic = tseslint.configs.stylisticTypeChecked.map((config) => ({ ...config, files: ["**/*.{ts,tsx}"] }));

export default tseslint.config(
  { ignores: ["dist", "coverage", "playwright-report", "test-results", "src/generated", "node_modules"] },
  { ...js.configs.recommended, files: ["**/*.js"], languageOptions: { globals: globals.node } },
  ...typed,
  ...stylistic,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname }
    },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": { "attributes": false } }],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
      "react-hooks/set-state-in-effect": "off"
    }
  },
  {
    files: ["src/app/router.tsx"],
    rules: { "react-refresh/only-export-components": "off" }
  }
);
