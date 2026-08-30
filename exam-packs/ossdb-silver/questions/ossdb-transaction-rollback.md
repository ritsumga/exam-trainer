---
id: ossdb-transaction-rollback
exam: ossdb-silver
domain: sql
type: single
difficulty: 1
answers: [d]
choices:
  a: BEGIN
  b: COMMIT
  c: SAVEPOINT
  d: ROLLBACK
tags: [transaction]
sources:
  - url: https://www.postgresql.org/docs/current/tutorial-transactions.html
verifiedAt: 2026-08-30
status: approved
---
# Question

PostgreSQLのトランザクションブロックで、それまでの変更を確定せずに取り消して終了するコマンドはどれですか。

# Explanation

`ROLLBACK`はトランザクション中の変更を取り消します。

## a

`BEGIN`はトランザクションブロックを開始します。

## b

`COMMIT`は変更を確定します。

## c

`SAVEPOINT`は部分的な巻き戻し位置を作ります。

## d

`ROLLBACK`が未確定の変更を取り消してトランザクションを終了します。
