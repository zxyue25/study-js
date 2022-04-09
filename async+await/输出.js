var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a) // 因为在 await 内部实现了 generators ，generators 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
  a = (await 10) + a
  console.log('3', a)
}
b()
a++
console.log('1', a)
// 最后a变成了20


var a = 0;
var b = () => {
  new Promise((resolve) => resolve(10)).then((res) => {
    a = a + res;
    console.log("2", a);
  });

  new Promise((resolve) => {
    resolve(10);
  }).then((res) => {
    a = res + a;
    console.log("3", a);
  });
};

b();
a++;
console.log("1", a);


