function throttle(fn, waitTime) {
  let preTime = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    let nowTime = Date.now();
    if (nowTime - preTime >= waitTime) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

