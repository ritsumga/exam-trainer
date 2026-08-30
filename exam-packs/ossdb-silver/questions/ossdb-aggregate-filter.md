---
id: ossdb-aggregate-filter
exam: ossdb-silver
domain: sql
type: multiple
difficulty: 3
answers: [a, c]
choices:
  a: WHEREはグループ化と集約の前に入力行を絞り込む
  b: WHEREへ集約関数を直接記述して集約結果を絞り込む
  c: HAVINGはグループ化と集約の後にグループを絞り込む
  d: HAVINGは必ずGROUP BYより前に記述する
tags: [aggregate, group-by]
sources:
  - url: https://www.postgresql.org/docs/current/tutorial-agg.html
verifiedAt: 2026-08-30
status: approved
---
# Question

PostgreSQLの集約問い合わせにおける`WHERE`と`HAVING`について、正しい説明を2つ選んでください。

# Explanation

`WHERE`は集約へ入る行を先に選び、`HAVING`は集約後のグループを選びます。

## a

`WHERE`はグループ化・集約より先に評価される入力行の条件です。

## b

同じ問い合わせ階層の`WHERE`で集約関数を直接条件にすることはできません。

## c

`HAVING`は生成されたグループを集約結果などで絞り込めます。

## d

SQLの記述順では`HAVING`は`GROUP BY`の後です。
