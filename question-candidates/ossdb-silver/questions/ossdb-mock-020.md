---
id: ossdb-mock-020
exam: ossdb-silver
domain: operation
type: multiple
difficulty: 2
answers: [a, c]
choices:
  a: "1つのデータベースを論理バックアップできる"
  b: "クラスタ内のロール定義を必ず完全にバックアップする"
  c: "カスタム形式は`pg_restore`で復元できる"
  d: "実行するには必ずPostgreSQLサーバを停止する"
  e: "データベースクラスタ全体を物理コピーする"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

`pg_dump`に関する正しい記述を2つ選びなさい。

# Explanation

`pg_dump`は1データベースを対象とする論理バックアップです。plain形式以外のcustom、directory、tar形式は`pg_restore`で復元します。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：ロールなどクラスタ共通オブジェクトは`pg_dumpall --globals-only`などを使います。
- C：正しい記述です。
- D：稼働中に一貫したバックアップを取得できます。
- E：物理コピーではなく、オブジェクト定義とデータを論理的に出力します。

**試験テクニック：** `pg_dump=1DB・論理・稼働中可`の3点セットで判断します。

[問題へ戻る](模擬試験_問題.md#q20)

## a

正解です。`pg_dump`は1データベースを対象とする論理バックアップです。plain形式以外のcustom、directory、tar形式は`pg_restore`で復元します。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：ロールなどクラスタ共通オブジェクトは`pg_dumpall --globals-only`などを使います。
- C：正しい記述です。
- D：稼働中に一貫したバックアップを取得できます。
- E：物理コピーではなく、オブジェクト定義とデータを論理的に出力します。

**試験テクニック：** `pg_dump=1DB・論理・稼働中可`の3点セットで判断します。

[問題へ戻る](模擬試験_問題.md#q20)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_dump`は1データベースを対象とする論理バックアップです。plain形式以外のcustom、directory、tar形式は`pg_restore`で復元します。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：ロールなどクラスタ共通オブジェクトは`pg_dumpall --globals-only`などを使います。
- C：正しい記述です。
- D：稼働中に一貫したバックアップを取得できます。
- E：物理コピーではなく、オブジェクト定義とデータを論理的に出力します。

**試験テクニック：** `pg_dump=1DB・論理・稼働中可`の3点セットで判断します。

[問題へ戻る](模擬試験_問題.md#q20)

## c

正解です。`pg_dump`は1データベースを対象とする論理バックアップです。plain形式以外のcustom、directory、tar形式は`pg_restore`で復元します。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：ロールなどクラスタ共通オブジェクトは`pg_dumpall --globals-only`などを使います。
- C：正しい記述です。
- D：稼働中に一貫したバックアップを取得できます。
- E：物理コピーではなく、オブジェクト定義とデータを論理的に出力します。

**試験テクニック：** `pg_dump=1DB・論理・稼働中可`の3点セットで判断します。

[問題へ戻る](模擬試験_問題.md#q20)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_dump`は1データベースを対象とする論理バックアップです。plain形式以外のcustom、directory、tar形式は`pg_restore`で復元します。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：ロールなどクラスタ共通オブジェクトは`pg_dumpall --globals-only`などを使います。
- C：正しい記述です。
- D：稼働中に一貫したバックアップを取得できます。
- E：物理コピーではなく、オブジェクト定義とデータを論理的に出力します。

**試験テクニック：** `pg_dump=1DB・論理・稼働中可`の3点セットで判断します。

[問題へ戻る](模擬試験_問題.md#q20)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_dump`は1データベースを対象とする論理バックアップです。plain形式以外のcustom、directory、tar形式は`pg_restore`で復元します。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：ロールなどクラスタ共通オブジェクトは`pg_dumpall --globals-only`などを使います。
- C：正しい記述です。
- D：稼働中に一貫したバックアップを取得できます。
- E：物理コピーではなく、オブジェクト定義とデータを論理的に出力します。

**試験テクニック：** `pg_dump=1DB・論理・稼働中可`の3点セットで判断します。

[問題へ戻る](模擬試験_問題.md#q20)
