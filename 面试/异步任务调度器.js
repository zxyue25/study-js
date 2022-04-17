// 要求实现一个具有并发数量限制的异步任务调度器，可以规定最大同时运行的任务。
// 实现一个Scheduler类，使下面的代码能正确输出

// class Scheduler {
//   constructor(max) {
//     // 最大可并发任务数
//     this.max = max;
//     // 当前并发任务数
//     this.count = 0;
//     // 阻塞的任务队列
//     this.queue = [];
//   }

//   async add(fn) {
//     if (this.count >= this.max) {
//       // 若当前正在执行的任务，达到最大容量max
//       // 阻塞在此处，等待前面的任务执行完毕后将resolve弹出并执行
//       await new Promise((resolve) => this.queue.push(resolve));
//     }
//     this.count++;
//     const res = await fn();
//     this.count--;
//     this.queue.length && this.queue.shift()();
//     return res;
//   }
// }

class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }

  async add(fn) {
    if (this.count >= this.max) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.count++;
    const res = await fn();
    this.queue.length && this.queue.shift()();
    this.count--;
    return res;
  }
}
// 延迟函数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 同时进行的任务最多2个
const scheduler = new Scheduler(2);

// 添加异步任务
// time: 任务执行的时间
// val: 参数
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// 2
// 3
// 1
// 4
