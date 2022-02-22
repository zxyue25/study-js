// AOP 面向切片编程，用来重写一些原生方法
function say (who) {
    // todo... // 不直接改，污染了say
    console.log(who + "说话")
}

Function.prototype.before = function (beforeFn) {
    // this = say
    return (...args) => { // 箭头函数没有this，没有argument，没有原型
        beforeFn()
        this(...args)
    }
}

const newFn = say.before(function () {
    console.log("说话前")
})

newFn('我') // 看调用函数之前的上下文

// 执行结果
// 说话前
// 我说话