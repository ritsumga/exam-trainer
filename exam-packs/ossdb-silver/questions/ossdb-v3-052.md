---
id: ossdb-v3-052
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "オブジェクト単位で選択して復元しやすい"
  b: "必ず物理バックアップより高速である"
  c: "WALなしで任意時点PITRが必ず可能"
  d: "クラスタ破損時でもダンプ取得済みでなく復元できる"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

論理バックアップの利点として適切なものはどれか。1つ選びなさい。

# Explanation

pg_dump等の論理バックアップは表やスキーマなど単位で扱いやすく、移行にも利用されます。

## a

正解です。pg_dump等の論理バックアップは表やスキーマなど単位で扱いやすく、移行にも利用されます。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_dump等の論理バックアップは表やスキーマなど単位で扱いやすく、移行にも利用されます。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_dump等の論理バックアップは表やスキーマなど単位で扱いやすく、移行にも利用されます。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_dump等の論理バックアップは表やスキーマなど単位で扱いやすく、移行にも利用されます。
