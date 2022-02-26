---
highlight: a11y-dark
---

「这是我参与2022首次更文挑战的第8天，活动详情查看：[2022首次更文挑战](https://juejin.cn/post/7052884569032392740?utm_source=feed_5&utm_medium=feed&utm_campaign=gengwen202201_yq#heading-3 "https://juejin.cn/post/7052884569032392740?utm_source=feed_5&utm_medium=feed&utm_campaign=gengwen202201_yq#heading-3")」

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8042c15f0da24ed8a6184868143eb20c~tplv-k3u1fbpfcp-watermark.image?)

## 0、前提
我们想要手写一个`Promise`，就要遵循 [Promise/A+](https://link.juejin.cn/?target=https%3A%2F%2Fpromisesaplus.com%2F "https://promisesaplus.com/") 规范，业界所有 `Promise`的类库都遵循这个规范

本篇文章写**如何手写promise及其周边方法**，每个方法从`“定义->案例->实现”`的思路展开
- `定义`主要参考的阮一峰老师的 [ECMAScript 6 入门promise章节](https://es6.ruanyifeng.com/)
- `案例`为最基础的自己手写的，保证简单易懂
- `实现`结合 [Promise/A+](https://link.juejin.cn/?target=https%3A%2F%2Fpromisesaplus.com%2F "https://promisesaplus.com/") 规范实现

> 阅读本文前建议熟悉阮一峰老师的 [ECMAScript 6 入门promise章节](https://es6.ruanyifeng.com/)，清楚promise的语法

## 1、基本封装
### 1.1 基本
**定义**
- `Promise`对象是一个构造函数，用来生成`Promise`实例
- `Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署
- `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
- `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
- `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数
**实现**

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined // 成功的值
        this.reason = undefined // 失败原因

        // 成功函数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        // 失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject) // 默认执行器立即执行
        }
        catch (e) {
            reject(e) // 如果立即执行函数发生错误等价于调用失败函数
        }
    }
    
    then (onFulfilled, onReject) {
        // 同步
        if (this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onReject(this.reason)
        }

        // 异步订阅
        if (this.status === PENDING) { 
            this.onFulfilledCallbacks.push(() => onFulfilled(this.value))
            this.onRejectCallbacks.push(() => onReject(this.reason))
        }
    }
}

module.exports = Promise
```

### 1.2 promise参数入参是一个异步操作
**现象**

在 `executor()`中传入一个`异步操作`
```js
const promise = new Promise((resolve, reject) => {
    // 异步的情况
    setTimeout(() => {
        reject(1)
    }, 1000)
})

promise.then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
})
// 输出结果 err 1
```
**实现**
`promise`调用`then`方法时，当前的`promise`并没有成功，一直处于`pending`状态，所以如果当调用 `then`方法时，当前状态是`pending`，需要`先将成功和失败的回调分别存放起来`，在`executor()`的异步任务被执行时，`触发resolve或reject，依次调用成功或失败的回调`
```js
class Promise {
    constructor(executor) {
        ...
        // 处理异步
        this.onFulfilledCallbacks = []
        this.onRejectCallbacks = []

        // 成功函数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
              ++this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        // 失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
              ++this.onRejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject) // 默认执行器立即执行
        }
        catch (e) {
            reject(e) // 如果立即执行函数发生错误等价于调用失败函数
        }
    }
    
    then (onFulfilled, onReject) {
        ...
        // 异步订阅
        if (this.status === PENDING) { 
            this.onFulfilledCallbacks.push(() => onFulfilled(this.value))
            this.onRejectCallbacks.push(() => onReject(this.reason))
        }
    }
}
```

## 2、Promise.prototype.then
### 2.1 then的链式调用
**定义**
> `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法
**现象**

下面的代码使用`then`方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数

```js
const p = new Promise((resolve, reject) => {
    resolve(1001)
})

p.then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
}).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
// 输出结果
// 1001
// undefined
```

**实现**

定义一个新的**promise实例** `promise2`，并返回

`then`函数的返回值可能值一个`普通值`，也可能是`一个对象`，因此需要根据`x`的类型去处理`then`，引入`resolvePromise`方法统一处理，具体可看下一节2.2

