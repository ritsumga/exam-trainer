---
id: ossdb-v3-064
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "analystにsales表のSELECT権限を付与する"
  b: "sales表を削除する"
  c: "analystを削除する"
  d: "全DBの管理者権限を必ず与える"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: approved
---
# Question

GRANT SELECT ON TABLE sales TO analyst; の効果はどれか。1つ選びなさい。

# Explanation

GRANTは指定したオブジェクト権限をロールに付与します。

## a

正解です。GRANTは指定したオブジェクト権限をロールに付与します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。GRANTは指定したオブジェクト権限をロールに付与します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。GRANTは指定したオブジェクト権限をロールに付与します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。GRANTは指定したオブジェクト権限をロールに付与します。
