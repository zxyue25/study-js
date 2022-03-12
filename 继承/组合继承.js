// 组合继承
function Parent(val) {
  this.val = val;

  this.getVal = function () {
    console.log(this.val);
  };
}

function Child(...args) {
  Parent.apply(this, args);//
}

Child.prototype = new Parent()//

//  这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费


