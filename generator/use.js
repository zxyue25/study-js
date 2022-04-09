// 基本使用
function* helloWordgenerator() {
  console.log("init");
  yield "hello";
  console.log("log hello");
  yield "word";
  console.log("log word");
  return "end";
}

console.log("start");
const hwg = helloWordgenerator();
console.log(hwg.next());
console.log(hwg.next());
console.log(hwg.next());
console.log(hwg.next());

// 不写yield，仅延迟执行
function* f() {
  console.log("执行了！");
}

f().next();

// next方法还可以接受参数，向 Generator 函数体内输入数据
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
console.log(g.next());
console.log(g.next(2)); // 数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收

// 错误捕捉
function* gen(x) {
  try {
    var y = yield x + 2;
  } catch (e) {
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw("出错了");
// 出错了
