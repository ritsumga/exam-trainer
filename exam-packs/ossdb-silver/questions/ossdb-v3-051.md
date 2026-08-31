---
id: ossdb-v3-051
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "クラスタ全体として整合した状態を確保する必要がある"
  b: "任意の1ファイルだけコピーすれば常に完全復元できる"
  c: "WALは一切関係しない"
  d: "サーバ状態は考慮不要である"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

ファイルシステムレベルの物理バックアップで重要な注意点はどれか。1つ選びなさい。

# Explanation

物理バックアップはクラスタ内ファイルの整合性が必要で、停止バックアップやオンラインバックアップの正しい手順が必要です。

## a

正解です。物理バックアップはクラスタ内ファイルの整合性が必要で、停止バックアップやオンラインバックアップの正しい手順が必要です。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。物理バックアップはクラスタ内ファイルの整合性が必要で、停止バックアップやオンラインバックアップの正しい手順が必要です。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。物理バックアップはクラスタ内ファイルの整合性が必要で、停止バックアップやオンラインバックアップの正しい手順が必要です。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。物理バックアップはクラスタ内ファイルの整合性が必要で、停止バックアップやオンラインバックアップの正しい手順が必要です。
