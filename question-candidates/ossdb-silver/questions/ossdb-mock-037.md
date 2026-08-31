---
id: ossdb-mock-037
exam: ossdb-silver
domain: sql
type: single
difficulty: 2
answers: [c]
choices:
  a: "`customers CROSS JOIN orders`"
  b: "`customers INNER JOIN orders ON ...`"
  c: "`customers LEFT OUTER JOIN orders ON ...`"
  d: "`customers RIGHT OUTER JOIN orders ON ...`"
  e: "`customers NATURAL CROSS JOIN orders`"
tags: [ossdb-silver, candidate]
sources:
  - url: https://oss-db.jp/outline/silver
  - url: https://www.postgresql.org/docs/current/sql.html
  - url: https://www.postgresql.org/docs/current/tutorial-sql.html
verifiedAt: 2026-08-31
status: reviewed
---
# Question

左側の表`customers`の全行を残し、一致する`orders`があれば結合したい。最も適切な結合を1つ選びなさい。

# Explanation

LEFT OUTER JOINは左表の全行を保持し、右表に一致行がない場合は右側の列をNULLとして返します。

したがって正解は、**C**です。

- A：全組合せを作る直積です。
- B：両表で一致した行だけを返します。
- C：正しい結合です。
- D：右側のorders全行を保持します。
- E：求める構文ではありません。

**試験テクニック：** 「どちらを全件残すか」を確認し、左ならLEFT、右ならRIGHTです。

[問題へ戻る](模擬試験_問題.md#q37)

## a

不正解です。この選択肢は問題の前提における正解条件を満たしません。LEFT OUTER JOINは左表の全行を保持し、右表に一致行がない場合は右側の列をNULLとして返します。

したがって正解は、**C**です。

- A：全組合せを作る直積です。
- B：両表で一致した行だけを返します。
- C：正しい結合です。
- D：右側のorders全行を保持します。
- E：求める構文ではありません。

**試験テクニック：** 「どちらを全件残すか」を確認し、左ならLEFT、右ならRIGHTです。

[問題へ戻る](模擬試験_問題.md#q37)

## b

不正解です。この選択肢は問題の前提における正解条件を満たしません。LEFT OUTER JOINは左表の全行を保持し、右表に一致行がない場合は右側の列をNULLとして返します。

したがって正解は、**C**です。

- A：全組合せを作る直積です。
- B：両表で一致した行だけを返します。
- C：正しい結合です。
- D：右側のorders全行を保持します。
- E：求める構文ではありません。

**試験テクニック：** 「どちらを全件残すか」を確認し、左ならLEFT、右ならRIGHTです。

[問題へ戻る](模擬試験_問題.md#q37)

## c

正解です。LEFT OUTER JOINは左表の全行を保持し、右表に一致行がない場合は右側の列をNULLとして返します。

したがって正解は、**C**です。

- A：全組合せを作る直積です。
- B：両表で一致した行だけを返します。
- C：正しい結合です。
- D：右側のorders全行を保持します。
- E：求める構文ではありません。

**試験テクニック：** 「どちらを全件残すか」を確認し、左ならLEFT、右ならRIGHTです。

[問題へ戻る](模擬試験_問題.md#q37)

## d

不正解です。この選択肢は問題の前提における正解条件を満たしません。LEFT OUTER JOINは左表の全行を保持し、右表に一致行がない場合は右側の列をNULLとして返します。

したがって正解は、**C**です。

- A：全組合せを作る直積です。
- B：両表で一致した行だけを返します。
- C：正しい結合です。
- D：右側のorders全行を保持します。
- E：求める構文ではありません。

**試験テクニック：** 「どちらを全件残すか」を確認し、左ならLEFT、右ならRIGHTです。

[問題へ戻る](模擬試験_問題.md#q37)

## e

不正解です。この選択肢は問題の前提における正解条件を満たしません。LEFT OUTER JOINは左表の全行を保持し、右表に一致行がない場合は右側の列をNULLとして返します。

したがって正解は、**C**です。

- A：全組合せを作る直積です。
- B：両表で一致した行だけを返します。
- C：正しい結合です。
- D：右側のorders全行を保持します。
- E：求める構文ではありません。

**試験テクニック：** 「どちらを全件残すか」を確認し、左ならLEFT、右ならRIGHTです。

[問題へ戻る](模擬試験_問題.md#q37)
