const binarySearch = (arr, num) => {
    let left = 0
    let right = arr.length - 1
    let mid = Math.floor((right + left) / 2)
    while (left + 1 < right) {
        if (arr[mid] === num) {
            return num
        }
        else if (arr[mid] < num) {
            left = mid
            mid = Math.floor((right + left) / 2)
        } else {
            right = mid
            mid = Math.floor((right + left) / 2)
        }
    }
    return arr[right] >= num ? num : arr[left]
}

const arr = [5, 10, 50, 53, 55]
console.log(binarySearch(arr, 55))