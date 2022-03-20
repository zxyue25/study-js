for (var i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// setTimeout 为宏任务，由于 JS 中单线程 eventLoop 机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后 setTimeout 中的回调才依次执行
// 因为 setTimeout 函数也是一种闭包，往上找它的父级作用域链就是 window，变量 i 为 window 上的全局变量，开始执行 setTimeout 之前变量 i 已经就是 6 了，因此最后输出的连续就都是 6。


for (let i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// ES6 中新增的 let 定义变量的方式，使得 ES6 之后 JS 发生革命性的变化，让 JS 有了块级作用域，代码的作用域以块级为单位进行执行。通过改造后的代码，可以实现上面想要的结果。

for (var i = 0; i <= 5; i++) {
  setTimeout(
    (j) => {
      console.log(j);
    },
    0,
    i
  );
}
// setTimeout 作为经常使用的定时器，它是存在第三个参数的，日常工作中我们经常使用的一般是前两个，一个是回调函数，另外一个是时间，而第三个参数用得比较少。那么结合第三个参数，调整完之后的代码如下。

for (var i = 0; i <= 5; i++) {
  (function ieef(j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}
// 可以利用 IIFE（立即执行函数），当每次 for 循环时，把此时的变量 i 传递到定时器中，然后执行，改造之后的代码如下。
