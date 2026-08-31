---
id: ossdb-v3-033
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "pg_ctl reload"
  b: "initdb"
  c: "dropdb"
  d: "pg_resetwal"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/app-initdb.html
  - url: https://www.postgresql.org/docs/current/manage-ag-overview.html
verifiedAt: 2026-08-31
status: approved
---
# Question

postgresql.confの設定変更後、reloadで反映可能なパラメータについて行う操作はどれか。1つ選びなさい。

# Explanation

reload可能な設定はサーバを停止せずに再読み込みできます。再起動が必要な設定もあります。

## a

正解です。reload可能な設定はサーバを停止せずに再読み込みできます。再起動が必要な設定もあります。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。reload可能な設定はサーバを停止せずに再読み込みできます。再起動が必要な設定もあります。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。reload可能な設定はサーバを停止せずに再読み込みできます。再起動が必要な設定もあります。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。reload可能な設定はサーバを停止せずに再読み込みできます。再起動が必要な設定もあります。
