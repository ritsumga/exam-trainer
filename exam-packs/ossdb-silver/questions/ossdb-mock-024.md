---
id: ossdb-mock-024
exam: ossdb-silver
domain: operation
type: multiple
difficulty: 2
answers: [a, c]
choices:
  a: "稼働中のクラスタからベースバックアップを取得できる"
  b: "指定した1表だけをSQL形式で出力する"
  c: "ストリーミングレプリケーションのスタンバイ作成に利用できる"
  d: "ロール定義だけをバックアップする専用コマンドである"
  e: "取得したバックアップは`pg_restore`でのみ復元できる"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/backup.html
  - url: https://www.postgresql.org/docs/current/continuous-archiving.html
verifiedAt: 2026-08-31
status: approved
---
# Question

`pg_basebackup`に関する正しい記述を2つ選びなさい。

# Explanation

`pg_basebackup`は稼働中のクラスタ全体から物理ベースバックアップを取得し、スタンバイ構築やPITRの基礎として利用できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：表単位のSQL出力は`pg_dump`などの領域です。
- C：正しい記述です。
- D：ロール定義だけなら`pg_dumpall --roles-only`などです。
- E：物理バックアップなので`pg_restore`の対象ではありません。

**試験テクニック：** `basebackup`の語から「クラスタ全体の物理的な土台」と連想します。

[問題へ戻る](模擬試験_問題.md#q24)

## a

正解です。`pg_basebackup`は稼働中のクラスタ全体から物理ベースバックアップを取得し、スタンバイ構築やPITRの基礎として利用できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：表単位のSQL出力は`pg_dump`などの領域です。
- C：正しい記述です。
- D：ロール定義だけなら`pg_dumpall --roles-only`などです。
- E：物理バックアップなので`pg_restore`の対象ではありません。

**試験テクニック：** `basebackup`の語から「クラスタ全体の物理的な土台」と連想します。

[問題へ戻る](模擬試験_問題.md#q24)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_basebackup`は稼働中のクラスタ全体から物理ベースバックアップを取得し、スタンバイ構築やPITRの基礎として利用できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：表単位のSQL出力は`pg_dump`などの領域です。
- C：正しい記述です。
- D：ロール定義だけなら`pg_dumpall --roles-only`などです。
- E：物理バックアップなので`pg_restore`の対象ではありません。

**試験テクニック：** `basebackup`の語から「クラスタ全体の物理的な土台」と連想します。

[問題へ戻る](模擬試験_問題.md#q24)

## c

正解です。`pg_basebackup`は稼働中のクラスタ全体から物理ベースバックアップを取得し、スタンバイ構築やPITRの基礎として利用できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：表単位のSQL出力は`pg_dump`などの領域です。
- C：正しい記述です。
- D：ロール定義だけなら`pg_dumpall --roles-only`などです。
- E：物理バックアップなので`pg_restore`の対象ではありません。

**試験テクニック：** `basebackup`の語から「クラスタ全体の物理的な土台」と連想します。

[問題へ戻る](模擬試験_問題.md#q24)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_basebackup`は稼働中のクラスタ全体から物理ベースバックアップを取得し、スタンバイ構築やPITRの基礎として利用できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：表単位のSQL出力は`pg_dump`などの領域です。
- C：正しい記述です。
- D：ロール定義だけなら`pg_dumpall --roles-only`などです。
- E：物理バックアップなので`pg_restore`の対象ではありません。

**試験テクニック：** `basebackup`の語から「クラスタ全体の物理的な土台」と連想します。

[問題へ戻る](模擬試験_問題.md#q24)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。`pg_basebackup`は稼働中のクラスタ全体から物理ベースバックアップを取得し、スタンバイ構築やPITRの基礎として利用できます。

したがって正解は、**A、C**です。

- A：正しい記述です。
- B：表単位のSQL出力は`pg_dump`などの領域です。
- C：正しい記述です。
- D：ロール定義だけなら`pg_dumpall --roles-only`などです。
- E：物理バックアップなので`pg_restore`の対象ではありません。

**試験テクニック：** `basebackup`の語から「クラスタ全体の物理的な土台」と連想します。

[問題へ戻る](模擬試験_問題.md#q24)
