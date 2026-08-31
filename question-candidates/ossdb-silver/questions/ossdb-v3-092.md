---
id: ossdb-v3-092
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "パーティショニング"
  b: "GRANT"
  c: "SAVEPOINT"
  d: "VACUUMだけ"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

テーブルを論理的な単位で分割して管理する機能はどれか。1つ選びなさい。

# Explanation

宣言的パーティショニングではPARTITION BYやPARTITION OFなどを用いて表を分割します。

## a

正解です。宣言的パーティショニングではPARTITION BYやPARTITION OFなどを用いて表を分割します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。宣言的パーティショニングではPARTITION BYやPARTITION OFなどを用いて表を分割します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。宣言的パーティショニングではPARTITION BYやPARTITION OFなどを用いて表を分割します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。宣言的パーティショニングではPARTITION BYやPARTITION OFなどを用いて表を分割します。
