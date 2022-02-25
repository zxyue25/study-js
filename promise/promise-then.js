const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

const resolvePromise = (promise2, x, resolve, reject) => {
    let called; // 调用成功或者失败后，在调用就需要忽略，虽然我们this.status已经做了限制，但是可能是其他promise调用的本构造函数

    if (promise2 === x) {
        // 判断x的值与promise是否是同一个，如果是同一个，就不用等待了，直接出错即可
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            let then = x.then // 取then可能这个then属性是通过defineProperty来定义的，可能报错
            if (typeof then === 'function') { // 当有then方法，则认为x是一个promise
                then.call(x, y => {
                    if (called) { // 防止多次调用成功或者失败
                        return
                    }
                    called = true
                    // y可能还是一个promise值，递归，直到解析出来的值是一个普通值
                    resolvePromise(promise2, y, resolve, reject) // 采用promise的成功结果将值下传递
                }, r => {
                    if (called) {
                        return
                    }
                    called = true
                    reject(r) // 采用失败结果将值向下传递
                })
            } else {
                resolve(x) // x是一个普通对象，比如{then: 1}
            }
        } catch (e) {
            if (called) {
                return
            }
            called = true
            reject(e)
        }
    } else {
        resolve(x) // x是一个普通值，直接成功即可
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined // 成功的值
        this.reason = undefined // 失败原因

        // 处理异步
        this.onFulfilledCallbacks = []
        this.onRejectCallbacks = []

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
        } catch (e) {
            console.log(e)
            reject(e) // 如果立即执行函数发生错误等价于调用失败函数
        }
    }

    then (onFulfilled, onReject) {
        // onFulfilled、onReject是可选参数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onReject = typeof onReject === 'function' ? onReject : err => { throw err }

        let promise2 = new Promise((resolve, reject) => {
            // 同步
            if (this.status === RESOLVED) {
                // 写setTimeout，利用eventLoop，宏任务，代码块延迟执行，等new完promise2
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        // x可能是普通值，也可能是promise
                        // 判断x的值 => promise2的状态
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
}

module.exports = Promise


