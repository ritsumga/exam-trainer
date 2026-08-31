---
id: ossdb-v3-060
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "必要に応じてVACUUMやANALYZEを自動実行する仕組み"
  b: "バックアップ専用プロセス"
  c: "SQL暗号化機能"
  d: "ユーザ作成専用機能"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

autovacuumの説明として正しいものはどれか。1つ選びなさい。

# Explanation

autovacuumは更新状況などを監視し、自動的にVACUUMやANALYZEを実行します。

## a

正解です。autovacuumは更新状況などを監視し、自動的にVACUUMやANALYZEを実行します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。autovacuumは更新状況などを監視し、自動的にVACUUMやANALYZEを実行します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。autovacuumは更新状況などを監視し、自動的にVACUUMやANALYZEを実行します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。autovacuumは更新状況などを監視し、自動的にVACUUMやANALYZEを実行します。
