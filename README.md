
# Dogsort 🐶

Status: `Work in Progress`

## Overview

Dogsort is an in-place sorting algorithm (additional required memory is `O(1)`) with an average complexity of `O(N*logN)` (the worst complexity is currently under investigation but is guaranteed to be not greater than `O(N^2)`). It combines Quicksort and Average Sort (https://www.cscjournals.org/manuscript/Journals/IJEA/Volume2/Issue2/IJEA-16.pdf).

## Important notes

⚠️ This project has Work in Progress status. It passes all tests the author has written but it is not guaranteed to pass all edge cases. Please use with caution.

⚠️ Infinity is not yet supported. If you have Infinity as one of the elements, it will not sort. NB: Infinity is not a number though.

## Comparison with other algorithms

Dogsort is more than twice faster than V8 implementation of `Array.sort` in average for arrays that have size more than 1024 elements (see Roadmap). It also beats Timsort on random arrays but still dramatically loses on sorted arrays just yet, which is expected (see Roadmap). Here are some crude results on arrays of 10^6 size:

| Array Type  | Array.sort (V8) | Timsort |
| ------------- | ------------- | ------------- |
| Random: A lot of repeating elements  | 25% | 29% |
| Random: Few or no repeating elements  | 28% | 96% |
| Ordered: Perfect natural sequence  | 22% | 1339% |
| Ordered: Numbers are close to each other  | 16% | 5707% |
| Ordered: Numbers are 10^index | 9% | 5% |
| Reverse ordered | 23% | 1381% |

## Installation

```sh
npm install dogsort --save
```

## Inclusion

**NodeJS**

```js
const dogsort = require('dogsort');
```

**Browser**

```html
<script src='node_modules/dogsort/build/dogsort.js' type='text/javascript'></script>
```
...or use ES6 `import` or EMD

## Usage

```js
const array = [2, 8.88, -7, 90, 0, 120000, -3.455555]

dogsort(array)
console.log(array)
```

## Roadmap

- Improve performance for small arrays
- Improve performance for sorted arrays
- Add a possibility for a custom comparison function
- Change recursion to stack to save memory if performance is not sacrificed
- Support Infinity
- Better testing scripts
