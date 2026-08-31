---
id: ossdb-v3-042
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "pg_dumpall"
  b: "pg_restore"
  c: "pg_isready"
  d: "initdb"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/app-initdb.html
  - url: https://www.postgresql.org/docs/current/manage-ag-overview.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

クラスタ内の全データベースやグローバルオブジェクトをSQL形式で取得する代表的なコマンドはどれか。1つ選びなさい。

# Explanation

pg_dumpallはクラスタ全体を論理的にダンプし、ロールやテーブルスペース定義なども扱えます。

## a

正解です。pg_dumpallはクラスタ全体を論理的にダンプし、ロールやテーブルスペース定義なども扱えます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_dumpallはクラスタ全体を論理的にダンプし、ロールやテーブルスペース定義なども扱えます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_dumpallはクラスタ全体を論理的にダンプし、ロールやテーブルスペース定義なども扱えます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_dumpallはクラスタ全体を論理的にダンプし、ロールやテーブルスペース定義なども扱えます。
