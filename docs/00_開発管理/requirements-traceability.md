# 要件トレーサビリティ

## 1. 運用ルール

- 要件IDは承認後に再利用しない。削除要件も履歴を残す。
- 工程1で要件を原子化し、設計、実装、試験、証跡を追記する。
- 状態は`候補`、`確定`、`実装済み`、`検証済み`、`対象外`を使用する。
- 本表と要件定義が矛盾する場合は、最後に承認された工程成果物を優先し、矛盾を課題登録する。
- 工程1のレビュー中は`候補`とし、人が工程1を承認した時点で工程1対象行を`確定`へ更新する。

設計欄では次の略号を使用する。

- `ARC`: [基本アーキテクチャ設計](../20_基本設計/architecture-design.md)
- `UI`: [画面・遷移基本設計](../20_基本設計/ui-navigation-design.md)
- `DATA`: [データフロー・保存基本設計](../20_基本設計/data-flow-storage-design.md)
- `PWA`: [PWA・AI拡張基本設計](../20_基本設計/pwa-ai-extension-design.md)
- `TYPE`: [型・スキーマ・Exam Pack詳細設計](../30_詳細設計/type-schema-pack-design.md)
- `DB`: [DB・バックアップ詳細設計](../30_詳細設計/database-backup-design.md)
- `ENG`: [ドメインエンジン詳細設計](../30_詳細設計/domain-engine-design.md)
- `APP`: [アプリケーション・UI・例外詳細設計](../30_詳細設計/application-ui-error-design.md)
- `TEST`: [PWA・試験詳細設計](../30_詳細設計/pwa-test-design.md)
- `SYSTEM-TEST`: [工程5 結合・総合試験結果](../50_試験/system-test-report.md)
- `ACCEPTANCE`: [工程6 受入記録](../60_受入リリース/acceptance-report.md)

## 2. 工程1で原子化した機能要件

