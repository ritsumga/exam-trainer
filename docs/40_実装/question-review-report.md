# 工程4 問題妥当性レビュー記録

## 1. 対象と位置づけ

本記録は`question-candidates/`に置いた13問の人による承認前レビューと、その後の承認結果を記録する。Validator成功と本判定案だけでは製品へ同梱せず、2026-08-29の人による集合承認後に限り製品Packへ昇格した。

### 1.1 人による承認

| 承認日 | 承認者 | 対象 | 結果 |
| --- | --- | --- | --- |
| 2026-08-29 | 人（プロジェクトオーナー） | 本書2章に列挙した13問 | 製品同梱問題として承認 |

## 2. 総合判定案

| Pack | 問題ID | 判定案 |
| --- | --- | --- |
| OSS-DB Silver | `ossdb-select-where` | 承認候補 |
| OSS-DB Silver | `ossdb-left-join` | 承認候補 |
| OSS-DB Silver | `ossdb-aggregate-filter` | 承認候補 |
| OSS-DB Silver | `ossdb-transaction-rollback` | 承認候補 |
| OSS-DB Silver | `ossdb-savepoint-command` | 承認候補 |
| OSS-DB Silver | `ossdb-index-tradeoff` | 承認候補 |
| OSS-DB Silver | `ossdb-pgdump-consistency` | 承認候補 |
| OSS-DB Silver | `ossdb-role-concept` | 承認候補 |
| OSS-DB Silver | `ossdb-foreign-key` | 承認候補 |
| OSS-DB Silver | `ossdb-vacuum-full` | 承認候補 |
| Web Platformデモ | `web-set-unique` | 承認候補 |
| Web Platformデモ | `web-promise-states` | 承認候補 |
| Web Platformデモ | `web-array-transform` | 承認候補 |

## 3. 指摘事項

重大・中・軽微の指摘はない。全問題について、問う条件、正解、誤答理由、難易度、形式別回答条件を確認した。問題文と解説は参照資料の技術的事実から独自に構成し、実在試験の記憶問題、ダンプ、第三者問題集を入力に使用していない。

## 4. 確認した出典

確認日は2026-08-29とした。

- OSS-DB Silver Ver.3.0の出題範囲: <https://oss-db.jp/outline/silver>
- PostgreSQL 18公式文書: `SELECT`、結合、集約、トランザクション、インデックス、SQL Dump、ロール、制約、`VACUUM`
- MDN Web Docs: `Set`、`Promise`、`Array.prototype.map()`

各問題が直接根拠とするHTTPS URLはFront Matterの`sources`へ記録した。OSS-DB問題は現行出題範囲のS2.4、S2.5、S3.1、S3.2、S3.3に対応する。

## 5. 判定不能

第三者問題集との網羅的な文章類似性は、比較対象コーパスがないため判定不能である。人は問題文が既知の問題と酷似していないかを最終確認する必要がある。

## 6. 人が最終判断すべき事項

1. 13問を集合として製品同梱してよいか。
2. OSS-DB Silverの学習目的と難易度が期待に合うか。
3. 明示承認後、対象ファイルを`exam-packs/`へ移し、`status: approved`へ変更してよいか。

本承認に基づき、Codexは対象13問だけを`status: approved`として製品Packへ昇格し、製品Validatorと全工程4品質ゲートを再実行する。
