// 简单版本 JSON.stringify
let a = {
  age: 1,
  jobs: {
    first: "FE",
  },
};
let b = JSON.parse(JSON.stringify(a));
// 会忽略 undefined
// 会忽略 symbol
// 不能序列化函数 function
// 无法拷贝不可枚举的属性
// 无法拷贝对象的原型链
// 拷贝 RegExp 引用类型会变成空对象
// 拷贝 Date 引用类型会变成字符串
// 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null
// 不能解决循环引用的对象，即对象成环 (obj[key] = obj)

// 手写简单版
function deepClone(target) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  let cloneTarget = null
  if(Array.isArray(target)){
    cloneTarget = []
    target.forEach((value, index) => {
      cloneTarget[index] = typeof value === 'object' ? deepClone(value) : value
    })
  } else{
    cloneTarget = {}
    Object.keys(target).forEach(key => {
      cloneTarget[key] = typeof value === 'object' ? deepClone(target[key]) : target[key]
    })
  }
  return cloneTarget;
}
// 不能复制不可枚举的属性以及 Symbol 类型；
// 这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
// 对象的属性里面成环，即循环引用没有解决

// 手写复杂版
// 循环引用 weakMap
function deepClone(target, hash = new WeakMap()){
  if(target !== Object || target === null || target instanceof Date || target instanceof RegExp){
    return target
  }

}
