Function.prototype.myCall = function (context) {
    context = context || window
    // 给 context 添加一个属性
    // getValue.call(a, 'pp', '24') => a.fn = getValue
    context.fn = this
    // 将 context 后面的参数取出来
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myCall = function(context = window, ...args){
    const key = Symbol('key')
    context[key] = this
    const result = context[key](...args)
    delete context[key]
    return result
}