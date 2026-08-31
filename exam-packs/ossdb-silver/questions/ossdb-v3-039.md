---
id: ossdb-v3-039
exam: ossdb-silver
domain: operation
type: single
difficulty: 2
answers: [a]
choices:
  a: "サーバが接続待受けに使用するネットワークインターフェースを指定する"
  b: "ユーザ名を変更する"
  c: "DB名を変更する"
  d: "テーブルの列名を変更する"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/runtime-config.html
  - url: https://www.postgresql.org/docs/current/auth-pg-hba-conf.html
verifiedAt: 2026-08-31
status: approved
---
# Question

listen_addressesの用途はどれか。1つ選びなさい。

# Explanation

listen_addressesはTCP/IP接続でサーバがどのアドレスを待ち受けるかを制御します。

## a

正解です。listen_addressesはTCP/IP接続でサーバがどのアドレスを待ち受けるかを制御します。

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。listen_addressesはTCP/IP接続でサーバがどのアドレスを待ち受けるかを制御します。

## c

不正解です。この選択肢は問題の前提における正解条件を満たしません。listen_addressesはTCP/IP接続でサーバがどのアドレスを待ち受けるかを制御します。

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。listen_addressesはTCP/IP接続でサーバがどのアドレスを待ち受けるかを制御します。
