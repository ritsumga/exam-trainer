---
id: ossdb-mock-040
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "`INSERT INTO items(name) VALUES ('pen') RETURNING id;`"
  b: "`INSERT RETURN id INTO items(name) VALUES ('pen');`"
  c: "`SELECT id AFTER INSERT INTO items VALUES ('pen');`"
  d: "`INSERT INTO items(name) RETURN id VALUES ('pen');`"
  e: "`CREATE id FROM INSERT items('pen');`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

行を追加し、生成された`id`を同じSQLの結果として受け取りたい。最も適切なSQLを1つ選びなさい。

# Explanation

PostgreSQLの`RETURNING`句をINSERT、UPDATE、DELETEなどに付けると、処理された行の列値を返せます。

したがって正解は、**A. `INSERT INTO items(name) VALUES ('pen') RETURNING id;`**です。

- A：正しい構文です。
- B〜E：`RETURNING`句の構文ではありません。

**試験テクニック：** `INSERT ... VALUES ... RETURNING 列`の順序を固定して覚えます。

[問題へ戻る](模擬試験_問題.md#q40)

## a

正解です。PostgreSQLの`RETURNING`句をINSERT、UPDATE、DELETEなどに付けると、処理された行の列値を返せます。

したがって正解は、**A. `INSERT INTO items(name) VALUES ('pen') RETURNING id;`**です。

- A：正しい構文です。
- B〜E：`RETURNING`句の構文ではありません。

**試験テクニック：** `INSERT ... VALUES ... RETURNING 列`の順序を固定して覚えます。

[問題へ戻る](模擬試験_問題.md#q40)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLの`RETURNING`句をINSERT、UPDATE、DELETEなどに付けると、処理された行の列値を返せます。

したがって正解は、**A. `INSERT INTO items(name) VALUES ('pen') RETURNING id;`**です。

- A：正しい構文です。
- B〜E：`RETURNING`句の構文ではありません。

**試験テクニック：** `INSERT ... VALUES ... RETURNING 列`の順序を固定して覚えます。

[問題へ戻る](模擬試験_問題.md#q40)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLの`RETURNING`句をINSERT、UPDATE、DELETEなどに付けると、処理された行の列値を返せます。

したがって正解は、**A. `INSERT INTO items(name) VALUES ('pen') RETURNING id;`**です。

- A：正しい構文です。
- B〜E：`RETURNING`句の構文ではありません。

**試験テクニック：** `INSERT ... VALUES ... RETURNING 列`の順序を固定して覚えます。

[問題へ戻る](模擬試験_問題.md#q40)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLの`RETURNING`句をINSERT、UPDATE、DELETEなどに付けると、処理された行の列値を返せます。

したがって正解は、**A. `INSERT INTO items(name) VALUES ('pen') RETURNING id;`**です。

- A：正しい構文です。
- B〜E：`RETURNING`句の構文ではありません。

**試験テクニック：** `INSERT ... VALUES ... RETURNING 列`の順序を固定して覚えます。

[問題へ戻る](模擬試験_問題.md#q40)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLの`RETURNING`句をINSERT、UPDATE、DELETEなどに付けると、処理された行の列値を返せます。

したがって正解は、**A. `INSERT INTO items(name) VALUES ('pen') RETURNING id;`**です。

- A：正しい構文です。
- B〜E：`RETURNING`句の構文ではありません。

**試験テクニック：** `INSERT ... VALUES ... RETURNING 列`の順序を固定して覚えます。

[問題へ戻る](模擬試験_問題.md#q40)
