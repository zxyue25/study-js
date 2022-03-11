// 防抖
function debounce (fn, waitTime) {
    let timer = null
    return function () {
        const context = this
        const args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, waitTime)
    }
}
