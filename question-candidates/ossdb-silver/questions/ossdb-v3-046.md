---
id: ossdb-v3-046
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "ベースバックアップと必要なWAL"
  b: "pg_hba.confだけ"
  c: "SQLビューだけ"
  d: "一時テーブルだけ"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

PITRで必要になるものの組み合わせとして最も適切なものはどれか。1つ選びなさい。

# Explanation

PITRではベースバックアップを復元し、その後のWALを再生して目標時点まで進めます。

## a

正解です。PITRではベースバックアップを復元し、その後のWALを再生して目標時点まで進めます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PITRではベースバックアップを復元し、その後のWALを再生して目標時点まで進めます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PITRではベースバックアップを復元し、その後のWALを再生して目標時点まで進めます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PITRではベースバックアップを復元し、その後のWALを再生して目標時点まで進めます。
