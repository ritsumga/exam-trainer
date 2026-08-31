---
id: ossdb-v3-066
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "停止方法にはsmart/fast/immediateなどがあり、動作が異なる"
  b: "停止方法は1種類しかない"
  c: "必ずOSを再起動する"
  d: "SQLのDELETEと同じ動作である"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

pg_ctl stopで指定できる停止モードに関する説明として最も適切なものはどれか。1つ選びなさい。

# Explanation

pg_ctl stopではsmart、fast、immediateなどのシャットダウンモードを選択でき、接続や回復への影響が異なります。

## a

正解です。pg_ctl stopではsmart、fast、immediateなどのシャットダウンモードを選択でき、接続や回復への影響が異なります。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_ctl stopではsmart、fast、immediateなどのシャットダウンモードを選択でき、接続や回復への影響が異なります。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_ctl stopではsmart、fast、immediateなどのシャットダウンモードを選択でき、接続や回復への影響が異なります。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_ctl stopではsmart、fast、immediateなどのシャットダウンモードを選択でき、接続や回復への影響が異なります。
