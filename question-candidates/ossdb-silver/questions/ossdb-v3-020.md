---
id: ossdb-v3-020
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "標準状態に近いクリーンなテンプレートからDBを作る際に利用できる"
  b: "常にアプリケーションから接続して更新する"
  c: "WALを保存する"
  d: "ユーザー認証だけを行う"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/app-initdb.html
  - url: https://www.postgresql.org/docs/current/manage-ag-overview.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

template0の用途として適切なものはどれか。1つ選びなさい。

# Explanation

template0は原則として変更せず、template1の変更を引き継ぎたくないDB作成などに利用します。

## a

正解です。template0は原則として変更せず、template1の変更を引き継ぎたくないDB作成などに利用します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。template0は原則として変更せず、template1の変更を引き継ぎたくないDB作成などに利用します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。template0は原則として変更せず、template1の変更を引き継ぎたくないDB作成などに利用します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。template0は原則として変更せず、template1の変更を引き継ぎたくないDB作成などに利用します。
