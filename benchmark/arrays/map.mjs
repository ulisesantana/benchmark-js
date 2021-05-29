import { Benchmark } from '../../lib/Benchmark.mjs'

function execForOf (array) {
  return () => {
    const result = []
    for (const x of array) {
      result.push(Math.random() * x)
    }
    return result
  }
}

function execMap (array) {
  return () => array.map((x) => Math.random() * x)
}

function execProceduralFor (array) {
  return () => {
    const result = []
    for (let i = 0, max = array.length; i < max; i++) {
      result.push(Math.random() * array[i])
    }
    return result
  }
}

function execSuite (numberOfElements) {
  const suite = new Benchmark(
    `Mapping array with ${numberOfElements} elements`
  )

  const bigArray = Array(numberOfElements).fill(10)

  suite
    .add('For of', execForOf(bigArray))
    .add('Array.map', execMap(bigArray))
    .add('Procedural for', execProceduralFor(bigArray))
    .printResults()
}

execSuite(100)
execSuite(1000)
execSuite(10000)
execSuite(100000)
execSuite(500000)
