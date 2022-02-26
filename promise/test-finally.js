const Promise = require('./promise-finally')

// const p = new Promise((resolve, reject) => {
//     resolve(100)
// })

// p.finally(() => {
//     console.log('finally')
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log('err', err)
// })
// 输出结果
// finally
// 100

// const p = new Promise((resolve, reject) => {
//     reject(100)
// })

// p.finally(() => {
//     console.log('finally')
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log('err', err)
// })
// 输出结果
// finally
// err 100

// const p = new Promise((resolve) => {
//     resolve(100)
// })

// p.finally(() => {
//     console.log('finally')
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve()
//         }, 4000)
//     })
// }).then(data => {
//     console.log(data)
// })
// 输出结果
// finally
// 100
// 等四秒钟结束

Promise.resolve(1).then(data => console.log(data))
// 输出1

Promise.resolve(new Promise((_, reject) => {
    reject(200)
})).then(data => console.log(data), err => console.log('err', err))
// 输出err 200