---
id: ossdb-mock-031
exam: ossdb-silver
domain: operation
type: multiple
difficulty: 2
answers: [a, b]
choices:
  a: "PostgreSQLサーバの稼働中に動作する"
  b: "更新量などがしきい値を超えた表を対象に、VACUUMやANALYZEを自動実行する"
  c: "必ずデータベースクラスタ全体を停止してから動作する"
  d: "`VACUUM FULL`を定期的に自動実行する"
  e: "無効にしてもトランザクションID周回への対策は一切不要である"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/routine-vacuuming.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

自動バキューム（autovacuum）に関する正しい記述を2つ選びなさい。

# Explanation

autovacuumはサーバ稼働中にワーカープロセスが動作し、更新・削除などの量がしきい値を超えた表へVACUUMやANALYZEを行います。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：稼働中に動作します。
- D：通常のVACUUMであり、VACUUM FULLではありません。
- E：トランザクションID周回防止は重要で、無効化時も手動対策が必要です。

**試験テクニック：** autovacuumに「停止必須」「FULLを自動」の語が出たら除外できます。

[問題へ戻る](模擬試験_問題.md#q31)

## a

正解です。autovacuumはサーバ稼働中にワーカープロセスが動作し、更新・削除などの量がしきい値を超えた表へVACUUMやANALYZEを行います。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：稼働中に動作します。
- D：通常のVACUUMであり、VACUUM FULLではありません。
- E：トランザクションID周回防止は重要で、無効化時も手動対策が必要です。

**試験テクニック：** autovacuumに「停止必須」「FULLを自動」の語が出たら除外できます。

[問題へ戻る](模擬試験_問題.md#q31)

## b

正解です。autovacuumはサーバ稼働中にワーカープロセスが動作し、更新・削除などの量がしきい値を超えた表へVACUUMやANALYZEを行います。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：稼働中に動作します。
- D：通常のVACUUMであり、VACUUM FULLではありません。
- E：トランザクションID周回防止は重要で、無効化時も手動対策が必要です。

**試験テクニック：** autovacuumに「停止必須」「FULLを自動」の語が出たら除外できます。

[問題へ戻る](模擬試験_問題.md#q31)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。autovacuumはサーバ稼働中にワーカープロセスが動作し、更新・削除などの量がしきい値を超えた表へVACUUMやANALYZEを行います。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：稼働中に動作します。
- D：通常のVACUUMであり、VACUUM FULLではありません。
- E：トランザクションID周回防止は重要で、無効化時も手動対策が必要です。

**試験テクニック：** autovacuumに「停止必須」「FULLを自動」の語が出たら除外できます。

[問題へ戻る](模擬試験_問題.md#q31)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。autovacuumはサーバ稼働中にワーカープロセスが動作し、更新・削除などの量がしきい値を超えた表へVACUUMやANALYZEを行います。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：稼働中に動作します。
- D：通常のVACUUMであり、VACUUM FULLではありません。
- E：トランザクションID周回防止は重要で、無効化時も手動対策が必要です。

**試験テクニック：** autovacuumに「停止必須」「FULLを自動」の語が出たら除外できます。

[問題へ戻る](模擬試験_問題.md#q31)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。autovacuumはサーバ稼働中にワーカープロセスが動作し、更新・削除などの量がしきい値を超えた表へVACUUMやANALYZEを行います。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：稼働中に動作します。
- D：通常のVACUUMであり、VACUUM FULLではありません。
- E：トランザクションID周回防止は重要で、無効化時も手動対策が必要です。

**試験テクニック：** autovacuumに「停止必須」「FULLを自動」の語が出たら除外できます。

[問題へ戻る](模擬試験_問題.md#q31)
