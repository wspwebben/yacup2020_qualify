function* sort(array, low = 0, high = array.length - 1) {
  if (low < high) {
      var pivot = yield* getPivot(array, low, high);
      yield* sort(array, low, pivot - 1);
      yield* sort(array, pivot + 1, high);
  }
  return array;

  function* getPivot(array, low, high) {
      var pivot = array[high];
      var i = low;
      for (var j = low; j <= high; j++) {
          if (array[j] < pivot) {
              yield swap(array, i++, j);
          }
      }
      yield swap(array, i, high);
      return i;
  }

  function swap(array, low, high) {
      [array[low], array[high]] = [array[high], array[low]];
      return array;
  }
}

module.exports = sort;

export default sort