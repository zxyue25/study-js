Promise.resolve(1)
  .then((num) => {
    console.log(num);
  })
  .catch((num) => {
    return num + 1;
  })
  .then((num) => {
    console.log(num);
  });

new Promise(() => {
    console.log('new promise')
}).then(() => {
    console.log('resolve')
})

Promise.reject(1)
  .then((num) => {
    console.log(num);
  })
  .catch((num) => {
    return num + 1;
  })
  .then((num) => {
    console.log(num);
  });
