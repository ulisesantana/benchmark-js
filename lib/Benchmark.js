const benchmarkJS = require('benchmarkjs')

function Benchmark (suiteName) {
  this.suiteName = suiteName
  benchmarkJS.results = []

  this.add = (name, fn) => {
    benchmarkJS(name, fn)
    return this
  }

  this.printResults = () => {
    console.log(`Results for ${this.suiteName}`)
    console.table(this.results().reduce(mapToName, {}))
    console.log('\n')
    return this
  }

  this.printFastestResult = () => {
    const [fastest] = this.results().map(mapDiffToNumber).sort(sortAsc('diff'))
    printSingleResult('fastest', fastest)
    return this
  }

  this.printSlowestResult = () => {
    const [slowest] = this.results().map(mapDiffToNumber).sort(sortDesc('diff'))
    printSingleResult('slowest', slowest)
    return this
  }

  this.options = (options) => {
    benchmarkJS.options(options)
  }

  this.results = () => {
    return benchmarkJS.results.map(({ name, totalIterations, perSecondIterations, diff }) => ({
      name,
      totalIterations: addSeparationPoints(totalIterations),
      perSecondIterations: addSeparationPoints(perSecondIterations),
      diff
    }))
  }

  const mapDiffToNumber = ({ diff, ...result }) => ({ ...result, diff: fromPercentageToNumber(diff) })

  const fromPercentageToNumber = (percentage) =>
    Number(percentage.replace('%', ''))

  const addSeparationPoints = (number) =>
    Array.from(String(number))
      .reverse()
      .map((n, i, arr) =>
        (i + 1) % 3 === 0 && i < arr.length - 1 ? `.${n}` : n
      )
      .reverse()
      .join('')

  const printSingleResult = (kind, result) => {
    console.log(
      `The ${kind} solution for "${this.suiteName}" is ${result.name}\n`
    )
  }

  const mapToName = (acc, { name, ...result }) => ({ ...acc, [name]: result })

  const sortAsc = (prop) => (a, b) => {
    if (a[prop] > b[prop]) {
      return 1
    } else if (a[prop] < b[prop]) {
      return -1
    } else {
      return 0
    }
  }

  const sortDesc = (prop) => (a, b) => {
    if (a[prop] < b[prop]) {
      return 1
    } else if (a[prop] > b[prop]) {
      return -1
    } else {
      return 0
    }
  }
}

module.exports = Benchmark
