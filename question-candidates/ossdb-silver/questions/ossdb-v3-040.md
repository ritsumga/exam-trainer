---
id: ossdb-v3-040
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "pg_settingsのcontextなどの情報"
  b: "SELECT * FROM 任意の業務表"
  c: "COPYだけ"
  d: "DROP ROLE"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

設定変更の反映にサーバ再起動が必要かどうかを確認するのに役立つものはどれか。1つ選びなさい。

# Explanation

pg_settingsでは設定パラメータの変更可能コンテキストを確認でき、再起動要否の判断材料になります。

## a

正解です。pg_settingsでは設定パラメータの変更可能コンテキストを確認でき、再起動要否の判断材料になります。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_settingsでは設定パラメータの変更可能コンテキストを確認でき、再起動要否の判断材料になります。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_settingsでは設定パラメータの変更可能コンテキストを確認でき、再起動要否の判断材料になります。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_settingsでは設定パラメータの変更可能コンテキストを確認でき、再起動要否の判断材料になります。
