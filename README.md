# [@superjs](https://www.npmjs.com/org/superjs)/wait
await anything synchronously. 

## Thought
Useful when you want to get the result of async operation inside a synchronous function,
 
 while rewriting the 
synchronous 
function 
to be an async one is not possible. (Maybe it's in 3rd party library, or a predefined callback like event handler, etc)

## API
### `wait(awaitable)`

`awaitable`: a value can be awaited, which meas _everything_

return the resolved value of `awaitable` or throw the rejected error,
 
 just like using `await`, but synchronously. 

## Example

```javascript
const wait = require('@superjs/wait')
const su = require('superagent')
let resp = wait(su('https://api.npms.io/v2/search?q=scope:superjs')) //async http request 
console.log(resp.body) // result is printed synchronously
```

## Use together with [@superjs/cb](https://www.npmjs.com/package/@superjs/cb)

wait can resolve an operation which returns a promise, but not an operation which needs a callback.

you can either:
1. wrap the operation to return a promise
2. just call the operation, using @superjs/cb as callback, like below  

```javascript
const Cb = require('@superjs/cb')
const wait = require('@superjs/wait')

foo(1,2,Cb().arr) 
// wait instead of await
let result = wait(Cb.pop()) 
// print [3,-1] one second later
console.log(result) 

function foo(a,b,cb){
  setTimeout(()=>cb(a+b,a-b),1000)
}
```

## Also useful as debug tool
When being paused on a breakpoint, you can evaluate expressions but no async operations can be evaluated 
immediately.

Using @superjs/wait, you can evaluate an async operation, get the result of it, while still being paused
 on the breakpoint.

Just evaluate `wait(anyAsyncOperation())`, 
you will see the 
async operation gets done and returned.

You don't even have to require @superjs/wait in your code. Just install @superjs/wait as a devDependency. When debugging, 
evaluate `global.wait=process.mainModule.require('@superjs/wait')`. That's all.
