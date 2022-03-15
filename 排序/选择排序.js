// 时间复杂度：O(n 平方)
// 选择排序是一种简单直观的排序算法。它的工作原理是，首先将最小的元素存放在序列的起始位置
// 再从剩余未排序元素中继续寻找最小元素，然后放到已排序的序列后面……以此类推，直到所有元素均排序完毕
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] >= arr[j]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

const arr = [5, 3, 7, 1, 8, 9, 2];

console.log(selectSort(arr));
