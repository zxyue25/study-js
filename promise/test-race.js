const Promise = require('./promise-race')

Promise.race([1, new Promise((resolve) => { resolve(300) }), 2, 4]).then(data => {
    console.log(data)
})
// 输出 1


Promise.race([new Promise((resolve) => { resolve(300) }), 1, 2, 4]).then(data => {
    console.log(data)
})
// 输出 300

const p = new Promise((_, resolve) => {
    throw 'err'
}).catch((e) => {
    console.log(e)
})
// 输出err



