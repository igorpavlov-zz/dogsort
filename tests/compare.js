const setups = []

for (var i = 0; i < 30; i++) {
  setups.push({
    amount: 10,
    length: Math.pow(2, i)
  })
}

const generators = [
  {
    title: 'Random: A lot of repeating elements',
    func: function (dimension) {
      const array = [];
      for (let i = 1; i <= dimension; i++) {
        array.push(Math.round(Math.random() * 9));
      }
      return array;
    }
  },
  {
    title: 'Random: Few or no repeating elements',
    func: function (dimension) {
      const array = [];
      for (let i = 1; i <= dimension; i++) {
        array.push(Math.random() * 100000000);
      }
      return array;
    }
  },
  {
    title: 'Ordered: Perfect natural sequence',
    func: function (dimension) {
      const array = [];
      for (let i = 1; i <= dimension; i++) {
        array.push(i);
      }
      return array;
    }
  },
  {
    title: 'Ordered: Numbers are close to each other',
    func: function (dimension) {
      const array = [];
      for (let i = 1; i <= dimension; i++) {
        array.push(i + Math.random());
      }
      return array;
    }
  },
  {
    title: 'Ordered: Numbers are 2 in the power of their positions',
    func: function (dimension) {
      const array = [];
      for (let i = 1; i <= dimension; i++) {
        array.push(Math.pow(10, i));
      }
      return array;
    }
  },
  {
    title: 'Reverse ordered',
    func: function (dimension) {
      const array = [];
      for (let i = 1; i <= dimension; i++) {
        array.push(i);
      }
      return array;
    }
  }
]

const dogsort = require('../src/dogsort.js');
const TimSort = require('timsort');
const wikisort = require('wikisort');

const colors = require('colors');

const sortFunc = function (a, b) {
  return a - b;
}

let time, passed, arrayEqual, func, dogsortTime, competitorTime, competitorTitle;

const sorters = [
  {
    title: 'Dogsort',
    func: function (array) {
      dogsort(array);
    }
  },
  {
    title: 'Array.sort',
    func: function (array) {
      array.sort(sortFunc);
    }
  },
  {
    title: 'Timsort',
    func: function (array) {
      TimSort.sort(array, sortFunc);
    }
  }
]

setups.forEach((setup) => {
  console.log("Sorting " + setup.amount + " arrays of " + setup.length + " length")

  generators.forEach((generator) => {
    arrayEqual = generator.func(setup.length);
    competitorTime = undefined;

    sorters.forEach((sorter, sorterIndex) => {
      time = 0;
      passed = 0;

      for (var a = 1; a <= setup.amount; a++) {
        let array = arrayEqual.concat([])
        let start = process.hrtime();

        sorter.func(array);

        let stop = process.hrtime();
        let startNano = start[0] * 1000000000 + start[1];
        let stopNano = stop[0] * 1000000000 + stop[1];

        time += stopNano - startNano;

        if (isSorted(array)) {
          passed++;
        } else {
          console.log('Failure'.red);
          throw('failure')
        }
      }

      if (sorterIndex === 0) {
        dogsortTime = time;
      } else {
        if (competitorTime === undefined || time < competitorTime) {
          competitorTime = time;
          competitorTitle = sorter.title;
        }
      }
    })

    let comparison = Math.round(dogsortTime / competitorTime * 100);

    console.log((generator.title + ': ' + comparison + '% of ' + competitorTitle)
      [comparison < 100 ? 'green' : 'yellow']);
  })
})

function isSorted(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i+1] || arr[i] === undefined) {
      return false;
    }
  }

  return true;
}
