# Exam Trainer

Exam Trainerは、試験に依存しないローカルファーストの問題演習PWAです。問題はGit管理のExam Packから読み込み、回答履歴は利用者のブラウザ内のIndexedDBへ保存します。v1はバックエンド、ログイン、クラウドデータベース、有料APIを必要としません。

> Exam Trainerは各試験運営団体の公式製品ではない、学習目的の独立したプロジェクトです。

## v1の機能

- `single`、`multiple`、`input`形式の通常演習と即時解説
- 未回答、誤答、弱点、お気に入り、分野別、ランダム演習
- 制限時間、中断再開、見直し、分野配分に対応した模擬試験
- 全体・分野別の成績表示
- IndexedDBへの自動保存とJSONバックアップ・全置換復元
- インストール可能なPWAとオフライン演習
- OSS-DB Silver学習用160問とWeb Platformデモ3問

## 利用する

公開版は[GitHub Pages](https://ritsumga.github.io/exam-trainer/)から利用できます。ローカル実行にはNode.js 24 LTSを使用してください。

```powershell
npm ci
npm run dev
```

`npm run dev`が表示したURLをブラウザで開きます。GitHub Pagesと同じproduction buildは次のコマンドで確認できます。

```powershell
npm run build
npm run preview
```

学習データはブラウザと公開元URLごとに保存され、端末間では同期されません。ブラウザデータの削除や端末故障に備え、データ管理画面から定期的にJSONバックアップを作成してください。詳しくは[利用ガイド](docs/60_受入リリース/user-guide.md)を参照してください。

## Exam Packを追加する

`exam-packs/<exam-id>/`へ`exam.yaml`、`domains.yaml`、`questions/*.md`を配置し、Validatorと品質ゲートを通して再ビルドします。問題は内容レビューと人の承認が完了するまで製品Packへ追加できません。詳しくは[Exam Pack作成ガイド](docs/60_受入リリース/exam-pack-guide.md)を参照してください。

## 品質確認

```powershell
npm ci
npm run validate
npm run validate:candidates
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## 文書

- [利用ガイド](docs/60_受入リリース/user-guide.md)
- [Exam Pack作成ガイド](docs/60_受入リリース/exam-pack-guide.md)
- [運用・リリースガイド](docs/60_受入リリース/operations-release-guide.md)
- [受入記録](docs/60_受入リリース/acceptance-report.md)
- [リリース記録](docs/60_受入リリース/release-record.md)

ソースコードの利用許諾条件は、ライセンスファイルが追加されるまで明示されていません。
