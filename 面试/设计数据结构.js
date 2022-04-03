// public class SmartCollection {
//     public void add (int num);
//     //返回当前集合中小于等于target的最大值      
//     public int query (int target);
// }
// 举例：  add(5)  add(100)  add(50)  query(55) -> 50  add(53)  query(55) -> 53  query(5) -> 5

class SmartCollection {
    arr = []
    add (num) {
        this.arr.push(num)
        this.arr.sort((a, b) => a - b)
    }
    query (num) {
        let left = 0
        let right = this.arr.length - 1
        let mid = Math.floor((left + right) / 2)
        while (left + 1 < right) {
            if (this.arr[mid] === num) {
                console.log(num)
                return num
            } else if (this.arr[mid] < num) {
                left = mid
                mid = Math.floor((left + right) / 2)
            } else {
                right = mid
                mid = Math.floor((left + right) / 2)
            }
        }
        const res = this.arr[right] <= num ? this.arr[right] : this.arr[left]
        console.log(res)
        return res
    }
}

const sc = new SmartCollection()
sc.add(5)
sc.add(100)
sc.add(50)
sc.query(55)  // 50
sc.add(53)
sc.query(55) // 53  
sc.query(5)  // 5