---
id: ossdb-v3-036
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "サーバ設定パラメータの現在値や属性を参照する"
  b: "テーブルの全データをバックアップする"
  c: "ロールのパスワードを平文表示する"
  d: "WALファイルを削除する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: approved
---
# Question

pg_settingsビューの用途として適切なものはどれか。1つ選びなさい。

# Explanation

pg_settingsは設定値、単位、変更コンテキスト、ソースなどを確認できるシステムビューです。

## a

正解です。pg_settingsは設定値、単位、変更コンテキスト、ソースなどを確認できるシステムビューです。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_settingsは設定値、単位、変更コンテキスト、ソースなどを確認できるシステムビューです。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_settingsは設定値、単位、変更コンテキスト、ソースなどを確認できるシステムビューです。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_settingsは設定値、単位、変更コンテキスト、ソースなどを確認できるシステムビューです。
