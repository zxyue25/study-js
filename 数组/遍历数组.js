// 基于 ES6，不会改变自身的遍历方法一共有 12 个
// 分别为 forEach、map、filter、reduce、reduceRight、every、some
// 以及 ES6 新增的方法 find、findIndex、keys、values、entries

// forEach方法 返回值为undefined
var array = [1, 3, 5];
var obj = { name: "cc" };
var sReturn = array.forEach(function (value, index, array) {
  array[index] = value;
  console.log(this.name); // cc被打印了三次, this指向obj
}, obj);
console.log(array); // [1, 3, 5]
console.log(sReturn); // undefined, 可见返回值为undefined

// map 方法
var array = [18, 9, 10, 35, 80];
array.map((item) => item + 1);
console.log(array); // [19, 10, 11, 36, 81]

// filter 方法
var array = [18, 9, 10, 35, 80];
var array2 = array.filter(function (value, index, array) {
  return value > 20;
});
console.log(array2); // [35, 80]

// reduce方法
var array = [1, 2, 3, 4];
var s = array.reduce(function (previousValue, value, index, array) {
  return previousValue * value;
}, 1);
console.log(s); // 24
// ES6写法更加简洁
array.reduce((p, v) => p * v); // 24

// reduceRight方法 (和reduce的区别就是从后往前累计)
var array = [1, 2, 3, 4];
array.reduceRight((p, v) => p * v); // 24

// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组
// 它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历
// 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

// keys方法
[...Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[...new Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
["a", "b"].keys(); // Array Iterator {}
[...["a", "b"].keys()]; // [0 , 1]
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1

// values方法
var array = ["abc", "xyz"];
var iterator = array.values();
console.log(iterator.next().value); //abc
console.log(iterator.next().value); //xyz
[...["a", "b"].values()]; // ['a', 'b']
for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'

// entries方法
var array = ["a", "b", "c"];
var iterator = array.entries();
console.log(iterator.next().value); // [0, "a"]
console.log(iterator.next().value); // [1, "b"]
console.log(iterator.next().value); // [2, "c"]
console.log(iterator.next().value); // undefined, 迭代器处于数组末尾时, 再迭代就会返回undefined
