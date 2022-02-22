function after(times, newFn){ // 闭包
    return () => {
        if(--times == 0 ){ // 执行三次才会执行newFn()
            newFn()
        }
    }
}

const fn = after(3, function(){ // 真正执行的函数
    console.log('really')
})

fn()
fn()
fn()