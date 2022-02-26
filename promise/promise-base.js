const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

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