// 拷贝对象
// 1、Object.assign
let obj1 = { a: { b: 1 }, sym: Symbol(1) };
Object.defineProperty(obj1, "innumerable", {
  value: "不可枚举属性",
  enumerable: false,
});
let obj2 = {};
Object.assign(obj2, obj1);
obj1.a.b = 2;
console.log("obj1", obj1);
console.log("obj2", obj2);
// 它不会拷贝对象的继承属性；
// 它不会拷贝对象的不可枚举的属性；
// 可以拷贝 Symbol 类型的属性

// 2、扩展运算符方式 ...
// 展运算符 和 object.assign 有同样的缺陷

// 拷贝数组
let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = arr.concat(arr2);

// slice 拷贝数组
let newArr = arr.slice(begin, end);
// slice方法会返回一个新的数组对象
// 这一对象由该方法的前两个参数来决定原数组截取的开始和结束时间，是不会影响和改变原始数组的

// 手写浅拷贝
const shallowClone = (target) => {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};

// for in 以任意顺序遍历一个对象的除Symbol以外的可枚举属性，包括继承的可枚举属性
// for...in不应该用于迭代一个关注索引顺序的 Array
// 如果你只要考虑对象本身的属性，而不是它的原型，那么使用 getOwnPropertyNames() 或执行 hasOwnProperty() 来确定某属性是否是对象本身的属性
// for ... in是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用Array.prototype.forEach()和for ... of

const shallowClone = (target) => {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  let cloneTarget = null;
  if (Array.isArray(target)) {
    cloneTarget = [];
    target.forEach((value, index) => {
      cloneTarget[index] = value;
    });
  } else {
    cloneTarget = {};
    Object.keys(target).forEach((key) => {
      cloneTarget[key] = target[key];
    });
  }
  return cloneTarget;
};
