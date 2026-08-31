---
id: ossdb-v3-032
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "pg_hba.conf"
  b: "postgresql.auto.confだけ"
  c: "tablespace_map"
  d: "postmaster.pidだけ"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: approved
---
# Question

クライアント認証のルールを主に記述するファイルはどれか。1つ選びなさい。

# Explanation

pg_hba.confは接続元、DB、ユーザ、認証方式などのアクセスルールを定義します。

## a

正解です。pg_hba.confは接続元、DB、ユーザ、認証方式などのアクセスルールを定義します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_hba.confは接続元、DB、ユーザ、認証方式などのアクセスルールを定義します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_hba.confは接続元、DB、ユーザ、認証方式などのアクセスルールを定義します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_hba.confは接続元、DB、ユーザ、認証方式などのアクセスルールを定義します。
