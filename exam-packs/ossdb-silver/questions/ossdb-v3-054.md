---
id: ossdb-v3-054
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "取得したバックアップが実際に復元可能か確認するため"
  b: "バックアップ容量を必ず0にするため"
  c: "SQL権限を無効化するため"
  d: "DB名を自動変更するため"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

バックアップからの復旧試験を定期的に行う主な理由はどれか。1つ選びなさい。

# Explanation

バックアップは取得だけでなく復元可能性の検証が重要です。手順、所要時間、必要WALなども確認します。

## a

正解です。バックアップは取得だけでなく復元可能性の検証が重要です。手順、所要時間、必要WALなども確認します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。バックアップは取得だけでなく復元可能性の検証が重要です。手順、所要時間、必要WALなども確認します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。バックアップは取得だけでなく復元可能性の検証が重要です。手順、所要時間、必要WALなども確認します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。バックアップは取得だけでなく復元可能性の検証が重要です。手順、所要時間、必要WALなども確認します。
