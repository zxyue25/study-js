class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  emit(eventName) {
    this.events[eventName] && this.events[eventName].forEach((cb) => cb());
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback && cb !== callback.initalCallback
      );
    }
  }

  once(eventName, callback){
      const onceCallback = (...args) => {
          callback(...args)
          this.off(eventName, onceCallback)
      }
      onceCallback.initalCallback = callback
      this.on(eventName, onceCallback)
  }
}

let em = new EventEmitter();

function workDay() {
  console.log("每天工作");
}
function makeMoney() {
  console.log("赚100万");
}
function sayLove() {
  console.log("向喜欢的人示爱");
}
em.on("money", makeMoney);
em.on("money", sayLove);
em.on("love", sayLove);
em.on("work", workDay);

em.emit("money");
