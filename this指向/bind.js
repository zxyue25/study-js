Function.prototype.myBind = function (context) {
    // 只有有Function原型对象才有此方法
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    const _this = this
    const args = [...arguments].slice(1)
    // 返回一个函数
    return function F () {
        // 因为返回了一个函数，我们可以 new F()，所以需要判断
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}

Function.prototype.mtBind = function (context) {
    let _this = this

    if (typeof _this !== 'function') {
        throw new TypeError('Error')
    }

    const args = [...arguments].slice(1)

    return function Fn () {
        if (_this instanceof Fn) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }


}