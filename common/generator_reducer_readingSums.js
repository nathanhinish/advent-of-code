module.exports = function (linesPerSum) {
  return function reducer_readingSums(acc, n, i, arr) {
    if (i < arr.length - (linesPerSum - 1)) {
      const sum = arr.slice(i, i + linesPerSum).reduce((sum, m) => sum + m, 0);
      acc.push(sum);
    }
    return acc;
  };
};
