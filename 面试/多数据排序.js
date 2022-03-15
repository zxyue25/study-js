// [{ price: 1, size: 2 }, { price: 2, size: 2 }, { price: 1, size: 1 }]]
// 依次按照price、size降序排序
function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].price === arr[j].price && arr[i].size < arr[j].size) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            } else if (arr[i].price < arr[j].price) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

const arr = [
    { price: 1, size: 2 },
    { price: 2, size: 2 },
    { price: 1, size: 1 },
    { price: 3, size: 2 },
    { price: 3, size: 3 }
];
console.log(sort(arr));
