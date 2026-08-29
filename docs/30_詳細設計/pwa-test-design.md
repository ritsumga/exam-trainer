# PWA・試験詳細設計

## 1. 目的

本書はPWA設定、更新調停、工程4・5で実装する自動試験の分類、要件証跡、性能計測条件を確定する。

## 2. PWA設定

`vite-plugin-pwa`は`registerType: "prompt"`、`strategies: "generateSW"`とする。Vite `base`は`/exam-trainer/`、manifest `scope`と`start_url`は`/exam-trainer/`とする。

```ts
VitePWA({
  registerType: "prompt",
  includeAssets: ["icons/pwa-192x192.png", "icons/pwa-512x512.png", "icons/maskable-512x512.png"],
  manifest: {
    name: "Exam Trainer",
    short_name: "Exam Trainer",
    lang: "ja",
    start_url: "/exam-trainer/",
    scope: "/exam-trainer/",
    display: "standalone",
    theme_color: "#0f172a",
    background_color: "#f8fafc",
    icons: [
      { src: "icons/pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "icons/pwa-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "icons/maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  },
  workbox: {
    cleanupOutdatedCaches: true,
    clientsClaim: false,
    skipWaiting: false,
    globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
    navigateFallback: "index.html",
  },
});
```

外部URLのruntime cacheは定義しない。生成済みcatalog/Pack JSONはglobによりrevision付き事前キャッシュへ含める。キャッシュ名はWorkbox生成名を使い、独自固定名を作らない。fixture文字列と`tests/fixtures`由来ファイルが`dist`およびprecache manifestにないことをbuild試験で確認する。

## 3. 更新と複数タブ調停

- `virtual:pwa-register/react`の更新検出を使用し、起動時、`online`イベント、ウィンドウfocus時に`registration.update()`を呼ぶ。連続確認は最終確認から60分未満なら抑止する。
- 待機worker検出時に全タブへ`BroadcastChannel("exam-trainer-pwa")`で`update-available`を通知する。
- 「更新」を押したタブが`navigator.locks.request("exam-trainer-pwa-update", { ifAvailable: true })`で調停する。Web Locks非対応時はタブ間排他を保証せず、workerの単一waiting状態と提出冪等性で安全を保つ。
- lock取得後、模試保存状態が`idle`であることとRepositoryの最新revisionを確認する。失敗時は更新を中止する。
- `updateServiceWorker(true)`を呼び、`controllerchange`を一度だけ監視して`location.reload()`する。
- 他タブは`update-started`受信後に操作を止めず、「別タブで更新中」を通知する。reload後の新タブ通知を受けた時だけ、保存中でなければ利用者操作で再読込する。

## 4. 試験ツールと配置

| 種別 | ツール | 配置 |
| --- | --- | --- |
| schema・engine単体 | Vitest | `src/**/*.test.ts` |
| React UI結合 | Testing Library + user-event + axe | `src/**/*.test.tsx` |
| DB・Repository | Vitest + fake-indexeddb | `tests/integration/db/` |
| Pack/CLI/build | Vitest、Node子process | `tests/integration/build/` |
| E2E・PWA・responsive | Playwright Chromium | `tests/e2e/` |
| 性能 | Vitest benchではなく専用Vitest test | `tests/performance/` |

テストは固定Clockと固定seedを使い、実時間待機や`Math.random()`へ依存しない。PWA E2Eだけproduction buildをローカルHTTPで配信する。

## 5. 要件別試験仕様

