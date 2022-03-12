// 基于 ES6，会改变自身值的方法一共有 9 个
// 分别为 pop、push、shift、unshift、reverse、sort、splice
// 以及两个 ES6 新增的方法 copyWithin 和 fill

// 所有插入元素的方法，比如 push、unshift 一律返回数组新的长度；
// 所有删除元素的方法，比如 pop、shift、splice 一律返回删除的元素，或者返回删除的多个元素组成的数组

// pop方法、一律返回删除的元素
var array = ["cat", "dog", "cow", "chicken", "mouse"];
var item = array.pop();
console.log(array); // ["cat", "dog", "cow", "chicken"]
console.log(item); // mouse

// push方法、返回数组新的长度
var array = ["football", "basketball", "badminton"];
var i = array.push("golfball");
console.log(array);
// ["football", "basketball", "badminton", "golfball"]
console.log(i); // 4

// reverse方法
var array = [1, 2, 3, 4, 5];
var array2 = array.reverse();
console.log(array); // [5,4,3,2,1]
console.log(array2 === array); // true

// shift方法、一律返回删除的元素
var array = [1, 2, 3, 4, 5];
var item = array.shift();
console.log(array); // [2,3,4,5]
console.log(item); // 1

// unshift方法、返回数组新的长度
var array = ["red", "green", "blue"];
var length = array.unshift("yellow");
console.log(array); // ["yellow", "red", "green", "blue"]
console.log(length); // 4

// sort方法
var array = ["apple", "Boy", "Cat", "dog"];
var array2 = array.sort();
console.log(array); // ["Boy", "Cat", "apple", "dog"]
console.log(array2 == array); // true

// splice方法、一律返回删除的元素
var array = ["apple", "boy"];
var splices = array.splice(1, 1);
console.log(array); // ["apple"]
console.log(splices); // ["boy"]
// copyWithin方法
var array = [1, 2, 3, 4, 5];
var array2 = array.copyWithin(0, 3);
console.log(array === array2, array2); // true [4, 5, 3, 4, 5]
// fill方法
var array = [1, 2, 3, 4, 5];
var array2 = array.fill(10, 0, 3);
console.log(array === array2, array2);
// true [10, 10, 10, 4, 5], 可见数组区间[0,3]的元素全部替换为10
