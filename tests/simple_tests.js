require('colors')

const dogsort = require('../src/dogsort.js');

const arrays = [
  ['Integers', [1, 1000000, 10, 1000, 10000, 1000000, 1, 100, 10000]],
  ['UIntegers', [-90, 1, 0, 1234, -999]],
  ['Decimals', [1.1, 1.8, -4.6666666, 0.19]],
  ['Infinity', [Infinity, 1]],
  ['Irrational', [Math.PI, 1]]
]
arrays.forEach(spec => {
  const name = spec[0]
  const array = spec[1]

  console.log('--------------')
  console.log(name)
  console.log(array)
  dogsort(array)
  console.log(array)
  console.log(isSorted(array) ? 'passes'.green : 'fails'.red)
})

function isSorted(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i+1] || arr[i] === undefined) {
      return false;
    }
  }

  return true;
}