| 対象 | 主要ケース | 層 |
| --- | --- | --- |
| FR-001〜003 / AC-02 | singleの0・1・2回答、multipleの順序・重複・部分集合・上位集合、inputのNFC・改行・Unicode前後空白・大小/全半角/内部空白非変換 | 単体 |
| FR-004 / AC-04 | 全形式の配列保存、再open、confidence更新、bookmark、未完了session | DB・E2E |
| FR-005 / AC-05 | 各mode、候補0、不足、domain和集合、重複なし、固定seed | 単体・E2E |
| FR-006〜009 / AC-07 | 最大剰余の同率、分野不足周回再配分、weight欠落、全体不足、設定上下限、固定seed再現 | 単体 |
| FR-010〜011 / AC-07 | 操作ごとのrevision、再open、期限前後、手動/自動二重提出、未回答Attemptなし | DB・E2E |
| FR-012〜015 / AC-09 | export自己検証、同版、欠落/未知/新版、不正参照、対象外Pack参照、revision競合、容量不足rollback | 単体・DB・E2E |
| FR-016〜021 / AC-01・11 | 正常/異常Pack、ID重複、status/source/date、3形式の第2Pack、fixture非混入 | Validator・build |
| FR-022 | difficulty 0/1/5/6、整数以外 | Validator |
| FR-023 | 問題数・時間の0/1/上限/上限+1/小数 | 単体・E2E |
| FR-024 | 360/1024/1440px、Tab順、Enter/Space、focus ring、横overflowなし | E2E |
| AC-03 | 通常採点後の全情報、模試提出前に正誤・解説がDOMにない | UI・E2E |
| AC-06 | 6要素の0/中間/1、未来日時、同点3条件、Pack外除外 | 単体 |
| AC-08 | 全体・分野、未回答、誤答、flag、再演習 | 単体・E2E |
| AC-10 | 初回online、offline再起動、演習・保存・模試再開・成績 | PWA E2E |
| AC-12 | production依存監査、外部通信なし、バックエンド/ログインなし | build・E2E・手動レビュー |

## 6. 異常系と移行試験

- Zodの各必須値欠落、未知キー、型違い、境界外、日時不正をtable-driven testにする。
- IndexedDB open失敗、QuotaExceeded、transaction abort、古いrevision、保存値破損を各1件以上再現する。
- バックアップv1はround-tripと安定した出力順をsnapshotで確認する。
- 対応旧版が追加されるまではv0を拒否する試験を置く。将来は`migrateVnToVnPlus1`ごとに入力fixture、期待出力、冪等でない誤適用の拒否を追加する。
- 不明URL、exam、question、sessionと、Pack fetch 404・壊れたJSONをE2EまたはUI結合で確認する。

## 7. 性能試験

CI基準環境はGitHub Actionsの`windows-latest`、Node.js 24、並列化を無効にした単一workerとする。各対象をwarm-up 1回後に5回実行し、最大値が2,000ms以下であることを判定する。計測は`performance.now()`で対象関数だけを囲み、fixture生成、ファイル読込、assertion時間を除く。

| 対象 | 入力 | 判定 |
| --- | --- | --- |
| Pack検証 | 1 Pack・5,000問のparse済みobject | 最大2秒以下 |
| 模試生成 | 5,000問、50問、全分野weightあり | 最大2秒以下、重複0 |
| 弱点計算 | 5,000問、各10 attempts | 最大2秒以下、規定順 |

次問題表示E2Eは5,000問Packをproduct buildへ混ぜず、専用test buildの置換loaderで供給する。Chromium desktop、trace/video無効、同一workerで20回操作し、`performance.mark`でclick handler開始から次設問見出しcommitまでを測る。warm-up 3回を除く最大値が1,000ms以下とする。失敗時は同一jobで1回だけ全ケースを再実行し、再失敗で品質ゲート失敗とする。

## 8. PWA E2E

1. production buildをHTTP配信し、Service Worker readyと全precache完了通知を待つ。
2. offlineへ切替え、pageを新規context相当で再読込する。
3. 試験選択、通常演習、採点、解説、履歴保存、成績を確認する。
4. 模試を開始して回答・位置・flagを保存し、pageを閉じて再度開き、同一内容とdeadlineを確認する。
5. 模試を提出し、offlineのまま結果と成績を確認する。
6. 新buildを同じoriginへ配信し、待機通知、「後で」、保存失敗時の更新中止、保存成功後の明示更新を確認する。

## 9. 品質コマンド

工程4で次を固定する。

```text
npm run validate     # 製品Pack検証と生成物自己検証
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # 単体・UI・DB・build・性能
npm run build        # validate後にproduction buildとfixture非混入検査
npm run test:e2e     # production serverを用いるPlaywright
```

## 10. 対応要件

FR-001〜FR-024、AC-01〜AC-12、QR-01〜QR-07に対応する。
