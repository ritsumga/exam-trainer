---
id: ossdb-mock-036
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [c]
choices:
  a: "`deleted_at = NULL`"
  b: "`deleted_at <> NULL`"
  c: "`deleted_at IS NULL`"
  d: "`deleted_at == NULL`"
  e: "`NULL(deleted_at)`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: approved
---
# Question

列`deleted_at`がNULLである行だけを検索する条件として、最も適切なものを1つ選びなさい。

# Explanation

NULLは未知を表すため、通常の比較演算子`=`では判定できません。NULLかどうかは`IS NULL`、NULLでないことは`IS NOT NULL`で判定します。

したがって正解は、**C. `deleted_at IS NULL`**です。

- A、B：NULLとの通常比較は真にならず、期待する抽出になりません。
- C：正しい条件です。
- D：SQLの等価比較演算子ではありません。
- E：そのようなNULL判定構文ではありません。

**試験テクニック：** 選択肢に`= NULL`が見えたら、ほぼ反射的に消せます。

[問題へ戻る](模擬試験_問題.md#q36)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。NULLは未知を表すため、通常の比較演算子`=`では判定できません。NULLかどうかは`IS NULL`、NULLでないことは`IS NOT NULL`で判定します。

したがって正解は、**C. `deleted_at IS NULL`**です。

- A、B：NULLとの通常比較は真にならず、期待する抽出になりません。
- C：正しい条件です。
- D：SQLの等価比較演算子ではありません。
- E：そのようなNULL判定構文ではありません。

**試験テクニック：** 選択肢に`= NULL`が見えたら、ほぼ反射的に消せます。

[問題へ戻る](模擬試験_問題.md#q36)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。NULLは未知を表すため、通常の比較演算子`=`では判定できません。NULLかどうかは`IS NULL`、NULLでないことは`IS NOT NULL`で判定します。

したがって正解は、**C. `deleted_at IS NULL`**です。

- A、B：NULLとの通常比較は真にならず、期待する抽出になりません。
- C：正しい条件です。
- D：SQLの等価比較演算子ではありません。
- E：そのようなNULL判定構文ではありません。

**試験テクニック：** 選択肢に`= NULL`が見えたら、ほぼ反射的に消せます。

[問題へ戻る](模擬試験_問題.md#q36)

## c

正解です。NULLは未知を表すため、通常の比較演算子`=`では判定できません。NULLかどうかは`IS NULL`、NULLでないことは`IS NOT NULL`で判定します。

したがって正解は、**C. `deleted_at IS NULL`**です。

- A、B：NULLとの通常比較は真にならず、期待する抽出になりません。
- C：正しい条件です。
- D：SQLの等価比較演算子ではありません。
- E：そのようなNULL判定構文ではありません。

**試験テクニック：** 選択肢に`= NULL`が見えたら、ほぼ反射的に消せます。

[問題へ戻る](模擬試験_問題.md#q36)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。NULLは未知を表すため、通常の比較演算子`=`では判定できません。NULLかどうかは`IS NULL`、NULLでないことは`IS NOT NULL`で判定します。

したがって正解は、**C. `deleted_at IS NULL`**です。

- A、B：NULLとの通常比較は真にならず、期待する抽出になりません。
- C：正しい条件です。
- D：SQLの等価比較演算子ではありません。
- E：そのようなNULL判定構文ではありません。

**試験テクニック：** 選択肢に`= NULL`が見えたら、ほぼ反射的に消せます。

[問題へ戻る](模擬試験_問題.md#q36)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。NULLは未知を表すため、通常の比較演算子`=`では判定できません。NULLかどうかは`IS NULL`、NULLでないことは`IS NOT NULL`で判定します。

したがって正解は、**C. `deleted_at IS NULL`**です。

- A、B：NULLとの通常比較は真にならず、期待する抽出になりません。
- C：正しい条件です。
- D：SQLの等価比較演算子ではありません。
- E：そのようなNULL判定構文ではありません。

**試験テクニック：** 選択肢に`= NULL`が見えたら、ほぼ反射的に消せます。

[問題へ戻る](模擬試験_問題.md#q36)
