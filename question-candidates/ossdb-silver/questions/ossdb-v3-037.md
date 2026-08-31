---
id: ossdb-v3-037
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "接続条件に最初に一致したレコードが使用される"
  b: "最後の行だけが必ず使用される"
  c: "全行の認証方式を順番に試す"
  d: "順序は一切影響しない"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

pg_hba.confのルール評価について正しいものはどれか。1つ選びなさい。

# Explanation

pg_hba.confは上から評価され、接続条件に最初に一致したレコードの認証方式が使われます。

## a

正解です。pg_hba.confは上から評価され、接続条件に最初に一致したレコードの認証方式が使われます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_hba.confは上から評価され、接続条件に最初に一致したレコードの認証方式が使われます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_hba.confは上から評価され、接続条件に最初に一致したレコードの認証方式が使われます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_hba.confは上から評価され、接続条件に最初に一致したレコードの認証方式が使われます。
