---
id: ossdb-v3-087
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "CHECK (value >= 0)"
  b: "DEFAULT 0だけ"
  c: "NULL"
  d: "ORDER BY value"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: approved
---
# Question

値が0以上であることを保証したいときに適する制約はどれか。1つ選びなさい。

# Explanation

CHECK制約は行に格納される値が指定条件を満たすことを検証します。

## a

正解です。CHECK制約は行に格納される値が指定条件を満たすことを検証します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。CHECK制約は行に格納される値が指定条件を満たすことを検証します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。CHECK制約は行に格納される値が指定条件を満たすことを検証します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。CHECK制約は行に格納される値が指定条件を満たすことを検証します。
