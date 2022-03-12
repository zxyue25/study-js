// const Promise = require('./promise-all')


// Promise.all([1, 2, 3, 4]).then(data => {
//     console.log(data)
// })
// 输出 [ 1, 2, 3, 4 ]

Promise.all([1, 2, new Promise((resolve) => { resolve(300) }), 4]).then(data => {
    console.log(data)
})
// 输出 [ 1, 2, 300, 4 ]

// Promise.all([1, 2, new Promise((_, reject) => { reject(300) }), 4]).then(data => {
//     console.log(data)
// })

// const p1 = new Promise((resolve, reject) => {
//     resolve('hello');
//   })
//   .then(res => res)
//   .catch(e => e);
  
//   const p2 = new Promise((resolve, reject) => {
//     throw new Error('报错了');
//   })
//   .then(res => res)
// //   .catch(e => e);
  
//   Promise.all([p1, p2])
//   .then(res => console.log(res))
// //   .catch(e => console.log(e));