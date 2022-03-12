function create(fn, ...args){
    if(typeof fn !== 'function'){
        throw new TypeError('error')
    }
    // 1、用new Object() 的方式新建了一个对象obj
    let obj = Object.create()
    // 2、给该对象的__proto__赋值为fn.prototype，即设置原型链
    obj.__proto__ = fn.prototype
    // 3、执行fn，并将obj作为内部this。使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
    let res = fn.apply(obj, args)
    // 4、如果fn有返回值，则将其作为new操作返回内容，否则返回obj
    return res instanceof Object ? res : obj
}

function create(fn, ...args){
    let obj = Object.create()
    obj.__proto__ = fn.prototype
    const res = fn.apply(obj, args)
    return res instanceof Object ? res : obj
}