| ID | 要件 | 要件定義 | 決定記録 | 設計 | 実装 | 試験・証跡 | 状態 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-001 | `single`は唯一の正解との一致だけを正解とする | 6.7 | DR-001 | ARC 6.1、TYPE 4、ENG 3 | `src/core/scoring.ts` | `scoring.test.ts`、工程5 E2E | 実装済み |
| FR-002 | `multiple`は集合の完全一致で採点し、順序を無視して部分点を設けない | 6.7 | DR-001 | ARC 6.1、TYPE 4、ENG 3 | `src/core/scoring.ts` | `scoring.test.ts`、工程5 E2E | 実装済み |
| FR-003 | `input`を規定手順で正規化し、正解候補と完全一致で採点する | 6.7 | DR-002 | ARC 6.1、TYPE 4、ENG 3 | `src/core/scoring.ts` | `scoring.test.ts`、工程5 E2E | 実装済み |
| FR-004 | 回答履歴の回答値を全形式で文字列配列として保存する | 8.1 | DR-001、DR-002 | DATA 3・5、TYPE 2、DB 3 | `src/schemas/learning-data.ts`、`src/db/repository.ts` | `repository.test.ts`、工程5 DB試験 | 実装済み |
| FR-005 | 弱点優先度を6要素と規定の式・同点規則で算出する | 11.1 | DR-005 | ARC 6.4、DATA 6、ENG 7 | `src/core/review.ts` | `review.test.ts`、工程5 E2E | 実装済み |
| FR-006 | 重みがある模擬試験の分野枠を最大剰余法で決める | 12 | DR-003 | ARC 6.3、DATA 7、ENG 6 | `src/core/mock-exam.ts` | `mock-exam.test.ts` | 実装済み |
| FR-007 | 分野不足時は規定順で空き分野へ枠を再配分し、差を通知する | 12 | DR-003、DR-004 | ARC 6.3、DATA 7、UI 4.4、ENG 6、APP 6.2 | `src/core/mock-exam.ts`、`src/features/mock-exam.tsx` | `mock-exam.test.ts`、工程5 E2E | 実装済み |
| FR-008 | 試験全体の問題不足時は模擬試験を開始せず不足数を表示する | 12 | DR-004 | DATA 7.1、UI 4.4、ENG 6、APP 6.2 | `src/core/mock-exam.ts`、`src/features/mock-exam.tsx` | `mock-exam.test.ts`、工程5 E2E | 実装済み |
| FR-009 | 模擬試験で同じ問題を重複出題せず、問題抽出と順序をランダム化する | 12 | DR-003 | ARC 6.3・7、DATA 7.1、ENG 4・6 | `src/core/random.ts`、`src/core/mock-exam.ts` | `mock-exam.test.ts` | 実装済み |
| FR-010 | 未完了模擬試験を操作ごとに保存し、絶対期限で再開する | 12.1 | DR-007 | DATA 7.2、UI 4.2・5、DB 3〜5、APP 4.2 | `src/db/repository.ts`、`src/features/mock-exam.tsx` | 工程5 DB・E2E | 実装済み |
| FR-011 | 時間切れで自動提出し、未回答を得点分母と結果へ含める | 12.1 | DR-008 | DATA 7.2・7.3、UI 4.4、DB 5、ENG 8、APP 4.2 | `src/core/mock-exam.ts`、`src/db/repository.ts`、`src/features/mock-exam.tsx` | `mock-exam.test.ts`、工程5 E2E | 実装済み |
| FR-012 | バックアップ対象全件をJSONへ出力する | 13.1 | DR-006 | DATA 9、UI 4.6、DB 6 | `src/db/repository.ts`、`src/features/data-settings.tsx` | `repository.test.ts`、工程5 E2E | 実装済み |
| FR-013 | 復元前に全体検証とプレビューを行い、確認後に全置換する | 13.1 | DR-006 | DATA 10、UI 4.6、DB 7、APP 6.4 | `src/db/repository.ts`、`src/features/data-settings.tsx` | `repository.test.ts`、工程5 E2E | 実装済み |
| FR-014 | 復元を原子的に行い、失敗時に既存データを保持する | 13.1 | DR-006 | DATA 10・11、DB 5・7 | `src/db/repository.ts` | `repository.test.ts`、工程5異常系 | 実装済み |
| FR-015 | 同版と検証済み旧版だけを復元し、未知版と新版を拒否する | 13.1 | DR-016 | DATA 10、DB 2・7 | `src/schemas/backup.ts`、`src/db/repository.ts` | `repository.test.ts`、工程5移行試験 | 実装済み |
| FR-016 | Exam Packを開発時に配置・検証し、再ビルドして同梱する | 5、9.1 | DR-009 | ARC 5、DATA 4、PWA 3、TYPE 3〜7 | `scripts/build-exam-packs.ts`、`src/data/exam-pack-catalog.ts` | `npm run validate`、`npm run build` | 実装済み |
| FR-017 | 製品同梱問題に出典、確認日、承認状態を必須とする | 6.3、6.5、16 | DR-012、DR-013、DR-015 | DATA 4、PWA 8、TYPE 4・6 | `src/schemas/exam-pack.ts`、`scripts/build-exam-packs.ts` | Validator、問題レビュー記録 | 実装済み |
| FR-018 | 問題を独自に構成し、記憶問題、ダンプ、転記、軽微な言い換えを使わない | 6.5 | DR-014 | PWA 8、TYPE 6 | `exam-packs/` | 問題レビュー記録、人承認 | 実装済み |
| FR-019 | OSS-DB Silverの承認済み独自問題を10〜20問同梱する | 19、21.1 | DR-010 | ARC 5、PWA 8、TYPE 6 | `exam-packs/ossdb-silver/` | Validator、問題レビュー記録、人承認 | 実装済み |
| FR-020 | 第2試験デモPackに3形式を各1問以上、合計3問以上含める | 19、21.11 | DR-010 | ARC 4・5、TYPE 4・6 | `exam-packs/web-platform-demo/` | Validator、工程5 E2E | 実装済み |
| FR-021 | 50問・5,000問fixtureを製品成果物とPWAキャッシュへ混入させない | 19 | DR-011 | ARC 5、DATA 4、PWA 3、TEST 2・5 | `scripts/check-build.ts` | `npm run build`、工程5 fixture試験 | 実装済み |
| FR-022 | 問題難易度を必要知識と推論量による5段階で判定する | 6.6 | DR-017 | TYPE 4・6、TEST 5 | `src/schemas/exam-pack.ts`、`exam-packs/` | Validator、問題レビュー記録 | 実装済み |
| FR-023 | 模擬試験の問題数と制限時間をPack設定値以下の正整数で指定する | 12 | DR-018 | DATA 7.1、UI 4.4、ENG 6、APP 6.2 | `src/core/mock-exam.ts`、`src/features/mock-exam.tsx` | `mock-exam.test.ts`、工程5 E2E | 実装済み |
| FR-024 | 横幅360px〜1,440pxとキーボードだけで主要機能を操作できる | 18.5 | DR-019 | UI 6・7、APP 7、TEST 5 | `src/styles.css`、`src/components/`、`src/features/` | 工程5レスポンシブ・E2E | 実装済み |

