const Promise = require('./promise-base')

const promise = new Promise((resolve, reject) => {
    // 成功的情况
    // resolve(1)

    // 失败的情况
    // reject(1)
    
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

promise.then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
})

promise.then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
})