const Promise = require('./promise-then')

// then中传递的函数判断成功和失败函数的返回结果
// 判断是不是promise，如果是promise，就采用他的状态
// 如果不是promise，直接经结果传递下去

// const p = new Promise((resolve, reject) => {
//     reject(1001)
// })

// p.then(data => {
//     console.log(data)
// }, err => {
//     console.log('err', err)
//     return 100
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log('err', err)
// })
// 输出结果
// 1001
// undefined

// ==================================================================
// 案例
// x跟promise2不能是一个东西

// const p = new Promise((resolve, reject) => {
//     resolve()
// })

// let promise2 = p.then(() => {
//     return promise2
// })

// promise2.then(null, err => {
//     console.log(err)
// })

// 输出结果：[TypeError: Chaining cycle detected for promise #<Promise>]


// ==================================================================
// 案例
// then函数的返回值还是一个promise
// const p = new Promise((resolve, reject) => {
//     resolve(100)
// })

// p.then(data => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('success')
//         }, 100)
//     })
// }, err => {
//     console.log(err)
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log(err)
// })
// 输出结果：success


// ==================================================================
// 案例
// then函数中的resolve还是promise
// const p = new Promise((resolve, reject) => {
//     resolve(100)
// })

// p.then(data => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve('success')
//                 }, 0)
//             }))
//         }, 100)
//     })
// }, err => {
//     console.log(err)
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log(err)
// })
// // 输出结果：success


// ==================================================================
// 案例
// then函数中的resolve和reject是可选参数
// const p = new Promise((resolve, reject) => {
//     reject(100)
// })

// p.then().then().then(data => {
//     console.log(data)
// }, err => {
//     console.log('err', err)
// })

// p.then(data => {return data}).then(data => {return data}).then(data => {
//     console.log(data)
// })

// p.then(null, err => { throw err }).then(null, err => { throw err }).then(null, err => {
//     console.log('err', err)
// })
// 输出结果：
// resolbe 100
// reject err 100