Function.prototype.myApply = function (context = window, ...args) {
    // this-->func  context--> obj  args--> 传递过来的参数

    let key = Symbol('key')
    context[key] = this
    const result = context[key](args)
    delete context[key]
    return result
}
