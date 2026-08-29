---
id: ossdb-pgdump-consistency
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [b]
choices:
  a: ダンプ中は他の利用者をすべてデータベースから切断する必要がある
  b: データベースが同時に使用されていても整合したスナップショットを作成できる
  c: PostgreSQLサーバーを停止してからだけ実行できる
  d: すべてのデータベースロールも単一データベースのダンプへ必ず含める
tags: [backup, pg-dump]
sources:
  - url: https://www.postgresql.org/docs/current/backup-dump.html
verifiedAt: 2026-08-29
status: approved
---
# Question

PostgreSQLの`pg_dump`による単一データベースのSQLダンプについて正しい説明はどれですか。

# Explanation

`pg_dump`は他の利用者がデータベースを使用している間も、内部的に整合したダンプを作れます。

## a

通常のダンプのために全利用者を切断する必要はありません。

## b

同時利用中でも整合したスナップショットを取得できます。

## c

サーバー稼働中に実行できます。

## d

ロールなどクラスタ全体の大域オブジェクトは単一データベースの`pg_dump`対象外です。
