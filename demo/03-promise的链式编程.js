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

let p1 = new Promise(function (resolve, reject) {
  // 封装一个异步任务
  fs.readFile('b.text', 'utf-8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
let p2 = new Promise(function (resolve, reject) {
  // 封装一个异步任务
  fs.readFile('c.text', 'utf-8', (err, data) => {
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
    // 需要读取p2文件, 返回就行
    return p2
  })
  .then(data => {
    console.log(data)
    return p3
  })
  .then(data => {
    console.log(data)
  })
  .catch(function (err) {
    console.log(err)
  })