为什么要用`setTimeout`：利用`eventLoop`，宏任务，代码块延迟执行，等`new完promise2`，不然`resolvePromise(promise2, x, resolve, reject)`中`取不到promise2会报错`
```js
then (onFulfilled, onReject) {
    let promise2 = new Promise((resolve, reject) => {
        // 同步
        if (this.status === RESOLVED) {
            // 写setTimeout，利用eventLoop，宏任务，代码块延迟执行，等new完promise2
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }
        if (this.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onReject(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }

       // 异步订阅
       if (this.status === PENDING) {
           this.onFulfilledCallbacks.push(() => {
               setTimeout(() => {
                   try {
                       let x = onFulfilled(this.value)
                       resolvePromise(promise2, x, resolve, reject)
                   } catch (e) {
                       reject(e)
                   }
               }, 0)
           })
           this.onRejectCallbacks.push(() => {
               setTimeout(() => {
                   try {
                       let x = onReject(this.reason)
                       resolvePromise(promise2, x, resolve, reject)
                   }
                   catch (e) {
                       reject(e)
                   }
               }, 0)
           })
       }
    })
    return promise2
}
```


### 2.2 then函数返回值类型
> 前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该`Promise`对象的状态发生变化，才会被调用

##### （1）x跟promise2不能只一个东西
**现象**

如下代码，**promise2的then函数返回值为promise2**

输出结果是`[TypeError: Chaining cycle detected for promise #<Promise>]`
```js
// x跟promise2不能是一个东西
const p = new Promise((resolve, reject) => {
    resolve()
})

let promise2 = p.then(() => {
    return promise2
})

promise2.then(null, err => {
    console.log(err)
})
```
**实现**

可以比喻为，A等A买菜回来，这是不可能的，所以直接报错
```js
const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        // 判断x的值与promise是否是同一个，如果是同一个，就不用等待了，直接出错即可
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
}
```
##### （2）x返回值可能是promise也可能是普通值
x可能的值
- promise
    - 执行x的then方法，返回相应值
- 普通值
    - 直接resolve 
**现象**
```js
// then函数的返回值还是一个promise
const p = new Promise((resolve, reject) => {
    resolve(100)
})

p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 100)
    })
}, err => {
    console.log(err)
}).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
// 输出结果：success

// then函数中的resolve还是promise
const p = new Promise((resolve, reject) => {
    resolve(100)
})

p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('success')
                }, 0)
            }))
        }, 100)
    })
}, err => {
    console.log(err)
}).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
// 输出结果：success
```
**实现**

先判断`x`是否是`object`或者`function`
- 是
    - 取`x`上的`then`
        - 取成功
            - 判断`then`是否是`function`
                - 是，执行`then`，`resolve成功函数y`，`reject失败函数r`，`成功函数y`可能还是一个`promise`，递归执行`resolvePromise(promise2, y, resolve, reject)`
                - 不是，说明`x`只是普通的对象，比如`{then: 1}`，直接`reslove(x)`
        - 取失败
            - 直接reject(e)
- 不是
    - `x`是**普通值**，直接`resolve(x)`
```js
const resolvePromise = (promise2, x, reslove, reject) => {
    ...
     if (typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            let then = x.then // 取then可能这个then属性是通过defineProperty来定义的，可能报错
            if (typeof then === 'function') { // 当有then方法，则认为x是一个promise
                then.call(x, y => {
                     // y可能还是一个promise值，递归，直到解析出来的值是一个普通值
                    resolvePromise(promise2, y, resolve, reject) // 采用promise的成功结果将值下传递
                }, reject => {
                    reject(x) // 采用失败结果将值向下传递
                })
            } else {
                resolve(x) // x是一个普通对象，比如{then: 1}
            }
        } catch (e) {
            reject(e)
        }
    } else {
        resolve(x) // x是一个普通值，直接成功即可
    }
}
```
##### （3）then的两个参数是可选的，如果不写默认resolve(data)
**定义**
>`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的
**现象**

如下代码，`p.then().then()`省略参数

- reslove时，最后一个`then`的`resolve`输出`data`依旧可以获取到数据
    - 其实相当于`p.then(data => {return data}).then(data => {return data})`

- reject时，最后一个`then`的`reject`输出`err`依旧可以获取数据
    - 其实相当于`p.then(null, err => { throw err }).then(null, err => { throw err })`

```js
// 案例
// then函数中的resolve和reject是可选参数
const p = new Promise((resolve, reject) => {
    resolve(100)
})

p.then().then().then(data => {
    console.log(data)
})

// p.then(data => {return data}).then(data => {return data}).then(data => {
//     console.log(data)
// })

// p.then(null, err => { throw err }).then(null, err => { throw err }).then(null, err => {
//     console.log('err', err)
// })

