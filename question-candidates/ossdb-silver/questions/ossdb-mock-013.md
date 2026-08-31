---
id: ossdb-mock-013
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [b]
choices:
  a: "`pg_config`"
  b: "`pg_isready`"
  c: "`pg_controldata`"
  d: "`reindexdb`"
  e: "`vacuumdb`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

PostgreSQLサーバが接続要求を受け付けられる状態か確認したい。最も適切なコマンドを1つ選びなさい。

# Explanation

`pg_isready`は、PostgreSQLサーバの接続状態を確認するためのユーティリティです。

したがって正解は、**B. `pg_isready`**です。

- A：ビルド時の設定値などを表示します。
- C：クラスタの制御情報を表示します。
- D：インデックスを再構築します。
- E：VACUUMやANALYZEを実行します。

**試験テクニック：** `is ready?`と読めば用途をそのまま推測できます。

[問題へ戻る](模擬試験_問題.md#q13)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_isready`は、PostgreSQLサーバの接続状態を確認するためのユーティリティです。

したがって正解は、**B. `pg_isready`**です。

- A：ビルド時の設定値などを表示します。
- C：クラスタの制御情報を表示します。
- D：インデックスを再構築します。
- E：VACUUMやANALYZEを実行します。

**試験テクニック：** `is ready?`と読めば用途をそのまま推測できます。

[問題へ戻る](模擬試験_問題.md#q13)

## b

正解です。`pg_isready`は、PostgreSQLサーバの接続状態を確認するためのユーティリティです。

したがって正解は、**B. `pg_isready`**です。

- A：ビルド時の設定値などを表示します。
- C：クラスタの制御情報を表示します。
- D：インデックスを再構築します。
- E：VACUUMやANALYZEを実行します。

**試験テクニック：** `is ready?`と読めば用途をそのまま推測できます。

[問題へ戻る](模擬試験_問題.md#q13)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_isready`は、PostgreSQLサーバの接続状態を確認するためのユーティリティです。

したがって正解は、**B. `pg_isready`**です。

- A：ビルド時の設定値などを表示します。
- C：クラスタの制御情報を表示します。
- D：インデックスを再構築します。
- E：VACUUMやANALYZEを実行します。

**試験テクニック：** `is ready?`と読めば用途をそのまま推測できます。

[問題へ戻る](模擬試験_問題.md#q13)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_isready`は、PostgreSQLサーバの接続状態を確認するためのユーティリティです。

したがって正解は、**B. `pg_isready`**です。

- A：ビルド時の設定値などを表示します。
- C：クラスタの制御情報を表示します。
- D：インデックスを再構築します。
- E：VACUUMやANALYZEを実行します。

**試験テクニック：** `is ready?`と読めば用途をそのまま推測できます。

[問題へ戻る](模擬試験_問題.md#q13)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_isready`は、PostgreSQLサーバの接続状態を確認するためのユーティリティです。

したがって正解は、**B. `pg_isready`**です。

- A：ビルド時の設定値などを表示します。
- C：クラスタの制御情報を表示します。
- D：インデックスを再構築します。
- E：VACUUMやANALYZEを実行します。

**試験テクニック：** `is ready?`と読めば用途をそのまま推測できます。

[問題へ戻る](模擬試験_問題.md#q13)
