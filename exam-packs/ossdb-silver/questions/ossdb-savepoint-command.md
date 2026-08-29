---
id: ossdb-savepoint-command
exam: ossdb-silver
domain: sql
type: input
difficulty: 2
answers: [ROLLBACK TO]
tags: [transaction, savepoint]
sources:
  - url: https://www.postgresql.org/docs/current/tutorial-transactions.html
verifiedAt: 2026-08-29
status: approved
---
# Question

トランザクション全体ではなく、指定したセーブポイントより後の変更だけを取り消すPostgreSQLのコマンドを、大文字と半角空白で入力してください。セーブポイント名は含めません。

# Explanation

`ROLLBACK TO`にセーブポイント名を続けると、その位置より後の変更を取り消し、トランザクション自体は継続できます。
