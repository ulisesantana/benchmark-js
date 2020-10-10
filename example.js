const Benchmark = require('./lib/Benchmark')

const suite = new Benchmark('Extending array')
suite.options({
  testTime: 1000
})

suite
  .add('Array.concat', () => {
    const array = [1, 2, 3, 4, 5]
    return array.concat(6)
  })
  .add('Spread operator', () => {
    const array = [1, 2, 3, 4, 5]
    return [...array, 6]
  })
  .add('Array.push', () => {
    const array = [1, 2, 3, 4, 5]
    return array.push(6)
  })
  .printResults()
  .printFastestResult()
  .printSlowestResult()
