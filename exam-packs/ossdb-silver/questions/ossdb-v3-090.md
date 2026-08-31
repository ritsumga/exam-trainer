---
id: ossdb-v3-090
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "基本的には問い合わせ定義を保持する仮想的な表である"
  b: "必ず検索結果を物理保存する"
  c: "WALを保存する"
  d: "ロールの別名である"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

通常のVIEWについて正しい説明はどれか。1つ選びなさい。

# Explanation

通常ビューはSELECT定義を保持し、参照時に基表から結果を生成します。

## a

正解です。通常ビューはSELECT定義を保持し、参照時に基表から結果を生成します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。通常ビューはSELECT定義を保持し、参照時に基表から結果を生成します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。通常ビューはSELECT定義を保持し、参照時に基表から結果を生成します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。通常ビューはSELECT定義を保持し、参照時に基表から結果を生成します。
