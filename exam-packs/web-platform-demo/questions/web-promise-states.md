---
id: web-promise-states
exam: web-platform-demo
domain: javascript
type: multiple
difficulty: 2
answers: [a, c]
choices:
  a: fulfilled
  b: running
  c: rejected
  d: paused
tags: [javascript, promise]
sources:
  - url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
verifiedAt: 2026-08-30
status: approved
---
# Question

JavaScriptの`Promise`がpending状態を離れた後に取り得る状態を2つ選んでください。

# Explanation

settledなPromiseは、処理が成功した`fulfilled`か失敗した`rejected`のどちらかです。

## a

正常に完了したPromiseは`fulfilled`になります。

## b

`running`はPromiseの定義済み状態ではありません。

## c

失敗したPromiseは`rejected`になります。

## d

`paused`はPromiseの定義済み状態ではありません。
