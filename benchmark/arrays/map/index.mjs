import { Benchmark } from '../../../lib/Benchmark.mjs'
import { addThousandSeparator } from '../../tools/index.mjs'

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
    `Mapping array with ${addThousandSeparator(numberOfElements)} elements`
  )

  const bigArray = Array(numberOfElements).fill(10)

  suite
    .add('For of', execForOf(bigArray))
    .add('Array.map', execMap(bigArray))
    .add('Procedural for', execProceduralFor(bigArray))
    .printResults()
}

execSuite(100)
execSuite(1_000)
execSuite(10_000)
execSuite(100_000)
execSuite(1_000_000)
