---
id: ossdb-left-join
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [c]
choices:
  a: INNER JOIN
  b: CROSS JOIN
  c: LEFT OUTER JOIN
  d: NATURAL JOIN
tags: [join, select]
sources:
  - url: https://www.postgresql.org/docs/current/tutorial-join.html
verifiedAt: 2026-08-29
status: approved
---
# Question

左側の表にある行を、右側の表に一致する行がない場合も少なくとも1回は結果へ残したいとき、使用する結合はどれですか。

# Explanation

左外部結合は左側の各行を結果へ残し、右側に一致がない列には`NULL`を補います。

## a

内部結合は結合条件に一致した組だけを返します。

## b

交差結合は両表の行の直積を返します。

## c

左外部結合が左側の不一致行も保持します。

## d

自然結合は同名列を暗黙の結合条件に使う構文で、左側の全行を保持する指定ではありません。
