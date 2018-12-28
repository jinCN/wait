let loop = require('deasync').runLoopOnce

module.exports = function (awaitable) {
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
  // eslint-disable-next-line
  while (!done) {
    loop()
  }
  if (error) {
    throw error
  }
  // noinspection JSUnusedAssignment
  return result
}
