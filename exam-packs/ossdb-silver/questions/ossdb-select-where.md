---
id: ossdb-select-where
exam: ossdb-silver
domain: sql
type: single
difficulty: 1
answers: [b]
choices:
  a: SELECT句
  b: WHERE句
  c: ORDER BY句
  d: DISTINCT句
tags: [select, filter]
sources:
  - url: https://www.postgresql.org/docs/current/tutorial-select.html
verifiedAt: 2026-08-30
status: approved
---
# Question

PostgreSQLの`SELECT`文で、真偽式を使って取得対象の行を絞り込む句はどれですか。

# Explanation

`WHERE`句は真になる行だけを取得対象にします。

## a

`SELECT`句は返す列や式を指定します。

## b

`WHERE`句が取得前の行を条件で絞り込みます。

## c

`ORDER BY`句は結果の並び順を指定します。

## d

`DISTINCT`は結果から重複行を除きます。
