---
id: ossdb-mock-017
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "`GRANT SELECT ON sales TO analyst;`"
  b: "`GRANT analyst ON sales TO SELECT;`"
  c: "`ALTER TABLE sales SELECT analyst;`"
  d: "`CREATE PRIVILEGE SELECT FOR analyst ON sales;`"
  e: "`ALLOW SELECT sales BY analyst;`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: approved
---
# Question

ロール`analyst`に表`sales`を参照する権限を与えるSQLとして、最も適切なものを1つ選びなさい。

# Explanation

オブジェクト権限は`GRANT 権限 ON オブジェクト TO ロール`の順で付与します。

したがって正解は、**A. `GRANT SELECT ON sales TO analyst;`**です。

- B〜E：PostgreSQLの権限付与構文ではありません。

**試験テクニック：** `GRANT [何を] ON [何に] TO [誰へ]`と日本語の語順で暗記します。

[問題へ戻る](模擬試験_問題.md#q17)

## a

正解です。オブジェクト権限は`GRANT 権限 ON オブジェクト TO ロール`の順で付与します。

したがって正解は、**A. `GRANT SELECT ON sales TO analyst;`**です。

- B〜E：PostgreSQLの権限付与構文ではありません。

**試験テクニック：** `GRANT [何を] ON [何に] TO [誰へ]`と日本語の語順で暗記します。

[問題へ戻る](模擬試験_問題.md#q17)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。オブジェクト権限は`GRANT 権限 ON オブジェクト TO ロール`の順で付与します。

したがって正解は、**A. `GRANT SELECT ON sales TO analyst;`**です。

- B〜E：PostgreSQLの権限付与構文ではありません。

**試験テクニック：** `GRANT [何を] ON [何に] TO [誰へ]`と日本語の語順で暗記します。

[問題へ戻る](模擬試験_問題.md#q17)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。オブジェクト権限は`GRANT 権限 ON オブジェクト TO ロール`の順で付与します。

したがって正解は、**A. `GRANT SELECT ON sales TO analyst;`**です。

- B〜E：PostgreSQLの権限付与構文ではありません。

**試験テクニック：** `GRANT [何を] ON [何に] TO [誰へ]`と日本語の語順で暗記します。

[問題へ戻る](模擬試験_問題.md#q17)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。オブジェクト権限は`GRANT 権限 ON オブジェクト TO ロール`の順で付与します。

したがって正解は、**A. `GRANT SELECT ON sales TO analyst;`**です。

- B〜E：PostgreSQLの権限付与構文ではありません。

**試験テクニック：** `GRANT [何を] ON [何に] TO [誰へ]`と日本語の語順で暗記します。

[問題へ戻る](模擬試験_問題.md#q17)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。オブジェクト権限は`GRANT 権限 ON オブジェクト TO ロール`の順で付与します。

したがって正解は、**A. `GRANT SELECT ON sales TO analyst;`**です。

- B〜E：PostgreSQLの権限付与構文ではありません。

**試験テクニック：** `GRANT [何を] ON [何に] TO [誰へ]`と日本語の語順で暗記します。

[問題へ戻る](模擬試験_問題.md#q17)
