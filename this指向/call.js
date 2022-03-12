Function.prototype.myCall = function (context) {
    context = context || window
    // 给 context 添加一个属性
    // getValue.call(a, 'pp', '24') => a.fn = getValue
    context.fn = this
    // 将 context 后面的参数取出来
    const args = [...arguments].slice(1)
    const res = context.fn(...args)
    delete context.fn
    return res
}

Function.prototype.myCall = function(context = window, ...args){
    const key = Symbol('key')
    context[key] = this
    const res = context[key](...args)
    delete context[key]
    return res
}