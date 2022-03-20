Function.prototype.myBind = function (context, ...args) {
  // 只有有Function原型对象才有此方法
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  // 返回一个函数
  return function Fn() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof Fn) {
      return new this(...args, ...arguments);
    } else {
      return this.apply(context, args.concat(...arguments));
    }
  };
};

Function.prototype.myBind = function (context, ...args) {
  return function Fn() {
    if (this instanceof Fn) {
      return new this(...args, ...arguments);
    } else {
      return this.apply(context, args.concat(...arguments));
    }
  };
};
