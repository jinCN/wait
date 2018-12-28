# wait
await anything synchronously. 

## usage
wait(awaitable)

params awaitable: an awaitable value

return the promiseValue just like using await 

## example

```javascript
const wait = require('@mybug/wait')
const su = require('superagent')
let resp = wait(su('https://api.npms.io/v2/search?q=scope:mybug')) //async http request 
console.log(resp.body) // result is printed synchronously
```

## use together with @mybug/awaitor

wait can resolve an operation which returns a promise, but not an operation which needs a callback.

you can either:
1. wrap the operation to return a promise
2. just call the operation, use @mybug/awaitor as callback, like below  

```javascript
const awaitor = require('@mybug/awaitor')
const wait = require('@mybug/wait')

let cb = awaitor()
foo(1,2,cb) // whenever a callback is needed, just use cb
let result = wait(cb) //result is an array, containing the args cb received
console.log(result) // [3]

function foo(a,b,cb){
  setTimeout(()=>cb(a+b),1000)
}
```

## also useful as debug tool
When being paused on a breakpoint, you can evaluate expressions but no async operations can be evaluated 
immediately.

Use @mybug/wait to solve the problem, you will get the result of the async operation while still being paused on that breakpoint.

You don't even have to require @mybug/wait in your code. Just install @mybug/wait as a devDependency. When debugging, 
evaluate `global.wait=process.mainModule.require('@mybug/wait')`. Then by evaluating `wait(anyAsyncOperation())`, 
you will see the 
async operation gets done and returned.
