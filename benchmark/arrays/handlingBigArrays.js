const Benchmark = require('../../lib/Benchmark')
const { generateOneMillionOfTransactions } = require('../tools/generateOneMillionOfTransactions')

function execForOf (array) {
  return () => {
    const report = {}
    for (const { amount, type } of array) {
      report[type] = report[type] ? report[type] + amount : amount
    }
    return report
  }
}

function execReduce (array) {
  return () => array.reduce((report, { amount, type }) => ({
    ...report,
    [type]: report[type] ? report[type] + amount : amount
  }), {})
}

function execProceduralFor (array) {
  return () => {
    const report = {}
    for (let i = 0, max = array.length; i < max; i++) {
      const { amount, type } = array[i]
      report[type] = report[type] ? report[type] + amount : amount
    }
    return report
  }
}

const suite = new Benchmark(
  'Computing 1.000.000 transactions'
)

const transactions = generateOneMillionOfTransactions()

suite
  .add('For of', execForOf(transactions))
  .add('Array.reduce', execReduce(transactions))
  .add('Procedural for', execProceduralFor(transactions))
  .printResults()
