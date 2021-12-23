var fs = require("fs")

var path = './blogs/Generator函数.md'
// 异步读取
fs.readFile(path, function (err, data) {
   if (err) {
       return console.error(err)
   }
   const articleStr = data.toString()
   const reg = /---/g
   const start = reg.exec(articleStr).index
   const end = reg.exec(articleStr).index
   const articleMsg = articleStr.slice(start, end + 3)
   console.log(articleMsg)
   console.log('--------------------------------')
   const articleContent = articleStr.slice(end + 3)
   console.log(articleContent)
});

// // 同步读取
// var data = fs.readFileSync(path);
// console.log("同步读取: " + data.toString());

// console.log("程序执行完毕。");