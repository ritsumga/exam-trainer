---
id: ossdb-v3-067
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "テーブルを書き換えて領域を縮小できる一方、強いロック等の影響が大きい"
  b: "常にロックを一切取得しない"
  c: "統計情報だけを更新する"
  d: "WALを無効化する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

VACUUM FULLについて通常のVACUUMと比べた特徴として適切なものはどれか。1つ選びなさい。

# Explanation

VACUUM FULLはテーブルを新しいファイルへ書き換えるため空き領域をOSへ返しやすい一方、排他性や負荷が高くなります。

## a

正解です。VACUUM FULLはテーブルを新しいファイルへ書き換えるため空き領域をOSへ返しやすい一方、排他性や負荷が高くなります。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。VACUUM FULLはテーブルを新しいファイルへ書き換えるため空き領域をOSへ返しやすい一方、排他性や負荷が高くなります。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。VACUUM FULLはテーブルを新しいファイルへ書き換えるため空き領域をOSへ返しやすい一方、排他性や負荷が高くなります。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。VACUUM FULLはテーブルを新しいファイルへ書き換えるため空き領域をOSへ返しやすい一方、排他性や負荷が高くなります。
