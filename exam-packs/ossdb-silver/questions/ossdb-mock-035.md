---
id: ossdb-mock-035
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [b]
choices:
  a: "`3, 3`"
  b: "`3, 2`"
  c: "`2, 3`"
  d: "`2, 2`"
  e: "エラーになる"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: approved
---
# Question

次の表`t`に対してSQLを実行した結果として、最も適切なものを1つ選びなさい。

```text
 id | score
----+-------
  1 |    80
  2 |  NULL
  3 |    60
```

```sql
SELECT count(*), count(score) FROM t;
```

# Explanation

`count(*)`はNULLを含めて行数を数え、`count(列)`はその列がNULLでない行だけを数えます。全3行のうちscoreが非NULLなのは2行です。

したがって正解は、**B. `3, 2`**です。

- A：`count(score)`はNULL行を数えません。
- B：正しい結果です。
- C、D：`count(*)`は3です。
- E：NULLを含んでもエラーにはなりません。

**試験テクニック：** `count(*)=行`、`count(列)=非NULL`を式の横に書くだけで解けます。

[問題へ戻る](模擬試験_問題.md#q35)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。`count(*)`はNULLを含めて行数を数え、`count(列)`はその列がNULLでない行だけを数えます。全3行のうちscoreが非NULLなのは2行です。

したがって正解は、**B. `3, 2`**です。

- A：`count(score)`はNULL行を数えません。
- B：正しい結果です。
- C、D：`count(*)`は3です。
- E：NULLを含んでもエラーにはなりません。

**試験テクニック：** `count(*)=行`、`count(列)=非NULL`を式の横に書くだけで解けます。

[問題へ戻る](模擬試験_問題.md#q35)

## b

正解です。`count(*)`はNULLを含めて行数を数え、`count(列)`はその列がNULLでない行だけを数えます。全3行のうちscoreが非NULLなのは2行です。

したがって正解は、**B. `3, 2`**です。

- A：`count(score)`はNULL行を数えません。
- B：正しい結果です。
- C、D：`count(*)`は3です。
- E：NULLを含んでもエラーにはなりません。

**試験テクニック：** `count(*)=行`、`count(列)=非NULL`を式の横に書くだけで解けます。

[問題へ戻る](模擬試験_問題.md#q35)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。`count(*)`はNULLを含めて行数を数え、`count(列)`はその列がNULLでない行だけを数えます。全3行のうちscoreが非NULLなのは2行です。

したがって正解は、**B. `3, 2`**です。

- A：`count(score)`はNULL行を数えません。
- B：正しい結果です。
- C、D：`count(*)`は3です。
- E：NULLを含んでもエラーにはなりません。

**試験テクニック：** `count(*)=行`、`count(列)=非NULL`を式の横に書くだけで解けます。

[問題へ戻る](模擬試験_問題.md#q35)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`count(*)`はNULLを含めて行数を数え、`count(列)`はその列がNULLでない行だけを数えます。全3行のうちscoreが非NULLなのは2行です。

したがって正解は、**B. `3, 2`**です。

- A：`count(score)`はNULL行を数えません。
- B：正しい結果です。
- C、D：`count(*)`は3です。
- E：NULLを含んでもエラーにはなりません。

**試験テクニック：** `count(*)=行`、`count(列)=非NULL`を式の横に書くだけで解けます。

[問題へ戻る](模擬試験_問題.md#q35)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。`count(*)`はNULLを含めて行数を数え、`count(列)`はその列がNULLでない行だけを数えます。全3行のうちscoreが非NULLなのは2行です。

したがって正解は、**B. `3, 2`**です。

- A：`count(score)`はNULL行を数えません。
- B：正しい結果です。
- C、D：`count(*)`は3です。
- E：NULLを含んでもエラーにはなりません。

**試験テクニック：** `count(*)=行`、`count(列)=非NULL`を式の横に書くだけで解けます。

[問題へ戻る](模擬試験_問題.md#q35)
