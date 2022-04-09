# generator
## 定义
- 是一个状态机、封装了多个内部状态
- 一个遍历器对象生成函数

是一个函数，但是有两个特征
- function 关键字与函数名之间有一个星号
- 函数体内部使用yield表达式，定义不同的内部状态

## 示例
```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
```
> 即该函数有三个状态：hello，world 和 return 语句

## 调用方法
跟普通函数一样
```js
helloWorldGenerator()
```
## 返回值
返回的不是函数运行结果，而是一个指向内部状态的**指针对象**

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态



