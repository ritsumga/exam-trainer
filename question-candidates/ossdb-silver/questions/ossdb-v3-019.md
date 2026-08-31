---
id: ossdb-v3-019
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "通常、新規データベース作成時のテンプレートとして使用される"
  b: "WAL専用のデータベースである"
  c: "削除対象の一時DBである"
  d: "必ず空で変更不可能である"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/app-initdb.html
  - url: https://www.postgresql.org/docs/current/manage-ag-overview.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

template1について正しい説明はどれか。1つ選びなさい。

# Explanation

CREATE DATABASEは通常template1を複製して新しいデータベースを作ります。

## a

正解です。CREATE DATABASEは通常template1を複製して新しいデータベースを作ります。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。CREATE DATABASEは通常template1を複製して新しいデータベースを作ります。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。CREATE DATABASEは通常template1を複製して新しいデータベースを作ります。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。CREATE DATABASEは通常template1を複製して新しいデータベースを作ります。
