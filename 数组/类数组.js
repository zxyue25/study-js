// 函数里面的参数对象 arguments；
// 用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection
// 用 querySelector 获得的 NodeList

function foo(name, age, sex) {
  console.log(arguments);
  console.log(typeof arguments);
  console.log(Object.prototype.toString.call(arguments));
}
foo("jack", "18", "male");
// VM4855:2 Arguments(3) ['jack', '18', 'male', callee: ƒ, Symbol(Symbol.iterator): ƒ]
// VM4855:3 object
// VM4855:4 [object Arguments]

// 剪头函数没有arguments
const four = () => arguments;
four(); // Throws an error  - arguments is not defined
// 自动将所有参数值放入数组中
const four = (...args) => args;

// arguments 不仅仅有一个 length 属性，还有一个 callee 属性，就是函数自身

var elem1, elem2;
// document.forms 是一个 HTMLCollection
elem1 = document.forms[0];
elem2 = document.forms.item(0);
console.log(elem1);
console.log(elem2);
console.log(typeof elem1); // object
console.log(Object.prototype.toString.call(elem1)); // [object HTMLCollection]

var list = document.querySelectorAll("input[type=checkbox]");
for (var checkbox of list) {
  checkbox.checked = true;
}
console.log(list);
console.log(typeof list); // object
console.log(Object.prototype.toString.call(list)); // [object NodeList]

// 将类数组转换成数组
// slice
// concat
// Array.from
// [...]
