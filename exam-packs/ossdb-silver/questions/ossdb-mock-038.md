---
id: ossdb-mock-038
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [b]
choices:
  a: "`SELECT dept, avg(salary) FROM emp WHERE avg(salary) >= 500000 GROUP BY dept;`"
  b: "`SELECT dept, avg(salary) FROM emp GROUP BY dept HAVING avg(salary) >= 500000;`"
  c: "`SELECT dept, avg(salary) FROM emp HAVING salary >= 500000;`"
  d: "`SELECT dept, avg(salary) FROM emp ORDER BY avg(salary) >= 500000;`"
  e: "`SELECT DISTINCT dept FROM emp WHERE salary = avg(salary);`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: approved
---
# Question

部署ごとの平均給与を求め、平均給与が500000以上の部署だけを表示したい。最も適切なSQLを1つ選びなさい。

# Explanation

行を集約する前の絞込みは`WHERE`、`GROUP BY`後のグループに対する条件は`HAVING`に記述します。

したがって正解は、**B**です。

- A：集約関数を同じ問い合わせレベルのWHERE条件には書けません。
- B：部署ごとに集約し、その平均にHAVING条件を適用しています。
- C：GROUP BYがなく、非集約列deptの扱いも不正です。
- D：ORDER BYは並べ替えであり絞込みではありません。
- E：求める集約になっていません。

**試験テクニック：** `WHERE=集約前の行`、`HAVING=集約後の組`と時間軸で覚えます。

[問題へ戻る](模擬試験_問題.md#q38)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。行を集約する前の絞込みは`WHERE`、`GROUP BY`後のグループに対する条件は`HAVING`に記述します。

したがって正解は、**B**です。

- A：集約関数を同じ問い合わせレベルのWHERE条件には書けません。
- B：部署ごとに集約し、その平均にHAVING条件を適用しています。
- C：GROUP BYがなく、非集約列deptの扱いも不正です。
- D：ORDER BYは並べ替えであり絞込みではありません。
- E：求める集約になっていません。

**試験テクニック：** `WHERE=集約前の行`、`HAVING=集約後の組`と時間軸で覚えます。

[問題へ戻る](模擬試験_問題.md#q38)

## b

正解です。行を集約する前の絞込みは`WHERE`、`GROUP BY`後のグループに対する条件は`HAVING`に記述します。

したがって正解は、**B**です。

- A：集約関数を同じ問い合わせレベルのWHERE条件には書けません。
- B：部署ごとに集約し、その平均にHAVING条件を適用しています。
- C：GROUP BYがなく、非集約列deptの扱いも不正です。
- D：ORDER BYは並べ替えであり絞込みではありません。
- E：求める集約になっていません。

**試験テクニック：** `WHERE=集約前の行`、`HAVING=集約後の組`と時間軸で覚えます。

[問題へ戻る](模擬試験_問題.md#q38)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。行を集約する前の絞込みは`WHERE`、`GROUP BY`後のグループに対する条件は`HAVING`に記述します。

したがって正解は、**B**です。

- A：集約関数を同じ問い合わせレベルのWHERE条件には書けません。
- B：部署ごとに集約し、その平均にHAVING条件を適用しています。
- C：GROUP BYがなく、非集約列deptの扱いも不正です。
- D：ORDER BYは並べ替えであり絞込みではありません。
- E：求める集約になっていません。

**試験テクニック：** `WHERE=集約前の行`、`HAVING=集約後の組`と時間軸で覚えます。

[問題へ戻る](模擬試験_問題.md#q38)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。行を集約する前の絞込みは`WHERE`、`GROUP BY`後のグループに対する条件は`HAVING`に記述します。

したがって正解は、**B**です。

- A：集約関数を同じ問い合わせレベルのWHERE条件には書けません。
- B：部署ごとに集約し、その平均にHAVING条件を適用しています。
- C：GROUP BYがなく、非集約列deptの扱いも不正です。
- D：ORDER BYは並べ替えであり絞込みではありません。
- E：求める集約になっていません。

**試験テクニック：** `WHERE=集約前の行`、`HAVING=集約後の組`と時間軸で覚えます。

[問題へ戻る](模擬試験_問題.md#q38)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。行を集約する前の絞込みは`WHERE`、`GROUP BY`後のグループに対する条件は`HAVING`に記述します。

したがって正解は、**B**です。

- A：集約関数を同じ問い合わせレベルのWHERE条件には書けません。
- B：部署ごとに集約し、その平均にHAVING条件を適用しています。
- C：GROUP BYがなく、非集約列deptの扱いも不正です。
- D：ORDER BYは並べ替えであり絞込みではありません。
- E：求める集約になっていません。

**試験テクニック：** `WHERE=集約前の行`、`HAVING=集約後の組`と時間軸で覚えます。

[問題へ戻る](模擬試験_問題.md#q38)
