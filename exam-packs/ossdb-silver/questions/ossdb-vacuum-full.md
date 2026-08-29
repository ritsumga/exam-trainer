---
id: ossdb-vacuum-full
exam: ossdb-silver
domain: operation
type: multiple
difficulty: 3
answers: [b, d]
choices:
  a: 通常のVACUUMは対象表への排他的ロックを必ず取得する
  b: VACUUM FULLは表を書き直し、通常はより多くのディスク領域をOSへ返せる
  c: VACUUM FULLは追加ディスク領域を一切必要としない
  d: VACUUM FULLは処理中に対象表へのACCESS EXCLUSIVEロックを必要とする
tags: [vacuum, maintenance]
sources:
  - url: https://www.postgresql.org/docs/current/sql-vacuum.html
verifiedAt: 2026-08-29
status: approved
---
# Question

PostgreSQLの`VACUUM FULL`について正しい説明を2つ選んでください。

# Explanation

`VACUUM FULL`は表全体を書き直して領域を圧縮しますが、強いロックと書き直し用の領域が必要です。

## a

通常の`VACUUM`は`VACUUM FULL`ほど強い表ロックを必要としません。

## b

表を書き直して未使用領域を圧縮し、OSへ返せます。

## c

表の新しいコピーを作るため追加領域が必要です。

## d

対象表への`ACCESS EXCLUSIVE`ロックが必要です。
