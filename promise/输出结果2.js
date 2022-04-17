console.log(1);

let b = new Promise((resolve, reject) => {
  console.log(2);
}).then((x) => {
  console.log(3);
});

setTimeout(() => {
  console.log(4);
}, 100);

let c = async () => {
  setTimeout(() => {
    new Promise((resolve, reject) => {
      console.log(6);
    });
  }, 0);
  let x = await new Promise((resolve, reject) => {
    console.log(5);
    resolve(7);
  });
  console.log(x);
  console.log(8);
};

console.log(9);
c();
console.log(10);

// console.log(1);

// let b = new Promise((resolve, reject) => {
//   console.log(2);
// }).then((x) => {
//   console.log(3);
// });

// setTimeout(() => {
//   console.log(4);
// }, 100);

// let c = () => {
//   setTimeout(() => {
//     new Promise((resolve, reject) => {
//       console.log(6);
//     });
//   }, 0);
//   new Promise((resolve, reject) => {
//     console.log(5);
//     resolve(7);
//   }).then((res) => {
//     console.log(res);
//     console.log(8);
//   });
// };

// console.log(9);
// c();
// console.log(10);

// 1
// 2
// 9
// 5
// 10
// 7
// 8
// 6
// 4
