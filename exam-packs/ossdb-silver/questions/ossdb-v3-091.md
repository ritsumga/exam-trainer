---
id: ossdb-v3-091
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "問い合わせ結果を物理的に保持し、必要に応じてREFRESHする"
  b: "結果は一切保存しない"
  c: "ロールを格納する"
  d: "WALの別名である"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

MATERIALIZED VIEWの特徴はどれか。1つ選びなさい。

# Explanation

マテリアライズドビューは問い合わせ結果を保存し、REFRESH MATERIALIZED VIEWで更新できます。

## a

正解です。マテリアライズドビューは問い合わせ結果を保存し、REFRESH MATERIALIZED VIEWで更新できます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。マテリアライズドビューは問い合わせ結果を保存し、REFRESH MATERIALIZED VIEWで更新できます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。マテリアライズドビューは問い合わせ結果を保存し、REFRESH MATERIALIZED VIEWで更新できます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。マテリアライズドビューは問い合わせ結果を保存し、REFRESH MATERIALIZED VIEWで更新できます。
