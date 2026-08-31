---
id: ossdb-v3-028
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "クラスタ制御情報"
  b: "SQL文の実行計画"
  c: "全ユーザの平文パスワード"
  d: "テーブルのCSV内容"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: approved
---
# Question

pg_controldataが表示する情報として最も適切なものはどれか。1つ選びなさい。

# Explanation

pg_controldataはクラスタ状態やチェックポイントなど、制御ファイル由来の情報を表示します。

## a

正解です。pg_controldataはクラスタ状態やチェックポイントなど、制御ファイル由来の情報を表示します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_controldataはクラスタ状態やチェックポイントなど、制御ファイル由来の情報を表示します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_controldataはクラスタ状態やチェックポイントなど、制御ファイル由来の情報を表示します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_controldataはクラスタ状態やチェックポイントなど、制御ファイル由来の情報を表示します。
