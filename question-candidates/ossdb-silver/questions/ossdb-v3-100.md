---
id: ossdb-v3-100
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "READ COMMITTED"
  b: "READ UNCOMMITTED"
  c: "REPEATABLE READ"
  d: "SERIALIZABLE"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

PostgreSQLのデフォルトのトランザクション分離レベルはどれか。1つ選びなさい。

# Explanation

PostgreSQLのデフォルト分離レベルはREAD COMMITTEDです。各SQL文の開始時点でコミット済みデータを参照するのが基本です。

## a

正解です。PostgreSQLのデフォルト分離レベルはREAD COMMITTEDです。各SQL文の開始時点でコミット済みデータを参照するのが基本です。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLのデフォルト分離レベルはREAD COMMITTEDです。各SQL文の開始時点でコミット済みデータを参照するのが基本です。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLのデフォルト分離レベルはREAD COMMITTEDです。各SQL文の開始時点でコミット済みデータを参照するのが基本です。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLのデフォルト分離レベルはREAD COMMITTEDです。各SQL文の開始時点でコミット済みデータを参照するのが基本です。
