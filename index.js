module.exports = wait
const deasync = require('deasync')

function wait (awaitable) {
  let result
  let error
  let done = false
  if (!(awaitable.then && typeof awaitable.then === 'function')) {
    return awaitable
  }
  awaitable.then(function (res) {
    result = res
  }, function (err) {
    error = err
  }).then(function () {
    done = true
  })
  deasync.loopWhile(() => !done)
  if (error) {
    throw error
  }
  // noinspection JSUnusedAssignment
  return result
}
