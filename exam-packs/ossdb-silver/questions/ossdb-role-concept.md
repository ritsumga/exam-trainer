---
id: ossdb-role-concept
exam: ossdb-silver
domain: operation
type: multiple
difficulty: 2
answers: [a, c]
choices:
  a: ロールはデータベースオブジェクトを所有できる
  b: ロールは必ずOSユーザーと同じ名前でなければならない
  c: ロールは権限を持ち、その権限を他のロールへ付与できる
  d: ロールは単一データベースの内部にだけ存在する
tags: [role, privilege]
sources:
  - url: https://www.postgresql.org/docs/current/user-manag.html
verifiedAt: 2026-08-29
status: approved
---
# Question

PostgreSQLのデータベースロールについて正しい説明を2つ選んでください。

# Explanation

ロールはデータベースオブジェクトの所有者や権限の主体になり、クラスタ全体で定義されます。

## a

ロールは表などのデータベースオブジェクトを所有できます。

## b

OSユーザーとデータベースロールは別の概念で、同名は必須ではありません。

## c

ロールへ権限を与え、ロール間で権限を構成できます。

## d

ロールはデータベースクラスタ全体に共通です。
