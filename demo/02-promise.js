// Promise是一个构造函数, 可以new promise就可以创建一个对象
// 每个promise对象内部都会封装一个异步的操作
const fs = require('fs')

// promise有三种状态
let p = new Promise(function (resolve, reject) {
  // 封装一个异步任务
  fs.readFile('a.text', 'utf-8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

p
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) {
    console.log(err)
  })
