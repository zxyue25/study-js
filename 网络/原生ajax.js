/** 
 *  Ajax的原理简单来说是在用户和服务器之间加了—个中间层(AJAX引擎)，
通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。
使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据
**/

/** 1. 创建连接 **/
const xhr = new XMLHttpRequest();
/** 2. 连接服务器 **/
xhr.open("get", "url", true);
/** 3. 发送请求 **/
xhr.send();
/** 4. 接受请求 **/
xhr.onreadystatechange = function () {
  if ((xhr.readyState === 4 && xhr.status === 200) || xhr.status === 304) {
    console.log(xhr.responseText);
  }
};
