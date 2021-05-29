import { Benchmark } from '../../../lib/Benchmark.mjs'
import { generateTransactions, addThousandSeparator } from '../../tools/index.mjs'

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

function execSuite (amountOfTransactions) {
  const transactions = generateTransactions(amountOfTransactions)
  const suite = new Benchmark(
    `Transforming array. Computing ${addThousandSeparator(amountOfTransactions)} transactions`
  )

  suite
    .add('For of', execForOf(transactions))
    .add('Array.reduce', execReduce(transactions))
    .add('Procedural for', execProceduralFor(transactions))
    .printResults()
}

execSuite(100)
execSuite(1_000)
execSuite(10_000)
execSuite(100_000)
execSuite(1_000_000)
