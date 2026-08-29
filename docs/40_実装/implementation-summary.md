# 工程4 実装概要

## 1. 実装範囲

- React、TypeScript strict、Vite、Hash Router、PWAのアプリ基盤
- `package.json`で本番依存・開発依存を完全固定し、`package-lock.json`とNode.js 24環境を統一
- Zodを正本とするExam Pack、学習データ、バックアップ契約
- YAML・Markdownから生成JSONを作る製品Pack Validator
- single、multiple、inputの正規化と採点
- 未回答、誤答、お気に入り、ランダム、弱点、指定IDの演習抽出
- Mulberry32、Fisher–Yates、最大剰余法、分野不足再配分による模擬試験生成
- 絶対期限、操作ごとの保存、revision競合、冪等な模試提出と分野別結果
- Dexie/IndexedDBによる履歴、お気に入り、模試、設定、metaの保存
- schemaVersion 1のJSONバックアップ、版拒否、revision確認、単一トランザクション全置換
- 試験選択、通常演習、模擬試験、結果、成績、データ管理のレスポンシブ画面
- Workboxによる事前キャッシュと明示更新
- Windows/Node.js 24のGitHub Actions品質ゲート

## 2. 実装境界

UIは`src/services/`の機能境界を呼び、生成JSONやDexieを直接参照しない。試験固有の知識は`exam-packs/`だけに置き、共通エンジンとUIには試験IDや分野名による分岐を置かない。

製品入力は`exam-packs/`だけである。13問は承認前に`question-candidates/`へ隔離し、2026-08-29の人による集合承認後に限り`status: approved`として製品Packへ昇格した。

## 3. 工程4内の検証

`npm run validate`、`npm run validate:candidates`、`npm run lint`、`npm run typecheck`、`npm test`、`npm run build`を品質ゲートとする。結合・総合・PWA・レスポンシブのPlaywright試験は工程5で実施する。

## 4. 工程5以降の検証対象

工程5では50問・5,000問fixture、ブラウザ再起動、PWAオフライン、更新調停、360px〜1,440px、キーボード操作、異常Pack、保存障害を結合・総合試験として検証する。工程4ではこれらの試験設計を先行実施せず、実装とローカル品質ゲートの証跡までを承認対象とする。
