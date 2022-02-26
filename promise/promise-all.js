const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'


const resolvePromise = (promise2, x, resolve, reject) => {
    let called
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x,
                    y => {
                        if (called) {
                            return
                        }
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) {
                            return
                        }
                        called = true
                        reject(r)
                    })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) {
                return
            }
            called = true
            reject(e)
        }

    } else {
        resolve(x)
    }

}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolveCallbacks = []
        this.onRejectCallbacks = []

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then (onFulfilled, onReject) {

        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onReject = typeof onReject === 'function' ? onReject : err => { throw err }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onReject(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === PENDING) {
                this.onResolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (e) {
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

const isPromise = (data) => {
    if (typeof data === 'object' && data !== null || typeof data === 'function') {
        if (typeof data.then === 'function') {
            return true
        }
    }
    return false
}

Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let arr = []
        let index = 0

        function processData (i, data) {
            arr[i] = data
            if (++index === values.length) { // 不能用arr.length === values.length；因为values中有异步promise的话，arr不会按照顺序被塞进返回值
                resolve(arr)
            }
        }
        for (let i = 0; i < values.length; i++) {
            let current = values[i]
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

module.exports = Promise


// defer 别名deferred，延迟对象
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
