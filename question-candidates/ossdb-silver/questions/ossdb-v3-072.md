---
id: ossdb-v3-072
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "dept_idの重複を除いた結果を返す"
  b: "dept_id列を削除する"
  c: "NULLだけ返す"
  d: "dept_idで必ず集約計算する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

SELECT DISTINCT dept_id FROM employees; の効果はどれか。1つ選びなさい。

# Explanation

DISTINCTはSELECT結果の重複行を除去します。

## a

正解です。DISTINCTはSELECT結果の重複行を除去します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。DISTINCTはSELECT結果の重複行を除去します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。DISTINCTはSELECT結果の重複行を除去します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。DISTINCTはSELECT結果の重複行を除去します。
