---
id: ossdb-v3-050
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "COPYはサーバ側、\\copyはpsqlクライアント側のファイルアクセスになる"
  b: "両者は完全に同じプロセス権限でファイルを読む"
  c: "\\copyはSQL標準のDDLである"
  d: "COPYはバックアップに使えない"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

COPY文とpsqlの\copyの違いとして正しいものはどれか。1つ選びなさい。

# Explanation

COPYのファイルパスはサーバプロセス側、\copyはクライアントpsql側で入出力されます。

## a

正解です。COPYのファイルパスはサーバプロセス側、\copyはクライアントpsql側で入出力されます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。COPYのファイルパスはサーバプロセス側、\copyはクライアントpsql側で入出力されます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。COPYのファイルパスはサーバプロセス側、\copyはクライアントpsql側で入出力されます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。COPYのファイルパスはサーバプロセス側、\copyはクライアントpsql側で入出力されます。
