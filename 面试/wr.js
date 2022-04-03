/* *
Gets the value at path of object. If the resolved value is undefined, 
the defaultValue is returned in its place 
* @param (Object) object 
* @param (String|Array) path 
* @param (any | undefined) defaultValue * @return (any) value 
*/

var object = {
    'a': [{ 'b': { 'c': 3 } }]
};

console.log(_get(object, 'a[0].b.c'))
// => 3
console.log(_get(object, ['a', '0', 'b', 'c']));
// => 3 
console.log(_get(object, 'a.b.c', 'default'));
// => 'default'

function _get (object, path, defaultValue) {
    let realPath = path
    let res = object
    if (typeof path === 'string') {
        realPath = path.split(".")
    }
    for (let i = 0; i < realPath.length; i++) {
        let key = realPath[i]
        if (key.indexOf('[') !== -1) {
            const keys = key.split("[")
            for (let j = 0; j < keys.length; j++) {
                const subKey = keys[j].replace(']', '')
                if (res[subKey]) {
                    res = res[subKey]
                } else {
                    return defaultValue
                }
            }
        } else {
            if (res[key]) {
                res = res[key]
            } else {
                return defaultValue
            }
        }
    }
    return res
}
