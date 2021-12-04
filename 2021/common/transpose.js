// https://web.archive.org/web/20160725092857/http://www.codesuck.com/2012/02/transpose-javascript-array-in-one-line.html

module.exports = function transpose(a) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
      return r[c];
    });
  });
};
