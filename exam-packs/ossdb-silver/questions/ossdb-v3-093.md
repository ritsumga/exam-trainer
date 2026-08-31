---
id: ossdb-v3-093
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "WALを転送・適用してスタンバイを追随させる物理レプリケーションの仕組み"
  b: "SQLの結果をCSVにするだけ"
  c: "必ず表単位の論理変更だけを転送する"
  d: "バックアップを一切必要としない"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

ストリーミングレプリケーションの説明として適切なものはどれか。1つ選びなさい。

# Explanation

PostgreSQLのストリーミングレプリケーションはWALレコードをストリーム転送し、スタンバイに適用します。

## a

正解です。PostgreSQLのストリーミングレプリケーションはWALレコードをストリーム転送し、スタンバイに適用します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLのストリーミングレプリケーションはWALレコードをストリーム転送し、スタンバイに適用します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLのストリーミングレプリケーションはWALレコードをストリーム転送し、スタンバイに適用します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLのストリーミングレプリケーションはWALレコードをストリーム転送し、スタンバイに適用します。
