# 運用・リリースガイド

## 1. 公開方針

公開元は人が承認した`main`とし、GitHub Actionsの手動実行、または明示承認後の`.github/pages-deploy-trigger.txt`更新で全品質ゲートが成功した成果物だけをGitHub Pagesへ公開する。通常の`main` pushではPagesを公開しない。Pagesのベースパスは`/exam-trainer/`である。push、リポジトリ可視性変更、Pages設定、デプロイ、GitHub Release作成は、それぞれ人の明示承認後に実施する。

2026-08-30時点で、GitHub FreeのPagesは公開リポジトリで利用できる。無料運用ではリポジトリを公開する必要があり、公開するとソースと履歴を誰でも閲覧できる。Pagesサイト自体もインターネットへ公開される。根拠はGitHub公式の[GitHub Pagesの概要](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[GitHubのプラン](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)、[Pagesサイトの作成](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)とする。

本アプリは教育目的の静的PWAで、商取引、パスワードや決済情報の送信、利用者データの収集を行わない。[GitHub Pagesの制限](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)に照らし、非公式の教育目的プロジェクトである旨をREADMEと画面へ表示する。

## 2. 初回公開前チェック

1. 工程6の12受入条件を人が確認し、公開前受入結果と公開実行を承認する。工程6の正式承認は公開後確認の完了後に行う。
2. `main`統合前に秘密情報、アクセストークン、個人情報、不要な大容量ファイルが履歴と成果物にないことを確認する。
3. リポジトリ可視性を確認する。GitHub Freeで非公開の場合は、公開変更の影響を確認して人が明示承認する。
4. GitHubのSettings > PagesでSourceをGitHub Actionsに設定する。この外部変更にも明示承認を得る。
5. 承認済み`main`をpushし、品質ゲートの成功を確認する。
6. `GitHub Pagesへ公開` workflowを`main`に対して手動実行するか、承認内容を`.github/pages-deploy-trigger.txt`へ記録してpushする。workflowは全品質ゲート後に`dist`だけを公開する。

Pages custom workflowの権限と構成は、GitHub公式の[custom workflow手順](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)に従う。

## 3. 公開後確認

期待URLは`https://ritsumga.github.io/exam-trainer/`とする。公開後、実際のURLとworkflow runをリリース記録へ記入し、次をPC幅と360px幅で確認する。

- ルートURLと`/#/exams`への直リンク
- 2つのPackと163問の読込、3形式の通常演習、解説・出典表示
- PWAインストール可否とService Worker登録
- onlineで一度利用した後のoffline再起動、採点、履歴保存、模試再開、成績
- 再読込とブラウザ再起動後のIndexedDB永続化
- 新版公開時の更新通知、「後で」、「更新する」
- JSONバックアップ、復元プレビュー、全置換、復元後件数・日時
- Console error、404、意図しない外部通信がないこと

すべて成功してから`v1.0.0`を確定する。失敗時は`v1.0.0`を作成せず、公開を停止するか修正版を同じ工程6で作成する。

## 4. 更新と障害対応

- 更新前に問題の公開状態、Validator、全品質ゲート、変更対象要件を確認する。
- 問題・コード更新はrevision付きprecacheと利用者の明示更新で配布する。
- 重大障害時はGitHub Pagesの公開を停止し、原因と影響をリスク・課題台帳へ記録する。古い承認タグを移動せず、修正版は新しいコミットと増分タグで管理する。
- IndexedDBの自動移行またはバックアップschemaVersionを変更する場合は、検証済みマイグレーションと旧版・新版・失敗時無変更の試験を先に追加する。
- 利用者データは運営側で回収・復旧できない。障害告知では、ブラウザデータを削除せずJSONバックアップを確保するよう案内する。

## 5. 無料運用の確認

少なくともリリースごとに、GitHubのプランとPages条件、Actions利用量、依存ライセンス、脆弱性、外部通信、リポジトリ可視性を再確認する。有料サービスを必須化する変更はv1制約に反するため、要件変更の承認なしに導入しない。
