var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'wkblog'
})

function getDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return year + '-' + month + '-' + day
}

const handleArticleList = function(articleList) {
  const list = articleList.slice()
  const listLen = list.length

  for (let i = 0; i < listLen; i++) {
    const number = list[i].content.length
    const time = Math.floor(number / 150)
    const date = list[i].date
    const dateStr = getDate(date)
    
    list[i].readTime = `${number} 字约 ${time} 分钟`
    list[i].date = dateStr
  }

  return list
}

/* GET home page. */
router.get('/articleList', function(req, res, next) {
  var sql = 'SELECT id, title, categories, date, imgSrc, introduce, content FROM articles ORDER BY date DESC'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    const list = handleArticleList(result)
    res.send(list)
  })
});

router.get('/blog', function(req, res, next) {
  res.send('article')
})

module.exports = router;
