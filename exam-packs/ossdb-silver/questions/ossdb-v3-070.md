---
id: ossdb-v3-070
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "WHERE salary >= 500000"
  b: "HAVING salary >= 500000だけ"
  c: "OFFSET salary"
  d: "INTO salary"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: approved
---
# Question

employees表からsalaryが500000以上の行だけ取得する句はどれか。1つ選びなさい。

# Explanation

行単位の抽出条件はWHERE句に記述します。

## a

正解です。行単位の抽出条件はWHERE句に記述します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。行単位の抽出条件はWHERE句に記述します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。行単位の抽出条件はWHERE句に記述します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。行単位の抽出条件はWHERE句に記述します。
