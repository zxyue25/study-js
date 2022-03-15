// 冒泡排序是一次比较两个元素，如果顺序是错误的就把它们交换过来
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        // let temp = arr[j];
        // arr[j] = arr[i];
        // arr[i] = temp;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // 解构赋值交换

        // 二进制运算交互位置
        // arr[i] = arr[i] ^ arr[j];
        // arr[j] = arr[i] ^ arr[j];
        // arr[i] = arr[i] ^ arr[j];
      }
    }
  }
  return arr;
}

const arr = [5, 3, 7, 1, 8, 9, 2];

console.log(bubbleSort(arr));
