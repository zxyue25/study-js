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
