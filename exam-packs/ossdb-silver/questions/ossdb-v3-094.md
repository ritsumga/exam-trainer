---
id: ossdb-v3-094
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [a]
choices:
  a: "PUBLICATION と SUBSCRIPTION"
  b: "ROLE と TABLESPACE"
  c: "VIEW と TRIGGER"
  d: "SAVEPOINT と LOCK"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/user-manag.html
  - url: https://www.postgresql.org/docs/current/ddl-priv.html
verifiedAt: 2026-08-31
status: approved
---
# Question

ロジカルレプリケーションで使用する代表的なオブジェクトの組み合わせはどれか。1つ選びなさい。

# Explanation

ロジカルレプリケーションでは公開側にPUBLICATION、購読側にSUBSCRIPTIONを定義します。

## a

正解です。ロジカルレプリケーションでは公開側にPUBLICATION、購読側にSUBSCRIPTIONを定義します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。ロジカルレプリケーションでは公開側にPUBLICATION、購読側にSUBSCRIPTIONを定義します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。ロジカルレプリケーションでは公開側にPUBLICATION、購読側にSUBSCRIPTIONを定義します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。ロジカルレプリケーションでは公開側にPUBLICATION、購読側にSUBSCRIPTIONを定義します。
