// 基于instanceof
a instanceof Array;
// 基于constructor
a.constructor === Array;
// 基于Object.prototype.toString
Object.prototype.toString.apply(a) === "[object Array]";
// 基于Object.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(a);
// 基于getPrototypeOf
Object.getPrototypeOf(a) === Array.prototype;

// ES6
Array.isArray();
// polyfill
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}
