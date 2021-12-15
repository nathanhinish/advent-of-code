(function (context, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    context.coordToStr = factory();
  }
})(
  this,
  () =>
    function coordToStr(c) {
      return `${c[0]},${c[1]}`;
    }
);
