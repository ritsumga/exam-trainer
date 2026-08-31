---
id: ossdb-v3-047
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "変更内容をログとして先行記録し、障害回復などに利用する"
  b: "ユーザのパスワードを保存するだけ"
  c: "SQLをHTMLへ変換する"
  d: "ビュー定義だけを保存する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

WALの主な役割はどれか。1つ選びなさい。

# Explanation

WAL（Write-Ahead Logging）は変更内容をデータファイルより先にログへ記録し、クラッシュリカバリやPITR等で使用されます。

## a

正解です。WAL（Write-Ahead Logging）は変更内容をデータファイルより先にログへ記録し、クラッシュリカバリやPITR等で使用されます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。WAL（Write-Ahead Logging）は変更内容をデータファイルより先にログへ記録し、クラッシュリカバリやPITR等で使用されます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。WAL（Write-Ahead Logging）は変更内容をデータファイルより先にログへ記録し、クラッシュリカバリやPITR等で使用されます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。WAL（Write-Ahead Logging）は変更内容をデータファイルより先にログへ記録し、クラッシュリカバリやPITR等で使用されます。
