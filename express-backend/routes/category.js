var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var util = require('../public/js/util')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'wkblog'
})

// GET category list 
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

// GET article list by category
router.get('/:category', function (req, res) {
  const category = req.params.category
  const searchSql = 'SELECT * FROM articles WHERE categories = ' + '\'' + category + '\' ORDER BY date DESC'
  console.log(searchSql)

  connection.query(searchSql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    const list = util.handleArticleList(result)
    res.send(list)
  })
})


module.exports = router;
