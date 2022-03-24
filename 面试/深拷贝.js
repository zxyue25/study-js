export const deepClone = (target) => {
    if(typeof target !== 'object'){
      return target;
    }
    let cloneTarget = null;
    if (Array.isArray(target)) {
      cloneTarget = [];
      target.forEach((value, index) => {
        cloneTarget[index] = typeof value === 'object' && value !== null ? deepClone(value) : value;
      });
    } else {
      cloneTarget = {};
      Object.keys(target).forEach(key => {
        cloneTarget[key] = typeof target[key]  === 'object' && target[key] !== null ? deepClone(target[key]) : target[key];
      });
    }
    return cloneTarget;
  };
  
  var a = {a: 1, b: 2};
  a.c = a;