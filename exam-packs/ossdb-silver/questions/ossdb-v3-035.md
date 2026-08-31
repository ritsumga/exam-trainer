---
id: ossdb-v3-035
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "現在のセッションで設定値を変更する"
  b: "全クラスタを初期化する"
  c: "OSの物理メモリを64MBに制限する"
  d: "設定ファイルを必ず直接書き換える"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: approved
---
# Question

SET work_mem = '64MB'; の一般的な効果はどれか。1つ選びなさい。

# Explanation

SETは通常セッション単位でパラメータを変更します。パラメータのコンテキストにより制約があります。

## a

正解です。SETは通常セッション単位でパラメータを変更します。パラメータのコンテキストにより制約があります。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。SETは通常セッション単位でパラメータを変更します。パラメータのコンテキストにより制約があります。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。SETは通常セッション単位でパラメータを変更します。パラメータのコンテキストにより制約があります。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。SETは通常セッション単位でパラメータを変更します。パラメータのコンテキストにより制約があります。
