---
id: ossdb-foreign-key
exam: ossdb-silver
domain: structure
type: single
difficulty: 3
answers: [a]
choices:
  a: 参照する列の値が、参照先の主キーまたは一意制約に存在することを要求できる
  b: 参照元の列へ一意制約を必ず自動作成する
  c: 参照元と参照先の表を常に同じ表に限定する
  d: NULL値をすべて自動的に0へ変換する
tags: [constraint, foreign-key]
sources:
  - url: https://www.postgresql.org/docs/current/ddl-constraints.html
verifiedAt: 2026-08-29
status: approved
---
# Question

PostgreSQLの外部キー制約の基本的な役割として正しいものはどれですか。

# Explanation

外部キーは参照列の値が参照先に存在することを要求し、表間の参照整合性を保ちます。

## a

参照先の主キーまたは一意な列との対応を検証します。

## b

参照元列を一意にする制約ではありません。

## c

異なる表間にも同じ表内にも定義できます。

## d

値を別の値へ変換する機能ではありません。
