---
id: ossdb-v3-048
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "完了したWALセグメントを別領域へ保存し、PITR等に利用する"
  b: "不要テーブルを自動削除する"
  c: "ユーザを自動作成する"
  d: "インデックスを必ず再構築する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

WALアーカイブの目的として適切なものはどれか。1つ選びなさい。

# Explanation

WALアーカイブは過去のWALを保管し、継続的アーカイブやPITRに使います。

## a

正解です。WALアーカイブは過去のWALを保管し、継続的アーカイブやPITRに使います。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。WALアーカイブは過去のWALを保管し、継続的アーカイブやPITRに使います。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。WALアーカイブは過去のWALを保管し、継続的アーカイブやPITRに使います。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。WALアーカイブは過去のWALを保管し、継続的アーカイブやPITRに使います。
