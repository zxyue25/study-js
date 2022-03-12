// 基于 ES7，不会改变自身的方法也有 9 个
// 分别为 concat、join、slice、toString、toLocaleString、indexOf、lastIndexOf
// 未形成标准的 toSource
// 以及 ES7 新增的方法 includes

// concat方法
var array = [1, 2, 3];
var array2 = array.concat(4, [5, 6], [7, 8, 9]);
console.log(array2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array); // [1, 2, 3], 可见原数组并未被修改
// join方法
var array = ["We", "are", "Chinese"];
console.log(array.join()); // "We,are,Chinese"
console.log(array.join("+")); // "We+are+Chinese"
// slice方法
var array = ["one", "two", "three", "four", "five"];
console.log(array.slice()); // ["one", "two", "three","four", "five"]
console.log(array.slice(2, 3)); // ["three"]
// toString方法
var array = ["Jan", "Feb", "Mar", "Apr"];
var str = array.toString();
console.log(str); // Jan,Feb,Mar,Apr
// tolocalString方法
var array = [{ name: "zz" }, 123, "abc", new Date()];
var str = array.toLocaleString();
console.log(str); // [object Object],123,abc,2016/1/5 下午1:06:23
// indexOf方法
var array = ["abc", "def", "ghi", "123"];
console.log(array.indexOf("def")); // 1
// includes方法
var array = [-0, 1, 2];
console.log(array.includes(+0)); // true
console.log(array.includes(1)); // true
var array = [NaN];
console.log(array.includes(NaN)); // true
// 其中 includes 方法需要注意的是，如果元素中有 0，那么在判断过程中不论是 +0 还是 -0 都会判断为 True，这里的 includes 忽略了 +0 和 -0
