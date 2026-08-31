---
id: ossdb-v3-061
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "current_user"
  b: "current_date"
  c: "version()だけ"
  d: "pg_isready"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: approved
---
# Question

現在のSQLセッションのユーザを確認する代表的な式はどれか。1つ選びなさい。

# Explanation

current_userで現在の実行権限上のユーザを確認できます。

## a

正解です。current_userで現在の実行権限上のユーザを確認できます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。current_userで現在の実行権限上のユーザを確認できます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。current_userで現在の実行権限上のユーザを確認できます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。current_userで現在の実行権限上のユーザを確認できます。
