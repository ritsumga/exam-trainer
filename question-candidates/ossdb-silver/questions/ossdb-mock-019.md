---
id: ossdb-mock-019
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "`logging_collector`を`on`にすると、標準エラーへ送られたログをログファイルへ収集できる"
  b: "`log_destination`にはログディレクトリの絶対パスだけを指定する"
  c: "`log_connections`は実行されたすべてのSQL文を記録する"
  d: "`log_line_prefix`はログファイルを削除する周期を指定する"
  e: "ログ設定はすべて`pg_hba.conf`に記述する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

ログ設定に関する記述として、最も適切なものを1つ選びなさい。

# Explanation

`logging_collector=on`にすると、標準エラーへ送られたログをログファイルへ収集できます。

したがって正解は、**A**です。

- A：正しい記述です。
- B：`log_destination`はstderr、csvlog、syslogなど出力形式・宛先の種類を指定し、ディレクトリは`log_directory`です。
- C：`log_connections`は接続の確立を記録します。SQL文は`log_statement`などで制御します。
- D：`log_line_prefix`は時刻、ユーザ、PIDなど各行の接頭情報を指定します。
- E：サーバログ設定は主に`postgresql.conf`です。

**試験テクニック：** destination、directory、filename、line_prefixの英単語をそのまま役割に対応させると混同しません。

[問題へ戻る](模擬試験_問題.md#q19)

## a

正解です。`logging_collector=on`にすると、標準エラーへ送られたログをログファイルへ収集できます。

したがって正解は、**A**です。

- A：正しい記述です。
- B：`log_destination`はstderr、csvlog、syslogなど出力形式・宛先の種類を指定し、ディレクトリは`log_directory`です。
- C：`log_connections`は接続の確立を記録します。SQL文は`log_statement`などで制御します。
- D：`log_line_prefix`は時刻、ユーザ、PIDなど各行の接頭情報を指定します。
- E：サーバログ設定は主に`postgresql.conf`です。

**試験テクニック：** destination、directory、filename、line_prefixの英単語をそのまま役割に対応させると混同しません。

[問題へ戻る](模擬試験_問題.md#q19)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。`logging_collector=on`にすると、標準エラーへ送られたログをログファイルへ収集できます。

したがって正解は、**A**です。

- A：正しい記述です。
- B：`log_destination`はstderr、csvlog、syslogなど出力形式・宛先の種類を指定し、ディレクトリは`log_directory`です。
- C：`log_connections`は接続の確立を記録します。SQL文は`log_statement`などで制御します。
- D：`log_line_prefix`は時刻、ユーザ、PIDなど各行の接頭情報を指定します。
- E：サーバログ設定は主に`postgresql.conf`です。

**試験テクニック：** destination、directory、filename、line_prefixの英単語をそのまま役割に対応させると混同しません。

[問題へ戻る](模擬試験_問題.md#q19)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。`logging_collector=on`にすると、標準エラーへ送られたログをログファイルへ収集できます。

したがって正解は、**A**です。

- A：正しい記述です。
- B：`log_destination`はstderr、csvlog、syslogなど出力形式・宛先の種類を指定し、ディレクトリは`log_directory`です。
- C：`log_connections`は接続の確立を記録します。SQL文は`log_statement`などで制御します。
- D：`log_line_prefix`は時刻、ユーザ、PIDなど各行の接頭情報を指定します。
- E：サーバログ設定は主に`postgresql.conf`です。

**試験テクニック：** destination、directory、filename、line_prefixの英単語をそのまま役割に対応させると混同しません。

[問題へ戻る](模擬試験_問題.md#q19)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`logging_collector=on`にすると、標準エラーへ送られたログをログファイルへ収集できます。

したがって正解は、**A**です。

- A：正しい記述です。
- B：`log_destination`はstderr、csvlog、syslogなど出力形式・宛先の種類を指定し、ディレクトリは`log_directory`です。
- C：`log_connections`は接続の確立を記録します。SQL文は`log_statement`などで制御します。
- D：`log_line_prefix`は時刻、ユーザ、PIDなど各行の接頭情報を指定します。
- E：サーバログ設定は主に`postgresql.conf`です。

**試験テクニック：** destination、directory、filename、line_prefixの英単語をそのまま役割に対応させると混同しません。

[問題へ戻る](模擬試験_問題.md#q19)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。`logging_collector=on`にすると、標準エラーへ送られたログをログファイルへ収集できます。

したがって正解は、**A**です。

- A：正しい記述です。
- B：`log_destination`はstderr、csvlog、syslogなど出力形式・宛先の種類を指定し、ディレクトリは`log_directory`です。
- C：`log_connections`は接続の確立を記録します。SQL文は`log_statement`などで制御します。
- D：`log_line_prefix`は時刻、ユーザ、PIDなど各行の接頭情報を指定します。
- E：サーバログ設定は主に`postgresql.conf`です。

**試験テクニック：** destination、directory、filename、line_prefixの英単語をそのまま役割に対応させると混同しません。

[問題へ戻る](模擬試験_問題.md#q19)
