---
id: ossdb-v3-065
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "analystからsales表へのINSERT権限を取り消す"
  b: "sales表の全行を削除する"
  c: "analystへINSERT権限を付与する"
  d: "トランザクションを開始する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

REVOKE INSERT ON TABLE sales FROM analyst; の効果はどれか。1つ選びなさい。

# Explanation

REVOKEは付与済みの権限を取り消します。

## a

正解です。REVOKEは付与済みの権限を取り消します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。REVOKEは付与済みの権限を取り消します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。REVOKEは付与済みの権限を取り消します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。REVOKEは付与済みの権限を取り消します。
