---
id: ossdb-mock-022
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "`pg_dump`のplain形式 — `psql`"
  b: "`pg_dump`のcustom形式 — `psql`のみ"
  c: "`pg_dumpall`のSQLスクリプト — `pg_restore`のみ"
  d: "`pg_basebackup`の出力 — `pg_restore`"
  e: "CSVファイル — `pg_controldata`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/reference-client.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

バックアップ形式と復元方法の組合せとして、最も適切なものを1つ選びなさい。

# Explanation

plain形式は実行可能なSQLスクリプトなので`psql`に読み込ませます。アーカイブ形式は`pg_restore`を使います。

したがって正解は、**A. `pg_dump`のplain形式 — `psql`**です。

- A：正しい組合せです。
- B：custom形式は`pg_restore`を使用します。
- C：`pg_dumpall`の出力はSQLなので`psql`で実行します。
- D：物理バックアップに`pg_restore`は使いません。
- E：CSVは`COPY`や`\copy`などで読み込みます。

**試験テクニック：** 「読めるSQLならpsql、アーカイブならpg_restore」で秒判定できます。

[問題へ戻る](模擬試験_問題.md#q22)

## a

正解です。plain形式は実行可能なSQLスクリプトなので`psql`に読み込ませます。アーカイブ形式は`pg_restore`を使います。

したがって正解は、**A. `pg_dump`のplain形式 — `psql`**です。

- A：正しい組合せです。
- B：custom形式は`pg_restore`を使用します。
- C：`pg_dumpall`の出力はSQLなので`psql`で実行します。
- D：物理バックアップに`pg_restore`は使いません。
- E：CSVは`COPY`や`\copy`などで読み込みます。

**試験テクニック：** 「読めるSQLならpsql、アーカイブならpg_restore」で秒判定できます。

[問題へ戻る](模擬試験_問題.md#q22)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。plain形式は実行可能なSQLスクリプトなので`psql`に読み込ませます。アーカイブ形式は`pg_restore`を使います。

したがって正解は、**A. `pg_dump`のplain形式 — `psql`**です。

- A：正しい組合せです。
- B：custom形式は`pg_restore`を使用します。
- C：`pg_dumpall`の出力はSQLなので`psql`で実行します。
- D：物理バックアップに`pg_restore`は使いません。
- E：CSVは`COPY`や`\copy`などで読み込みます。

**試験テクニック：** 「読めるSQLならpsql、アーカイブならpg_restore」で秒判定できます。

[問題へ戻る](模擬試験_問題.md#q22)

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。plain形式は実行可能なSQLスクリプトなので`psql`に読み込ませます。アーカイブ形式は`pg_restore`を使います。

したがって正解は、**A. `pg_dump`のplain形式 — `psql`**です。

- A：正しい組合せです。
- B：custom形式は`pg_restore`を使用します。
- C：`pg_dumpall`の出力はSQLなので`psql`で実行します。
- D：物理バックアップに`pg_restore`は使いません。
- E：CSVは`COPY`や`\copy`などで読み込みます。

**試験テクニック：** 「読めるSQLならpsql、アーカイブならpg_restore」で秒判定できます。

[問題へ戻る](模擬試験_問題.md#q22)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。plain形式は実行可能なSQLスクリプトなので`psql`に読み込ませます。アーカイブ形式は`pg_restore`を使います。

したがって正解は、**A. `pg_dump`のplain形式 — `psql`**です。

- A：正しい組合せです。
- B：custom形式は`pg_restore`を使用します。
- C：`pg_dumpall`の出力はSQLなので`psql`で実行します。
- D：物理バックアップに`pg_restore`は使いません。
- E：CSVは`COPY`や`\copy`などで読み込みます。

**試験テクニック：** 「読めるSQLならpsql、アーカイブならpg_restore」で秒判定できます。

[問題へ戻る](模擬試験_問題.md#q22)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。plain形式は実行可能なSQLスクリプトなので`psql`に読み込ませます。アーカイブ形式は`pg_restore`を使います。

したがって正解は、**A. `pg_dump`のplain形式 — `psql`**です。

- A：正しい組合せです。
- B：custom形式は`pg_restore`を使用します。
- C：`pg_dumpall`の出力はSQLなので`psql`で実行します。
- D：物理バックアップに`pg_restore`は使いません。
- E：CSVは`COPY`や`\copy`などで読み込みます。

**試験テクニック：** 「読めるSQLならpsql、アーカイブならpg_restore」で秒判定できます。

[問題へ戻る](模擬試験_問題.md#q22)
