// 考察Map用法
function httpRequest(url, options) {
  return Promise((resolve, reject) => {});
}

const reqMap = new Map();
const waitTime = 1000;

function request(url, options) {
  if (reqMap.has(url)) {
    const req = reqMap.get(url);
    if (Date.now() - req.time < waitTime) {
      return reqMap.get(url).response;
    }
  } else {
    const res = {
      response: httpRequest(url, options),
      time: Date.now(),
    };
    reqMap.set(url, res);
  }
}
