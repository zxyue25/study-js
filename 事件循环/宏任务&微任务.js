// 微任务：Promise.then()、muatationObserver、nextTick 微任务
// 宏任务：ajax、setTimeout、event、script、I/O
document.body.style.backgroundColor = "red";
console.log(1);
Promise.resolve().then(() => {
  console.log(2);
  document.body.style.backgroundColor = "yellow";
});
console.log(3);
// 1
// 3
// 2
// 不会显示red，因为UI渲染在微任务之后


document.body.style.backgroundColor = "red";
console.log(1);
setTimeout( () => {
  console.log(2);
  document.body.style.backgroundColor = "yellow";
}, 2000);
console.log(3);
// 1
// 3
// 2
// 页面先变红再变黄，宏任务在UI渲染之后


console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise((resolve) => {
    console.log('Promise')
    resolve()
}).then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
// script start => Promise => script end => promise1 => promise2 => setTimeout