## 3. v1受け入れ要件

| ID | 要件 | 要件定義 | 設計 | 実装 | 試験・証跡 | 状態 |
| --- | --- | --- | --- | --- | --- | --- |
| AC-01 | OSS-DB Silverの承認済み独自問題10〜20問をMarkdownから読み込める | 21.1 | ARC 5、DATA 4、UI 4.1、TYPE 4〜7 | `exam-packs/ossdb-silver/`、Pack Catalog、試験選択UI | Validator、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-02 | single、multiple、inputへ回答できる | 21.2 | ARC 6.1、UI 4.3、TYPE 4、ENG 3、APP 5 | 採点エンジン、`QuestionInput`、通常演習UI | 単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-03 | 正誤判定と解説表示ができる | 21.3 | UI 4.3・4.4、APP 4.1・5 | 通常演習UI、模試UI | 単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-04 | 回答履歴がブラウザ再起動後も残る | 21.4 | DATA 3・5・7.2、PWA 2、DB 2〜5 | Dexie Repository | DB単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-05 | 誤答、未回答、お気に入り、分野別、ランダム演習ができる | 21.5 | ARC 6.2、DATA 5、UI 4.2、ENG 5 | 演習エンジン、演習設定UI | 単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-06 | 規定式と同点規則で弱点問題を抽出できる | 21.6 | ARC 6.4、DATA 6、ENG 7 | 復習優先度エンジン | 単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-07 | 分野割当、問題不足、中断再開、時間切れを含む模擬試験を実施できる | 21.7 | ARC 6.3、DATA 7、UI 4.4、DB 5、ENG 6・8、APP 4.2 | 模試エンジン、Repository、模試UI | 単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-08 | 試験終了後に分野別結果を確認できる | 21.8 | DATA 8、UI 4.5、ENG 8・9、APP 6.3 | 結果集計、結果UI、誤答再演習 | 単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-09 | 版検証と原子的な全置換により学習データをJSONへバックアップ・復元できる | 21.9 | DATA 9・10、UI 4.6、DB 6〜8、APP 6.4 | Backup schema、Repository、データ管理UI | DB単体、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-10 | オフラインで主要学習機能が動作する | 21.10 | PWA 2〜5、TEST 2・3・8 | Vite PWA、precache | production build、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-11 | 3形式を含む第2試験をExam Pack追加だけで利用できる | 21.11 | ARC 4・5、DATA 4、TYPE 4〜7 | `exam-packs/web-platform-demo/` | Validator、SYSTEM-TEST、ACCEPTANCE | 検証済み |
| AC-12 | 有料サービスなしで主要機能を利用できる | 21.12 | ARC 2、PWA 9、全工程 | ローカルPWA、OSS依存のみ | 依存監査、SYSTEM-TEST、ACCEPTANCE | 検証済み |

## 4. 横断要件

