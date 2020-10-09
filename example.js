const Benchmark = require("./lib/Benchmark");

const suite = new Benchmark("Extending array");
suite.options({
  testTime: 1000,
});

suite
  .add("Array.concat", function () {
    const array = [1, 2, 3, 4, 5];
    return array.concat(6);
  })
  .add("Spread operator", function () {
    const array = [1, 2, 3, 4, 5];
    return [...array, 6];
  })
  .add("Array.push", function () {
    const array = [1, 2, 3, 4, 5];
    return array.push(6);
  })
  .printResults()
  .printResults(true)
  .printFastestResult()
  .printSlowestResult();

const suite2 = new Benchmark("Transform arrays");

const bigArray = Array(100000).fill(10);
const bigArray2 = Array(100000).fill(10);

suite2
  .add("For of", function () {
    const result = [];
    for (const x of bigArray) {
      result.push(Math.random() * x);
    }
    return result;
  })
  .add("Array.map", function () {
    return bigArray2.map((x) => Math.random() * x);
  })
  .printResults();
