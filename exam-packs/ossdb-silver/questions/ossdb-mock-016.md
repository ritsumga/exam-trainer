---
id: ossdb-mock-016
exam: ossdb-silver
domain: operation
type: multiple
difficulty: 2
answers: [a, c]
choices:
  a: "PostgreSQLでは、ユーザとグループをロールという共通概念で扱う"
  b: "`CREATE USER`は常に`NOLOGIN`属性のロールを作成する"
  c: "ロールのパスワードは`ALTER ROLE`で変更できる"
  d: "ロール名は作成後に変更できない"
  e: "`DROP ROLE`は、そのロールが所有するオブジェクトを常に自動削除する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: approved
---
# Question

ロールに関する正しい記述を2つ選びなさい。

# Explanation

PostgreSQLではログイン主体もグループもロールで表現し、LOGIN属性の有無で区別できます。ロール属性やパスワードは`ALTER ROLE`で変更できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：`CREATE USER`は実質的にLOGIN付きの`CREATE ROLE`です。
- C：正しい記述です。
- D：`ALTER ROLE ... RENAME TO ...`で変更できます。
- E：所有オブジェクトや依存関係があると、その整理なしに削除できません。

**試験テクニック：** `CREATE USER = CREATE ROLE + LOGIN`を押さえるとユーザ／ロール問題が一気に解けます。

[問題へ戻る](模擬試験_問題.md#q16)

## a

正解です。PostgreSQLではログイン主体もグループもロールで表現し、LOGIN属性の有無で区別できます。ロール属性やパスワードは`ALTER ROLE`で変更できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：`CREATE USER`は実質的にLOGIN付きの`CREATE ROLE`です。
- C：正しい記述です。
- D：`ALTER ROLE ... RENAME TO ...`で変更できます。
- E：所有オブジェクトや依存関係があると、その整理なしに削除できません。

**試験テクニック：** `CREATE USER = CREATE ROLE + LOGIN`を押さえるとユーザ／ロール問題が一気に解けます。

[問題へ戻る](模擬試験_問題.md#q16)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLではログイン主体もグループもロールで表現し、LOGIN属性の有無で区別できます。ロール属性やパスワードは`ALTER ROLE`で変更できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：`CREATE USER`は実質的にLOGIN付きの`CREATE ROLE`です。
- C：正しい記述です。
- D：`ALTER ROLE ... RENAME TO ...`で変更できます。
- E：所有オブジェクトや依存関係があると、その整理なしに削除できません。

**試験テクニック：** `CREATE USER = CREATE ROLE + LOGIN`を押さえるとユーザ／ロール問題が一気に解けます。

[問題へ戻る](模擬試験_問題.md#q16)

## c

正解です。PostgreSQLではログイン主体もグループもロールで表現し、LOGIN属性の有無で区別できます。ロール属性やパスワードは`ALTER ROLE`で変更できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：`CREATE USER`は実質的にLOGIN付きの`CREATE ROLE`です。
- C：正しい記述です。
- D：`ALTER ROLE ... RENAME TO ...`で変更できます。
- E：所有オブジェクトや依存関係があると、その整理なしに削除できません。

**試験テクニック：** `CREATE USER = CREATE ROLE + LOGIN`を押さえるとユーザ／ロール問題が一気に解けます。

[問題へ戻る](模擬試験_問題.md#q16)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLではログイン主体もグループもロールで表現し、LOGIN属性の有無で区別できます。ロール属性やパスワードは`ALTER ROLE`で変更できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：`CREATE USER`は実質的にLOGIN付きの`CREATE ROLE`です。
- C：正しい記述です。
- D：`ALTER ROLE ... RENAME TO ...`で変更できます。
- E：所有オブジェクトや依存関係があると、その整理なしに削除できません。

**試験テクニック：** `CREATE USER = CREATE ROLE + LOGIN`を押さえるとユーザ／ロール問題が一気に解けます。

[問題へ戻る](模擬試験_問題.md#q16)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。PostgreSQLではログイン主体もグループもロールで表現し、LOGIN属性の有無で区別できます。ロール属性やパスワードは`ALTER ROLE`で変更できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：`CREATE USER`は実質的にLOGIN付きの`CREATE ROLE`です。
- C：正しい記述です。
- D：`ALTER ROLE ... RENAME TO ...`で変更できます。
- E：所有オブジェクトや依存関係があると、その整理なしに削除できません。

**試験テクニック：** `CREATE USER = CREATE ROLE + LOGIN`を押さえるとユーザ／ロール問題が一気に解けます。

[問題へ戻る](模擬試験_問題.md#q16)
