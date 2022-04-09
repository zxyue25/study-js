// `${val}`
// replace不会改变原字符串
// 正则表达式：. 匹配除换行符 \n 之外的任何单字符；* 匹配前面的子表达式零次或多次； ? 匹配前面的子表达式零次或一次，或指明一个非贪婪限定符
// function template(str, context) {
//   return str.replace(/\$\{(.*?)\}/g, (match, key) => {
//     return context[key]
//   });
// }

function template(str, context){
    return str.replace(/\$\{(.*?)\}/g, (match, key) => {
        return context[key]
    })
}

let str = "你爱我，我爱你，${line1}甜蜜蜜。你爱我，我爱你，${line2}${line3}。";
let obj = {
  line1: "我学编程",
  line2: "你学编程",
  line3: "天灭你",
};
console.log(template(str, obj));
