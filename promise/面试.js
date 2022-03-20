function httpRequest (url, options) {
    return Promise((resolve, reject) => {
        
    })
}

const reqMap = new Map()
const waitTime = 1000
    
function request(url, options) {
     const req = reqMap.get(url)
     if(req && Date.now() - req.time < waitTime){
         return reqMap.get(url).response
     } else {
         const res = {
             response: httpRequest(url, options),
             time: Date.now()
         }
         reqMap.set(url, res)
     }
}


// `${val}`

function template (str, context) {
    while(str.test(/^\$\{w+\}$/)){
        str.replace(/^\$\{(w+)\}$/, context[$1])
    }
    return str  
}