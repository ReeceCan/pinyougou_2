// Promise是一个构造函数, 可以new promise就可以创建一个对象
// 每个promise对象内部都会封装一个异步的操作
const fs = require('fs')

// promise有三种状态

function read (file) {
  return new Promise(function (resolve, reject) {
    // 封装一个异步任务
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

read('a.text')
  .then(function (data) {
    console.log(data)
    // 需要读取p2文件, 返回就行
    return read('b.text')
  })
  .then(data => {
    console.log(data)
    return read('c.text')
  })
  .then(data => {
    console.log(data)
    return read('d.text')
  })
  .then(data => {
    console.log(data)
  })
  .catch(function (err) {
    console.log(err)
  })
