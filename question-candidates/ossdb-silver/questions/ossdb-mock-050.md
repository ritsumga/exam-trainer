---
id: ossdb-mock-050
exam: ossdb-silver
domain: sql
type: multiple
difficulty: 2
answers: [a, b]
choices:
  a: "PostgreSQLの`READ UNCOMMITTED`は、実質的に`READ COMMITTED`として扱われる"
  b: "`SELECT ... FOR UPDATE`は、選択した行を更新対象としてロックする"
  c: "デッドロックが発生すると、関係する全セッションが永久に待機し続ける"
  d: "`ACCESS EXCLUSIVE`ロック中でも、他トランザクションの通常の`SELECT`は常に許可される"
  e: "`COMMIT`後も、そのトランザクションが取得した行ロックは保持される"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

トランザクションとロックに関する正しい記述を2つ選びなさい。

# Explanation

PostgreSQLでは`READ UNCOMMITTED`を指定しても`READ COMMITTED`として動作します。`SELECT ... FOR UPDATE`は選択行を更新対象としてロックし、競合する更新やロックを待機させます。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：PostgreSQLはデッドロックを検出し、関係するトランザクションの1つを中止させます。
- D：ACCESS EXCLUSIVEは通常のSELECTが取得するACCESS SHAREとも競合します。
- E：通常、トランザクション終了時にロックは解放されます。

**試験テクニック：** `FOR UPDATE=行ロック`、`ACCESS EXCLUSIVE=最強でSELECTとも競合`を押さえれば2つ選べます。

[問題へ戻る](模擬試験_問題.md#q50)

## a

正解です。PostgreSQLでは`READ UNCOMMITTED`を指定しても`READ COMMITTED`として動作します。`SELECT ... FOR UPDATE`は選択行を更新対象としてロックし、競合する更新やロックを待機させます。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：PostgreSQLはデッドロックを検出し、関係するトランザクションの1つを中止させます。
- D：ACCESS EXCLUSIVEは通常のSELECTが取得するACCESS SHAREとも競合します。
- E：通常、トランザクション終了時にロックは解放されます。

**試験テクニック：** `FOR UPDATE=行ロック`、`ACCESS EXCLUSIVE=最強でSELECTとも競合`を押さえれば2つ選べます。

[問題へ戻る](模擬試験_問題.md#q50)

## b

正解です。PostgreSQLでは`READ UNCOMMITTED`を指定しても`READ COMMITTED`として動作します。`SELECT ... FOR UPDATE`は選択行を更新対象としてロックし、競合する更新やロックを待機させます。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：PostgreSQLはデッドロックを検出し、関係するトランザクションの1つを中止させます。
- D：ACCESS EXCLUSIVEは通常のSELECTが取得するACCESS SHAREとも競合します。
- E：通常、トランザクション終了時にロックは解放されます。

**試験テクニック：** `FOR UPDATE=行ロック`、`ACCESS EXCLUSIVE=最強でSELECTとも競合`を押さえれば2つ選べます。

[問題へ戻る](模擬試験_問題.md#q50)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLでは`READ UNCOMMITTED`を指定しても`READ COMMITTED`として動作します。`SELECT ... FOR UPDATE`は選択行を更新対象としてロックし、競合する更新やロックを待機させます。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：PostgreSQLはデッドロックを検出し、関係するトランザクションの1つを中止させます。
- D：ACCESS EXCLUSIVEは通常のSELECTが取得するACCESS SHAREとも競合します。
- E：通常、トランザクション終了時にロックは解放されます。

**試験テクニック：** `FOR UPDATE=行ロック`、`ACCESS EXCLUSIVE=最強でSELECTとも競合`を押さえれば2つ選べます。

[問題へ戻る](模擬試験_問題.md#q50)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLでは`READ UNCOMMITTED`を指定しても`READ COMMITTED`として動作します。`SELECT ... FOR UPDATE`は選択行を更新対象としてロックし、競合する更新やロックを待機させます。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：PostgreSQLはデッドロックを検出し、関係するトランザクションの1つを中止させます。
- D：ACCESS EXCLUSIVEは通常のSELECTが取得するACCESS SHAREとも競合します。
- E：通常、トランザクション終了時にロックは解放されます。

**試験テクニック：** `FOR UPDATE=行ロック`、`ACCESS EXCLUSIVE=最強でSELECTとも競合`を押さえれば2つ選べます。

[問題へ戻る](模擬試験_問題.md#q50)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLでは`READ UNCOMMITTED`を指定しても`READ COMMITTED`として動作します。`SELECT ... FOR UPDATE`は選択行を更新対象としてロックし、競合する更新やロックを待機させます。

したがって正解は、**A、B**です。

- A：正しい記述です。
- B：正しい記述です。
- C：PostgreSQLはデッドロックを検出し、関係するトランザクションの1つを中止させます。
- D：ACCESS EXCLUSIVEは通常のSELECTが取得するACCESS SHAREとも競合します。
- E：通常、トランザクション終了時にロックは解放されます。

**試験テクニック：** `FOR UPDATE=行ロック`、`ACCESS EXCLUSIVE=最強でSELECTとも競合`を押さえれば2つ選べます。

[問題へ戻る](模擬試験_問題.md#q50)
