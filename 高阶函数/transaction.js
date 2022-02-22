
function perform (anyMethod, wrappers) {
    return () => {
        wrappers.forEach(wrapper => {
            wrapper.initialize()
        });
        anyMethod()
        wrappers.forEach(wrapper => {
            wrapper.close()
        })
    }
}

const newFn = perform(function () {
    console.log('say')
}, [
    {
        initialize () {
            console.log('wrapper1 beforeSay')
        },
        close () {
            console.log('wrapper1 close')
        }
    },
    {
        initialize () {
            console.log('wrapper2 beforeSay')
        },
        close () {
            console.log('wrapper2 close')
        }
    }
])

newFn()
// 执行结果
// wrapper1 beforeSay
// wrapper2 beforeSay
// say
// wrapper1 close
// wrapper2 close