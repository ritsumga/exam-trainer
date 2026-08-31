---
id: ossdb-v3-053
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "pg_basebackup"
  b: "pg_dump"
  c: "pg_restore"
  d: "vacuumdb"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するための公式ユーティリティはどれか。1つ選びなさい。

# Explanation

`pg_basebackup`は稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するユーティリティです。`pg_dump`は論理バックアップ、`pg_restore`はアーカイブ形式の復元、`vacuumdb`は保守処理に使用します。

## a

正解です。`pg_basebackup`は稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するユーティリティです。`pg_dump`は論理バックアップ、`pg_restore`はアーカイブ形式の復元、`vacuumdb`は保守処理に使用します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_basebackup`は稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するユーティリティです。`pg_dump`は論理バックアップ、`pg_restore`はアーカイブ形式の復元、`vacuumdb`は保守処理に使用します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_basebackup`は稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するユーティリティです。`pg_dump`は論理バックアップ、`pg_restore`はアーカイブ形式の復元、`vacuumdb`は保守処理に使用します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_basebackup`は稼働中のPostgreSQLクラスタから物理ベースバックアップを取得するユーティリティです。`pg_dump`は論理バックアップ、`pg_restore`はアーカイブ形式の復元、`vacuumdb`は保守処理に使用します。
