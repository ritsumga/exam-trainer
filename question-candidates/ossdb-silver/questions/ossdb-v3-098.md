---
id: ossdb-v3-098
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "current_timestamp"
  b: "clock_timestamp()だけ"
  c: "count()"
  d: "substring()"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

トランザクション開始時刻に基づく現在時刻を返す代表的な関数はどれか。1つ選びなさい。

# Explanation

current_timestamp（now()と同等）は現在のトランザクション開始時刻を基準とします。clock_timestamp()は実際の時計時刻を返します。

## a

正解です。current_timestamp（now()と同等）は現在のトランザクション開始時刻を基準とします。clock_timestamp()は実際の時計時刻を返します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。current_timestamp（now()と同等）は現在のトランザクション開始時刻を基準とします。clock_timestamp()は実際の時計時刻を返します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。current_timestamp（now()と同等）は現在のトランザクション開始時刻を基準とします。clock_timestamp()は実際の時計時刻を返します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。current_timestamp（now()と同等）は現在のトランザクション開始時刻を基準とします。clock_timestamp()は実際の時計時刻を返します。
