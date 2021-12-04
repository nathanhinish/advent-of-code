module.exports = function reducer_numGreaterThanLast(acc, val, idx, arr) {
  if (idx > 0 && val > arr[idx - 1]) {
    acc = acc + 1;
  }
  return acc;
};
