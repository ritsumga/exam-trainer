---
id: ossdb-mock-049
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [b]
choices:
  a: "1と2の両方"
  b: "1だけ"
  c: "2だけ"
  d: "どちらも確定しない"
  e: "`ROLLBACK TO SAVEPOINT`で構文エラーになる"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: approved
---
# Question

次の一連のSQLを同一トランザクションで実行した。最終的に確定する行として、最も適切なものを1つ選びなさい。

```sql
BEGIN;
INSERT INTO t VALUES (1);
SAVEPOINT s1;
INSERT INTO t VALUES (2);
ROLLBACK TO SAVEPOINT s1;
COMMIT;
```

# Explanation

`ROLLBACK TO SAVEPOINT s1`は、セーブポイント設定後に行った変更だけを取り消します。値2のINSERTは取り消され、値1のINSERTはCOMMITで確定します。

したがって正解は、**B. 1だけ**です。

- A：値2はロールバックされます。
- B：正しい結果です。
- C：取り消される側が逆です。
- D：トランザクション全体のROLLBACKではありません。
- E：有効な構文です。

**試験テクニック：** SAVEPOINTに縦線を引き、「ROLLBACK TOは線より後だけ取消」と図にするとミスが減ります。

[問題へ戻る](模擬試験_問題.md#q49)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。`ROLLBACK TO SAVEPOINT s1`は、セーブポイント設定後に行った変更だけを取り消します。値2のINSERTは取り消され、値1のINSERTはCOMMITで確定します。

したがって正解は、**B. 1だけ**です。

- A：値2はロールバックされます。
- B：正しい結果です。
- C：取り消される側が逆です。
- D：トランザクション全体のROLLBACKではありません。
- E：有効な構文です。

**試験テクニック：** SAVEPOINTに縦線を引き、「ROLLBACK TOは線より後だけ取消」と図にするとミスが減ります。

[問題へ戻る](模擬試験_問題.md#q49)

## b

正解です。`ROLLBACK TO SAVEPOINT s1`は、セーブポイント設定後に行った変更だけを取り消します。値2のINSERTは取り消され、値1のINSERTはCOMMITで確定します。

したがって正解は、**B. 1だけ**です。

- A：値2はロールバックされます。
- B：正しい結果です。
- C：取り消される側が逆です。
- D：トランザクション全体のROLLBACKではありません。
- E：有効な構文です。

**試験テクニック：** SAVEPOINTに縦線を引き、「ROLLBACK TOは線より後だけ取消」と図にするとミスが減ります。

[問題へ戻る](模擬試験_問題.md#q49)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。`ROLLBACK TO SAVEPOINT s1`は、セーブポイント設定後に行った変更だけを取り消します。値2のINSERTは取り消され、値1のINSERTはCOMMITで確定します。

したがって正解は、**B. 1だけ**です。

- A：値2はロールバックされます。
- B：正しい結果です。
- C：取り消される側が逆です。
- D：トランザクション全体のROLLBACKではありません。
- E：有効な構文です。

**試験テクニック：** SAVEPOINTに縦線を引き、「ROLLBACK TOは線より後だけ取消」と図にするとミスが減ります。

[問題へ戻る](模擬試験_問題.md#q49)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`ROLLBACK TO SAVEPOINT s1`は、セーブポイント設定後に行った変更だけを取り消します。値2のINSERTは取り消され、値1のINSERTはCOMMITで確定します。

したがって正解は、**B. 1だけ**です。

- A：値2はロールバックされます。
- B：正しい結果です。
- C：取り消される側が逆です。
- D：トランザクション全体のROLLBACKではありません。
- E：有効な構文です。

**試験テクニック：** SAVEPOINTに縦線を引き、「ROLLBACK TOは線より後だけ取消」と図にするとミスが減ります。

[問題へ戻る](模擬試験_問題.md#q49)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。`ROLLBACK TO SAVEPOINT s1`は、セーブポイント設定後に行った変更だけを取り消します。値2のINSERTは取り消され、値1のINSERTはCOMMITで確定します。

したがって正解は、**B. 1だけ**です。

- A：値2はロールバックされます。
- B：正しい結果です。
- C：取り消される側が逆です。
- D：トランザクション全体のROLLBACKではありません。
- E：有効な構文です。

**試験テクニック：** SAVEPOINTに縦線を引き、「ROLLBACK TOは線より後だけ取消」と図にするとミスが減ります。

[問題へ戻る](模擬試験_問題.md#q49)
