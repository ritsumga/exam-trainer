---
id: ossdb-v3-058
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "不要になった行バージョンを再利用可能にし、可視性情報などを保守する"
  b: "全テーブルを削除する"
  c: "全SQLをロールバックする"
  d: "OSファイルを圧縮するだけ"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: approved
---
# Question

VACUUMの主な目的として適切なものはどれか。1つ選びなさい。

# Explanation

MVCCで生じる不要な行バージョンを処理し、領域再利用やトランザクションID周回対策等に寄与します。

## a

正解です。MVCCで生じる不要な行バージョンを処理し、領域再利用やトランザクションID周回対策等に寄与します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。MVCCで生じる不要な行バージョンを処理し、領域再利用やトランザクションID周回対策等に寄与します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。MVCCで生じる不要な行バージョンを処理し、領域再利用やトランザクションID周回対策等に寄与します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。MVCCで生じる不要な行バージョンを処理し、領域再利用やトランザクションID周回対策等に寄与します。
