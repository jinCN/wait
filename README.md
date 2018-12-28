# wait
await anything synchronously. 

## usage
wait(awaitable)

params
return

```javascript
const wait = require('@mybug/wait')
const su = require('superagent')
let resp = wait(su('https://api.npms.io/v2/search?q=scope:mybug'))
console.log(resp.body)
```

## example

```javascript
const wait = require('@mybug/wait')
const su = require('superagent')
let resp = wait(su('https://api.npms.io/v2/search?q=scope:mybug'))
console.log(resp.body)
```

##also useful as debug tool
When stopping on a breakpoint, you can evaluate expressions but no result of async operations can be evaluated 
immediately.

Use @mybug/wait to solve the problem by simply evaluate `wait(asyncOp())`

