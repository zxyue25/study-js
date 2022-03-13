// 手动遍历、递归
function flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

// reduce
function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

// 扩展运算法实现
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// split toString
// 缺点是数字转为了字符串
function flatten(arr) {
  return arr.toString().split(",");
}

// ES6的flat
// arr.flat([depth])
// 其中 depth 是 flat 的参数，depth 是可以传递数组的展开深度（默认不填、数值是 1），即展开一层数组
// 参数也可以传进 Infinity，代表不论多少层都要展开。
function flatten(arr) {
  return arr.flat(Infinity);
}
