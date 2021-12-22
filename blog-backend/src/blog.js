var express = require('express');
var app = express();
var mysql = require('mysql');

//解决跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http:localhost//%s:%s", host, port)
})

// app.get('/types', function (req, res) {
//   console.log("types GET 请求")
//   connection.connect();

//   var sql = 'SELECT * FROM type'
  
//   connection.query(sql, function (err, result) {
//     if(err) {
//       console.log('[SELECT ERROR] - ',err.message)
//       return
//     }

//   console.log('--------------------------SELECT TYPES----------------------------');
//   console.log(result)
//   res.send(result)
//   console.log('------------------------------------------------------------\n\n');
//   });

//   connection.end();
// })

app.get('/articles', function(req, res) {
  console.log("types GET 请求")
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'wkblog'
  })
  connection.connect()

  var sql = 'SELECT * FROM articles'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }

  console.log('--------------------------SELECT ARTICLE----------------------------');
  console.log(result)
  res.send(result)
  console.log('------------------------------------------------------------\n\n');
  });

  connection.end();
})