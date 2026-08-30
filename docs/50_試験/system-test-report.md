# 工程5 結合・総合試験結果

## 1. 結論

工程5で定義した単体、結合、E2E、PWA、レスポンシブ、アクセシビリティ、異常系、性能試験を実施した。自動試験はVitest 61件、Playwright 13件で構成し、最終品質ゲートですべて成功した。未解消の重大障害は0件である。

工程5の成果物は人のレビュー待ちとし、明示承認までは工程6を開始しない。

## 2. 試験環境

| 項目 | 値 |
| --- | --- |
| OS | Windows |
| Node.js | 24.20.0 |
| npm | 11.19.0 |
| ブラウザ | Playwright Chromium 151.0.7922.34 |
| 実行日 | 2026-08-29〜2026-08-30 |
| ブランチ | `phase/05-system-test` |
| E2E配信 | `vite preview`によるproduction buildのローカルHTTP配信 |

## 3. 自動試験結果

| 品質ゲート | 結果 | 主な証跡 |
| --- | --- | --- |
| `npm ci` | 成功 | 固定依存643 package、既知脆弱性0件 |
| `npm run validate` | 成功 | 製品2 Pack、13問 |
| `npm run validate:candidates` | 成功 | 承認候補0件、製品Packへの混入なし |
| `npm run lint` | 成功 | warning 0件 |
| `npm run typecheck` | 成功 | app、Node、工程5試験コードをstrict検査 |
| `npm test` | 成功 | 10 files、61 tests |
| `npm run build` | 成功 | PWA precache 23件、build成果物21個、fixture混入なし |
| `npm run test:e2e` | 成功 | Chromium単一worker、13 tests、再試行0件 |
| `git diff --check` | 成功 | 空白エラーなし |

## 4. 要件別の主要証跡

| 対象 | 証跡 | 結果 |
| --- | --- | --- |
| 採点・3形式・解説 | `src/core/scoring.test.ts`、`tests/e2e/01-learning-flow.spec.ts` | single、multiple、inputの境界値、正解、自分の回答、解説、選択肢解説、出典を確認 |
| 演習モード・弱点 | `src/core/practice.test.ts`、`src/core/review.test.ts` | 未回答、誤答、お気に入り、分野別、ランダム、弱点、6要素、同点規則を確認 |
| 模擬試験 | `src/core/mock-exam.test.ts`、`tests/integration/db/repository.integration.test.ts`、`tests/e2e/01-learning-flow.spec.ts` | 境界、配分、不足、再開、手動・自動提出、未回答、見直し、提出冪等性を確認 |
| DB・バックアップ | `tests/integration/db/repository.integration.test.ts`、`tests/e2e/01-learning-flow.spec.ts` | 再open、revision競合、破損値、未知版、全置換、容量不足相当のtransaction rollbackを確認 |
| Pack・fixture | `tests/integration/build/schema-validation.test.ts`、`tests/fixtures/exam-packs/factory.ts`、`scripts/check-build.ts` | 必須値、未知キー、型、境界、参照、重複、50問・5,000問、製品非混入を確認 |
| PWA | `tests/e2e/03-pwa-offline.spec.ts`、`tests/e2e/99-pwa-update.spec.ts`、`src/services/update-service.test.ts` | offline再open、保存、模試再開、成績、待機worker、「後で」、明示更新、保存確認失敗、Web Locks競合を確認 |
| UX・異常経路 | `tests/e2e/02-errors-responsive.spec.ts`、axe | 360px、1,024px、1,440px、横overflowなし、キーボード、focus、重大axe違反0、不明URL・参照、Pack 404・壊れたJSONを確認 |
| 第2試験・外部依存 | `tests/e2e/01-learning-flow.spec.ts`、依存監査 | 第2Packの3形式を共通画面で実施し、バックエンド、ログイン、有料API、クラウドDBが不要であることを確認 |

## 5. 性能結果

各純粋関数はfixture生成とassertionを計測外とし、warm-up 1回後に5回測定した最大値で判定した。次問題表示はwarm-up 3回後の20回を測定した。

| 対象 | 入力 | 最大値 | 閾値 | 判定 |
| --- | --- | ---: | ---: | --- |
| Pack検証 | 5,000問のparse済みobject | 138.16ms | 2,000ms | 成功 |
| 模擬試験生成 | 5,000問から50問 | 1.98ms | 2,000ms | 成功 |
| 弱点計算 | 5,000問、各10 attempts | 39.08ms | 2,000ms | 成功 |
| 次問題表示 | 5,000問test loader、20回 | 4.90ms | 1,000ms | 成功 |

## 6. 工程5で検出・修正した障害

| ID | 内容 | 対応 | 最終状態 |
| --- | --- | --- | --- |
| ST-001 | 模試初期表示で残り時間計算前の0を期限到達と解釈し得る | 残り時間の未初期化状態を分離し、計算完了後だけ自動提出する | 解消 |
| ST-002 | 空配列の保存回答を回答済み件数へ含める | 未回答キーを保存対象から除外し、表示側も非空回答だけを数える | 解消 |
| ST-003 | 通常採点後に正解と自分の回答が明示されない | 3形式共通の回答内容表示を追加する | 解消 |
| ST-004 | お気に入り表示がページ再open時に保存値を復元しない | 問題表示時にRepositoryから状態を再取得する | 解消 |
| ST-005 | 不明試験・session、Pack読込失敗で読み込み表示が継続する | エラー状態と安全な戻り導線を追加する | 解消 |
| ST-006 | PWA更新を保留する明示操作がない | 「後で」を追加し、再open後に更新を再提示する | 解消 |
| ST-007 | E2E失敗時のPlaywright生成物が後続のlint対象へ入る | ESLintから`playwright-report/`と`test-results/`を除外する | 解消 |
| ST-008 | offline再open試験が非同期保存の完了前にページを閉じ得る | 回答済み表示を待って保存完了を確認してから再openする | 解消 |

## 7. 残存リスクと完了判定

- entry chunkがminify後642.26kBでViteの500kB警告を超える。性能閾値と機能試験は成功しているため工程5の重大障害ではないが、工程6で初回ロードへの影響を再確認する。詳細は`R-012`とする。
- 製品OSS-DB Silver Packが既定50問に満たない既知制約`R-011`は、工程1で受容済みである。
- 問題内容の公開前再確認`R-003`、利用者向けバックアップ注意の完成`R-006`、公開条件`R-004`は工程6の対象として残る。

工程5の完了条件である「全自動試験成功、重大障害ゼロ、要件証跡完備」を満たす。承認対象は本報告、工程5試験コード、工程5で必要となった修正、同期済み台帳である。
