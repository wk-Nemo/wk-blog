var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'wkblog'
})

/* GET home page. */
router.get('/categoryList', function(req, res, next) {
  var sql = 'SELECT * FROM categories'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    res.send(result)
  })
});

module.exports = router;
