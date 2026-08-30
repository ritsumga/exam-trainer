# Exam Trainer v1 リリース記録

## 1. 現在の状態

| 項目 | 値 |
| --- | --- |
| リリース候補 | v1 |
| package version | `0.1.0` |
| 工程 | 6 受入・リリース |
| 状態 | 初回公開・自動公開後確認完了、最終承認待ち |
| 公開URL | `https://ritsumga.github.io/exam-trainer/` |
| 公開コミット | `7757bf9e51e909468c872852e061a778e2014a53` |
| GitHub Actions run | [`33317007758`](https://github.com/ritsumga/exam-trainer/actions/runs/33317007758) 成功 |
| 公開日時 | 2026-08-30 23:31 JST |
| `v1.0.0` | 未確定 |

2026-08-30に、12受入条件と13問の公開前受入結果、および初回公開に必要な外部操作が人により承認された。同日、リポジトリを公開し、GitHub Actions run `33317007758`の全品質ゲート成功後にPagesへ初回公開した。自動化できる公開後確認は成功した。`v1.0.0`と工程6承認ゲートは、この公開結果への人の最終承認後に確定する。現在の`0.1.0`は公開候補を示し、先に`v1.0.0`へ変更しない。

## 2. リリース内容

- 試験非依存のReact/TypeScript PWA
- OSS-DB Silver学習用10問、Web Platformデモ3問
- `single`、`multiple`、`input`の採点と解説
- 通常演習、弱点復習、模擬試験、成績
- IndexedDB保存、JSONバックアップ・原子的全置換復元
- オフライン利用、更新通知、レスポンシブ・キーボード操作
- Exam Pack Validator、単体・DB・E2E・PWA・性能試験

## 3. 公開作業の結果

- AC-01〜AC-12と製品同梱13問の公開前受入結果: 2026-08-30承認済み
- 工程6成果物のコミット、`main`統合、push、必要なリポジトリ公開変更、Pages設定、初回デプロイ: 2026-08-30承認済み
- GitHubリポジトリ: `private`から`public`へ変更済み
- `main` push、Pages Source `GitHub Actions`、HTTPS強制、workflow手動実行: 完了
- GitHub Actions: 固定依存、Validator、lint、型検査、単体・DB試験、E2E、build、deployが成功

## 4. 公開後確認

| 項目 | 結果 | 証跡 |
| --- | --- | --- |
| ルートURLと`/#/exams`直リンク | 成功 | 公開URLをChromiumで直接表示 |
| Pack・問題・形式 | 成功 | `ossdb-silver` 10問、`web-platform-demo` 3問、両Packで`single`・`multiple`・`input`を取得 |
| 通常演習、解説、出典 | 成功 | 公開版で回答確定後に解説・参照資料を表示 |
| PWA | 成功 | manifest HTTP 200、Service Worker登録・制御、同runの更新E2E成功 |
| offlineとIndexedDB | 成功 | お気に入り保存後のonline再読込とoffline再読込で状態を保持 |
| 360px表示 | 成功 | 横overflowなし |
| エラー・404 | 成功 | Console error 0件、失敗request 0件 |

実端末・実ブラウザのインストールUI表示と、将来の新版を実配信した際の更新通知は、初回公開だけでは完全には再現できない。manifest、Service Worker、offline実動作と、同一公開コミットに対するPWAインストール・実build更新E2Eを代替証跡とする。

## 5. 最終承認前の保留事項

- 人が公開URLと本記録を確認し、工程6の正式完了を承認する。
- 承認後に`package.json`を`1.0.0`へ更新し、最終品質ゲート、`v1.0.0`、工程6承認コミット、`gate-06-release-v1.0`を確定する。

## 6. 既知制約

- OSS-DB Silver学習用Packは10問で、公式試験の約50問より少ない。
- 学習データはブラウザローカルで、端末間同期や運営側復旧はない。
- v1では利用者によるExam Pack追加、ログイン、クラウドDB、AI生成を提供しない。
- 第三者問題集との網羅的な文章類似性は確認できない。
