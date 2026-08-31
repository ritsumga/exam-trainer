---
id: ossdb-mock-006
exam: ossdb-silver
domain: structure
type: single
difficulty: 2
answers: [b]
choices:
  a: "CREATE、READ、UNDO、DROP"
  b: "INSERT、SELECT、UPDATE、DELETE"
  c: "CREATE TABLE、SELECT、ALTER TABLE、DROP TABLE"
  d: "BEGIN、COMMIT、ROLLBACK、SAVEPOINT"
  e: "GRANT、REVOKE、UPDATE、DELETE"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

CRUDとSQLコマンドの対応として、最も適切なものを1つ選びなさい。

# Explanation

CRUDはCreate、Read、Update、Deleteの頭文字です。行データに対するSQLでは、それぞれINSERT、SELECT、UPDATE、DELETEに対応します。

したがって正解は、**B. INSERT、SELECT、UPDATE、DELETE**です。

- A、D、E：CRUDの4操作に対応していません。
- C：表構造を操作するDDLが混ざっています。

**試験テクニック：** CRUDのCreateは表のCREATEではなく、行を作るINSERTである点が定番のひっかけです。

[問題へ戻る](模擬試験_問題.md#q06)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。CRUDはCreate、Read、Update、Deleteの頭文字です。行データに対するSQLでは、それぞれINSERT、SELECT、UPDATE、DELETEに対応します。

したがって正解は、**B. INSERT、SELECT、UPDATE、DELETE**です。

- A、D、E：CRUDの4操作に対応していません。
- C：表構造を操作するDDLが混ざっています。

**試験テクニック：** CRUDのCreateは表のCREATEではなく、行を作るINSERTである点が定番のひっかけです。

[問題へ戻る](模擬試験_問題.md#q06)

## b

正解です。CRUDはCreate、Read、Update、Deleteの頭文字です。行データに対するSQLでは、それぞれINSERT、SELECT、UPDATE、DELETEに対応します。

したがって正解は、**B. INSERT、SELECT、UPDATE、DELETE**です。

- A、D、E：CRUDの4操作に対応していません。
- C：表構造を操作するDDLが混ざっています。

**試験テクニック：** CRUDのCreateは表のCREATEではなく、行を作るINSERTである点が定番のひっかけです。

[問題へ戻る](模擬試験_問題.md#q06)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。CRUDはCreate、Read、Update、Deleteの頭文字です。行データに対するSQLでは、それぞれINSERT、SELECT、UPDATE、DELETEに対応します。

したがって正解は、**B. INSERT、SELECT、UPDATE、DELETE**です。

- A、D、E：CRUDの4操作に対応していません。
- C：表構造を操作するDDLが混ざっています。

**試験テクニック：** CRUDのCreateは表のCREATEではなく、行を作るINSERTである点が定番のひっかけです。

[問題へ戻る](模擬試験_問題.md#q06)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。CRUDはCreate、Read、Update、Deleteの頭文字です。行データに対するSQLでは、それぞれINSERT、SELECT、UPDATE、DELETEに対応します。

したがって正解は、**B. INSERT、SELECT、UPDATE、DELETE**です。

- A、D、E：CRUDの4操作に対応していません。
- C：表構造を操作するDDLが混ざっています。

**試験テクニック：** CRUDのCreateは表のCREATEではなく、行を作るINSERTである点が定番のひっかけです。

[問題へ戻る](模擬試験_問題.md#q06)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。CRUDはCreate、Read、Update、Deleteの頭文字です。行データに対するSQLでは、それぞれINSERT、SELECT、UPDATE、DELETEに対応します。

したがって正解は、**B. INSERT、SELECT、UPDATE、DELETE**です。

- A、D、E：CRUDの4操作に対応していません。
- C：表構造を操作するDDLが混ざっています。

**試験テクニック：** CRUDのCreateは表のCREATEではなく、行を作るINSERTである点が定番のひっかけです。

[問題へ戻る](模擬試験_問題.md#q06)
