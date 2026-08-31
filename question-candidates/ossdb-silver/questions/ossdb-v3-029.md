---
id: ossdb-v3-029
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "WAL制御情報をリセットする非常手段で、通常運用では安易に使わない"
  b: "毎日のバックアップに必須である"
  c: "SQLを整形するツールである"
  d: "ロール作成ツールである"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

pg_resetwalについて正しい説明はどれか。1つ選びなさい。

# Explanation

pg_resetwalはWAL関連の制御情報をリセットする復旧用ツールで、データ不整合の危険があるため最終手段です。

## a

正解です。pg_resetwalはWAL関連の制御情報をリセットする復旧用ツールで、データ不整合の危険があるため最終手段です。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_resetwalはWAL関連の制御情報をリセットする復旧用ツールで、データ不整合の危険があるため最終手段です。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_resetwalはWAL関連の制御情報をリセットする復旧用ツールで、データ不整合の危険があるため最終手段です。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。pg_resetwalはWAL関連の制御情報をリセットする復旧用ツールで、データ不整合の危険があるため最終手段です。
