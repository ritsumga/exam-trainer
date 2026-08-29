---
id: ossdb-index-tradeoff
exam: ossdb-silver
domain: structure
type: multiple
difficulty: 2
answers: [a, d]
choices:
  a: 条件に合う行を表全体の走査より速く見つけられる場合がある
  b: 作成すればすべての問い合わせが必ず高速になる
  c: データベース全体のオーバーヘッドを減らすだけで増やさない
  d: 追加のオーバーヘッドがあるため用途を考えて作成する
tags: [index, performance]
sources:
  - url: https://www.postgresql.org/docs/current/indexes.html
verifiedAt: 2026-08-29
status: approved
---
# Question

PostgreSQLのインデックスについて正しい説明を2つ選んでください。

# Explanation

インデックスは特定行の検索を高速化できる一方、システムへ追加の負担を持ちます。

## a

検索条件とインデックスが適合すれば、対象行を効率よく探せます。

## b

利用されない問い合わせもあり、すべてが必ず高速になるわけではありません。

## c

インデックスの維持や保存にはオーバーヘッドがあります。

## d

利点と維持費用を考慮して適切に使う必要があります。
