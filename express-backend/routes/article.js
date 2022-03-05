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

/* GET home page. */
router.get('/articleList', function(req, res, next) {
  var sql = 'SELECT id, title, categories, date, imgSrc, introduce, content FROM articles ORDER BY date DESC'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    const list = util.handleArticleList(result)
    res.send(list)
  })
});

router.get('/friendLink', function(req, res, next) {
  const sql = `SELECT * FROM articles WHERE title = '友链'`

  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }

    res.send(result)
  })
});

router.get('/archivesList', function(req, res, next) {
  var sql = 'SELECT id, title, categories, date, imgSrc, introduce, content FROM articles ORDER BY date DESC'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    const map = util.handleArchivesList(result)
    const archivesList = []
    let len = 0
    for (var key of map.keys()) {
      archivesList.push({
        year: key,
        list: map.get(key)
      });
      len += map.get(key).length
    }
    res.send({
      msg: "success",
      data: archivesList,
      len
    })
  })
})

router.get('/:id', function(req, res, next) {
  const id = req.params.id
  var sql = 'SELECT * from articles where id = ' + id

  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    const article = util.handleArticle(result[0])
    res.send(article)
  })
});

module.exports = router;
