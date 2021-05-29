const Benchmark = require('../../lib/Benchmark')
const { generateTransactions } = require('../tools/generateTransactions')

function execForOf (transactions) {
  return () => {
    const report = {}
    for (const { amount, type } of transactions) {
      report[type] = report[type] ? report[type] + amount : amount
    }
    return report
  }
}

function execReduce (transactions) {
  return () => transactions.reduce((report, { amount, type }) => {
    report[type] = report[type] ? report[type] + amount : amount
    return report
  }, {})
}

function execProceduralFor (transactions) {
  return () => {
    const report = {}
    for (let i = 0, max = transactions.length; i < max; i++) {
      const { amount, type } = transactions[i]
      report[type] = report[type] ? report[type] + amount : amount
    }
    return report
  }
}

const amountOfTransactions = process.argv[2] || 1_000_000
const transactions = generateTransactions(amountOfTransactions)
const suite = new Benchmark(
  `Transforming array. Computing ${amountOfTransactions} transactions`
)

suite
  .add('For of', execForOf(transactions))
  .add('Array.reduce', execReduce(transactions))
  .add('Procedural for', execProceduralFor(transactions))
  .printResults()
