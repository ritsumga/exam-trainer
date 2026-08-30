/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

/* eslint-disable @typescript-eslint/consistent-type-definitions -- Viteのグローバル型を宣言マージするためinterfaceを使用する。 */
interface ImportMetaEnv {
  readonly VITE_BUILD_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */
