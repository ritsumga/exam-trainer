---
id: ossdb-v3-056
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "ログイン可能なロールを作成する"
  b: "データベースを作成する"
  c: "表を作成する"
  d: "WALを作成する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

CREATE USER user1 PASSWORD 'x'; の説明として適切なものはどれか。1つ選びなさい。

# Explanation

PostgreSQLではユーザはロールとして管理され、CREATE USERはLOGIN属性付きロールを作成します。

## a

正解です。PostgreSQLではユーザはロールとして管理され、CREATE USERはLOGIN属性付きロールを作成します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLではユーザはロールとして管理され、CREATE USERはLOGIN属性付きロールを作成します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLではユーザはロールとして管理され、CREATE USERはLOGIN属性付きロールを作成します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLではユーザはロールとして管理され、CREATE USERはLOGIN属性付きロールを作成します。
