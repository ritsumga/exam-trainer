---
id: ossdb-v3-049
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "recovery.signal"
  b: "recovery.confのみ"
  c: "pg_hba.signal"
  d: "backup.signal"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: approved
---
# Question

PostgreSQL 12以降でアーカイブリカバリを開始させるために使用されるファイルはどれか。1つ選びなさい。

# Explanation

PostgreSQL 12以降ではrecovery.signalを作成し、関連パラメータはpostgresql.conf等に設定します。

## a

正解です。PostgreSQL 12以降ではrecovery.signalを作成し、関連パラメータはpostgresql.conf等に設定します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQL 12以降ではrecovery.signalを作成し、関連パラメータはpostgresql.conf等に設定します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQL 12以降ではrecovery.signalを作成し、関連パラメータはpostgresql.conf等に設定します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQL 12以降ではrecovery.signalを作成し、関連パラメータはpostgresql.conf等に設定します。