| ID | 要件 | 要件定義 | 設計・検証先 | 状態 |
| --- | --- | --- | --- | --- |
| QR-01 | 問題データと学習履歴を分離する | 2、3.3、8 | `exam-packs/`、`src/db/`、工程5 | 実装済み |
| QR-02 | 試験固有ロジックを共通UI・エンジンへ持ち込まない | 4、7、18.4、22 | Pack Catalog、共通エンジン・UI、工程5 | 実装済み |
| QR-03 | Exam Packと問題を自動検証する | 5、6、16 | Zod schema、Pack Validator、工程5 | 実装済み |
| QR-04 | 数千問規模で実用的に動作する | 18.2 | ARC 5・9、DATA 8、TEST 7、SYSTEM-TEST 5 | 検証済み |
| QR-05 | PC・スマートフォンとキーボード操作へ対応する | 14、18.5 | セマンティックHTML、レスポンシブCSS、工程5・6 | 実装済み |
| QR-06 | AI生成問題を検証・人承認なしに正式化しない | 15、22 | 候補隔離、問題レビュー記録、AI境界型 | 実装済み |
| QR-07 | 未知のバックアップ版を安全に拒否する | 13 | Backup schema、Repository、工程5 | 実装済み |

## 5. 変更記録

| 日付 | 対象 | 内容 | 要件への影響 |
| --- | --- | --- | --- |
| 2026-08-26 | 要件定義書 | 英語の自然文を日本語へ統一 | 意味、要件ID、対応関係、状態の変更なし |
| 2026-08-26 | AI駆動開発基盤 | コミットメッセージ作成と問題妥当性レビューのプロジェクトスキルを追加 | 製品要件の意味と状態に変更なし。QR-03、QR-06を支援するが検証証跡や人の承認は代替しない |
| 2026-08-29 | 工程1要件確定 | 未決だった採点、入力正規化、模擬試験、弱点、復元、中断再開、時間切れ、Pack追加、問題公開条件を原子化 | FR-001〜FR-024を追加し、AC-01、AC-06、AC-07、AC-09、AC-11を具体化。工程1承認までは候補 |
| 2026-08-29 | 工程1承認 | 人が工程1成果物と既知制約を承認 | FR-001〜FR-024、AC-01〜AC-12、QR-01〜QR-07を確定 |
| 2026-08-29 | 工程2基本設計 | アーキテクチャ、画面・遷移、データフロー、PWA・AI境界の設計参照を追加 | 要件の意味と状態は変更せず、工程2対象FR・AC・QRの設計先を具体化 |
| 2026-08-29 | 工程3詳細設計 | 型・Pack、DB・バックアップ、ドメインエンジン、UI・例外、PWA・試験の詳細設計参照を追加 | 要件の意味と状態は変更せず、FR-001〜FR-024、AC-01〜AC-11、QR-01〜QR-07の実装・試験仕様を具体化 |
| 2026-08-29 | 工程4実装 | React/Vite/PWA基盤、Zod契約、Pack Validator、採点・演習・弱点・模試エンジン、Dexie Repository、バックアップ、画面、CI、承認済み問題13問を実装 | FR-001〜FR-024、AC-01〜AC-12、QR-01〜QR-03、QR-05〜QR-07を実装済みへ更新。QR-04の性能検証は工程5で実施する |
| 2026-08-30 | 工程5結合・総合試験 | 50問・5,000問fixture、DB異常系、E2E、PWA、offline、更新、レスポンシブ、axe、性能試験を追加し、検出障害を修正 | FR-001〜FR-024、AC-01〜AC-12、QR-01〜QR-07の自動試験証跡をSYSTEM-TESTへ集約し、QR-04を検証済みへ更新 |
| 2026-08-30 | 工程6公開前受入 | 12受入条件の事前判定、利用・Pack・運用文書、問題公開前レビュー、Pages workflowを整備し、復元完了表示と初期chunkを修正 | AC-01〜AC-12の工程6証跡をACCEPTANCEへ集約。AC-09の各件数・日時表示を補完し、QR-04の初回ロードリスクを軽減。人の公開前受入承認によりAC-01〜AC-12を検証済みへ更新 |
