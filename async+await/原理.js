function asyncFun(generator) {
  const iterator = generator();
  const next = (data) => {
    let { value, done } = iterator.next(data);
    if (done) {
      return;
    } else {
      value.then((data) => {
        next(data);
      });
    }
  };
  next();
}

function readFile(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(file);
    }, 1000);
  });
}

asyncFun(function* () {
  let data = yield readFile("a.js");
  data = yield readFile(data + "b.js");
  return data;
});
