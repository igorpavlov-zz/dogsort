!(function (root, name, definition) {
  if (typeof module !== 'undefined' && module.exports) module.exports = definition();
  else if (typeof define === 'function' && define.amd) define(name, definition);
  else root[name] = definition();
}(this, 'dogsort', function () {
  return function (array) {
    splitPartition(0, array.length - 1)

    /**
     * Splits a partition into two sub-partitions.
     * It calculates an average among all numbers in partition,
     * then creates two sub-partitions by swapping elements:
     * - one that contains all elements less than the average value
     * - another that contains all elements greater than the average value
     * then it calls itself recursively for either left, right or both partitions.
     */
    function splitPartition (start, end) {
      var sum = 0;

      for (var index = start; index <= end; index++) {
        sum += array[index];
      }

      var average = sum / (end - start + 1)
      var comparisonPointer = start
      var dividerPointer = end

      // Swaps elements by going from left to right.
      //
      // If the checked value is greater than the average value,
      // it swaps the element with the last not yet swapped one.
      // It decrements the Divider Pointer because now the element is in place.
      // It doesn't move the Comparison Pointer in this case and checks the swapped
      // element which now appears on the position of the Comparison Pointer.
      //
      // If the checked value is less than the average value,
      // then it simply moves to a next value by incrementing a Comparison Pointer.
      //
      // It stops when Comparison Pointer and Divider Pointer meet each other
      // because this means all elements are now in place.
      while (comparisonPointer <= dividerPointer) {
        var numberA = array[comparisonPointer]

        if (numberA > average) {
          array[comparisonPointer] = array[dividerPointer]
          array[dividerPointer] = numberA
          dividerPointer--;
        } else {
          comparisonPointer++;
        }
      }

      // Calling each sub-partition recursively
      // but only in case they have length greater than 1
      dividerPointer < end && splitPartition(start, comparisonPointer - 1)
      comparisonPointer < end && splitPartition(comparisonPointer, end)
    }
  }
}))
