# [@superjs](https://www.npmjs.com/org/superjs)/wait
await anything synchronously. 

Useful when you want to get the result of async operation inside a synchronous function, while rewriting the 
synchronous 
function 
to be an async one is not possible. (Maybe it's in 3rd party library, or a predefined callback like event handler, etc)

## usage
wait(awaitable)

awaitable: a value can be awaited

return the promiseValue of awaitable just like using await, but synchronously. 

## example

```javascript
const wait = require('@superjs/wait')
const su = require('superagent')
let resp = wait(su('https://api.npms.io/v2/search?q=scope:superjs')) //async http request 
console.log(resp.body) // result is printed synchronously
```

## use together with [@superjs/awaitor](https://www.npmjs.com/package/@superjs/awaitor)

wait can resolve an operation which returns a promise, but not an operation which needs a callback.

you can either:
1. wrap the operation to return a promise
2. just call the operation, using @superjs/awaitor as callback, like below  

```javascript
const awaitor = require('@superjs/awaitor')
const wait = require('@superjs/wait')

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

Using @superjs/wait, you can evaluate an async operation, get the result of it, while still being paused
 on the breakpoint.

Just evaluate `wait(anyAsyncOperation())`, 
you will see the 
async operation gets done and returned.

You don't even have to require @superjs/wait in your code. Just install @superjs/wait as a devDependency. When debugging, 
evaluate `global.wait=process.mainModule.require('@superjs/wait')`. That's all.
