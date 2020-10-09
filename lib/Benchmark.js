const benchmarkJS = require("benchmarkjs");

function Benchmark(suiteName) {
  this.suiteName = suiteName;
  benchmarkJS.results = [];

  this.add = (name, fn) => {
    benchmarkJS(name, fn);
    return this;
  };

  this.printResults = (desc = false) => {
    console.log(`Results for ${this.suiteName}`);
    if (desc) {
      console.table(this.results().sort(sortDesc("diff")));
    } else {
      console.table(this.results().sort(sortAsc("diff")));
    }
    console.log("\n");
    return this;
  };

  this.printFastestResult = () => {
    const [fastest] = this.results().sort(sortAsc("diff"));
    printSingleResult("fastest", fastest);
    return this;
  };

  this.printSlowestResult = () => {
    const [slowest] = this.results().sort(sortDesc("diff"));
    printSingleResult("slowest", slowest);
    return this;
  };

  this.options = (options) => {
    benchmarkJS.options(options);
  };

  this.results = () => {
    return benchmarkJS.results.map((r) => ({
      ...r,
      totalIterations: addSeparationPoints(r.totalIterations),
      perSecondIterations: addSeparationPoints(r.perSecondIterations),
      diff: fromPercentageToNumber(r.diff),
    }));
  };

  const fromPercentageToNumber = (percentage) =>
    Number(percentage.replace("%", ""));

  const addSeparationPoints = (number) =>
    [...String(number)]
      .reverse()
      .map((n, i, arr) =>
        (i + 1) % 3 === 0 && i < arr.length - 1 ? `.${n}` : n
      )
      .reverse()
      .join("");

  const printSingleResult = (kind, result) => {
    console.log(
      `The ${kind} solution for "${this.suiteName}" is ${result.name}\n`
    );
  };

  const sortAsc = (prop) => (a, b) => {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    } else {
      return 0;
    }
  };

  const sortDesc = (prop) => (a, b) => {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    } else {
      return 0;
    }
  };
}

module.exports = Benchmark;
