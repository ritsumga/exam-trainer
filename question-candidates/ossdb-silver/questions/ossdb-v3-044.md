---
id: ossdb-v3-044
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "psqlでSQLファイルを実行する"
  b: "pg_resetwalを実行する"
  c: "initdbを実行する"
  d: "VACUUMだけを実行する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/app-initdb.html
  - url: https://www.postgresql.org/docs/current/manage-ag-overview.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

pg_dumpで生成したプレーンSQL形式のダンプを復元する代表的な方法はどれか。1つ選びなさい。

# Explanation

プレーン形式はSQL文なので、通常psqlで対象DBへ読み込みます。

## a

正解です。プレーン形式はSQL文なので、通常psqlで対象DBへ読み込みます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。プレーン形式はSQL文なので、通常psqlで対象DBへ読み込みます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。プレーン形式はSQL文なので、通常psqlで対象DBへ読み込みます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。プレーン形式はSQL文なので、通常psqlで対象DBへ読み込みます。
