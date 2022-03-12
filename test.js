function debounce(fn, waitTime){
    let timer = null
    const context = this
    // const 
    return function() {
        timer = setTimeout(() => {
            
        }, waitTime)
       

    }

}

function throttle(fn, waitTime){
    let preTime = Date.now()
    const context = this
    const args = arguments
    return function(){
        let nowTime = Date.now()
        if(preTime - nowTime >= waitTime){
            preTime = Date.now()
            return fn.apply(context, args)
        }
    }
}