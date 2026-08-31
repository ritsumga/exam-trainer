---
id: ossdb-v3-010
exam: ossdb-silver
domain: structure
type: single
difficulty: 2
answers: [a]
choices:
  a: "行を一意に識別するためのキー"
  b: "必ず文字列型でなければならない"
  c: "NULLだけで構成する必要がある"
  d: "1つの表に無制限に複数定義できる"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/
verifiedAt: 2026-08-31
status: reviewed
---
# Question

主キーの説明として正しいものはどれか。1つ選びなさい。

# Explanation

主キーは各行を一意に識別し、NULLを許しません。1表につきPRIMARY KEY制約は1つです。

## a

正解です。主キーは各行を一意に識別し、NULLを許しません。1表につきPRIMARY KEY制約は1つです。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。主キーは各行を一意に識別し、NULLを許しません。1表につきPRIMARY KEY制約は1つです。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。主キーは各行を一意に識別し、NULLを許しません。1表につきPRIMARY KEY制約は1つです。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。主キーは各行を一意に識別し、NULLを許しません。1表につきPRIMARY KEY制約は1つです。