// 输出结果：
// resolbe 100
// reject err 100
```
**实现**
```js
then(onFulfilled, onReject){
    // onFulfilled、onReject是可选参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onReject = typeof onReject === 'function' ? onReject : err => { throw err }
    ...
}
```
## 3、检测Promise是否符合规范
`Promise/A+`规范提供了一个专门的测试脚本，可以测试所编写的代码是否符合Promise/A+的规范

**step1** 全局安装包[promises-aplus-tests](https://www.npmjs.com/package/promises-aplus-tests) 
```shell
npm i -g promises-aplus-tests
```
**step2** 在primes文件最下方写入以下内容
```js
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
```
**step3** 执行命令检测
```shell
promises-aplus-tests promise/promise.js
```
可以看到检测全部通过
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085246a46ab247cd8b3456acd8ea2ab2~tplv-k3u1fbpfcp-watermark.image?)

## 4、Promise.all
**定义**

- `Promise.all()`方法用于将多个Promise实例，包装成一个新的Promise实例
- `Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理
- `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况
    - 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
    - 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数
    
```js
const p = Promise.all([p1, p2, p3]);
```
**现象**
```js
Promise.all([1, 2, 3, 4]).then(data => {
    console.log(data)
})
// 输出 [ 1, 2, 3, 4 ]

Promise.all([1, 2, new Promise((resolve) => { resolve(300) }), 4]).then(data => {
    console.log(data)
})
// 输出 [ 1, 2, 300, 4 ]
```
**实现**
```js
const isPromise = (data) => {
    if (typeof data === 'object' && data !== null || typeof data === 'function') {
        if (typeof data.then === 'function') {
            return true
        }
    }
    return false
}

Promise.all = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let arr = []
        let index = 0

        function processData (i, data) {
            arr[i] = data
            if (++index === promiseArr.length) { // 不能用arr.length === promiseArr.length；因为promiseArr中有异步promise的话，arr不会按照顺序被塞进返回值
                resolve(arr)
            }
        }
        for (let i = 0; i < promiseArr.length; i++) {
            let current = promiseArr[i]
            if (isPromise(current)) {
                // 如果是promis，执行then
                current.then(data => {
                    processData(i, data)
                }, err => {
                    console.log(err)
                    reject(err)
                })
            } else {
                // 如果不是promise，直接返回
                processData(i, current)
            }
        }
    })
}
```
## 5、Promise.resolve & Promise.reject

**resolve**

将现有对象转为`Promise对象`
```js
Promise.resolve = function (value) {
    if (value instanceof Promise) return value
    return new Promise(resolve => resolve(value))
}
```
**reject**

会返回一个新的 Promise 实例，该实例的状态为`rejected`
```js
Promise.reject = function (reason) {
    return new Promise(_, reject => reject(reason))
}
```

## 6、Promise.prototype.finally
**定义**
- `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
- `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果

`finally`本质上是`then`方法的特例

```js
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```
**现象**
```js

const p = new Promise((resolve, reject) => {
    resolve(100)
})

p.finally(() => {
    console.log('finally')
}).then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
})
// 输出结果
// finally
// 100

const p = new Promise((resolve, reject) => {
    reject(100)
})

p.finally(() => {
    console.log('finally')
}).then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
})
// 输出结果
// finally
// err 100


const p = new Promise((resolve) => {
    resolve(100)
})

p.finally(() => {
    console.log('finally')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 4000)
    })
}).then(data => {
    console.log(data)
})
// 输出结果
// finally
// 等四秒钟
// 100
```

**实现**
```js
Promise.prototype.finally = function(callback){
    return this.then(
        data => Promise.resolve(callback()).then(() => data),
        err => Promise.resolve(callback()).then(() => {throw err} )
    )
}
```
## 7、Promise.prototype.catch
`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数
**现象**
```js
const p = new Promise((_, resolve) => {
    throw 'err'
}).catch((e) => {
    console.log(e)
})
// 输出 err
```
**实现**
```js
Promise.prototype.catch  = function (onRejected) {
    return this.then(null, onRejected);
}
```
## 8、Promise.race
**现象**
注意，下面代码第二个例子输出的是300，而非1
```js
Promise.race([1, new Promise((resolve) => { resolve(300) }), 2, 4]).then(data => {
    console.log(data)
})
// 输出 1


Promise.race([new Promise((resolve) => { resolve(300) }), 1, 2, 4]).then(data => {
    console.log(data)
})
// 输出 300
```

**实现**
```js
Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            const current = promiseArr[i];
            Promise.resolve(current).then(resolve, reject);
        }
    });
}
```


## 写在最后
本篇文章所有的代码在[github/zxyue25](https://github.com/zxyue25/study-js/tree/master/promise)

## 参考
- [ECMAScript 6 入门 promise章节](https://es6.ruanyifeng.com/#docs/promise)
- [珠峰手写promise](https://www.bilibili.com/video/BV1sZ4y1j71K/?spm_id_from=333.788.recommend_more_video.0)
- https://zhuanlan.zhihu.com/p/143699690
