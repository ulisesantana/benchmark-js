import { Benchmark } from '../../lib/Benchmark.mjs'

function arrangeSet (numberOfElements) {
  const testSet = new Set()
  for (let i = 0; i < numberOfElements; i++) {
    testSet.add(i)
  }
  return testSet
}

function execArrayFrom (numberOfElements) {
  return () => {
    const testSet = arrangeSet(numberOfElements)
    return Array.from(testSet)
  }
}

function execSlice (numberOfElements) {
  return () => {
    const testSet = arrangeSet(numberOfElements)
    return Array.prototype.slice.call(testSet)
  }
}

function execSpreadOperator (numberOfElements) {
  return () => {
    const testSet = arrangeSet(numberOfElements)
    return [...testSet]
  }
}

function execSuite (numberOfElements) {
  const suite = new Benchmark(
      `Converting array-like object with ${numberOfElements} elements to array`
  )

  suite
    .add('Array.from', execArrayFrom(numberOfElements))
    .add('Spread operator', execSpreadOperator(numberOfElements))
    .add('Array.prototype.slice', execSlice(numberOfElements))
    .printResults()
}

execSuite(100)
execSuite(1000)
execSuite(10000)
execSuite(100000)
execSuite(500000)
