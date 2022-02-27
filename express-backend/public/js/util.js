const { marked } = require('marked');

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

const handleArticle = function(article) {
  const content = article.content
  const number = article.content.length
  const time = Math.floor(number / 150)
  const date = article.date
  const dateStr = getDate(date)
  
  article.readTime = `${number} 字约 ${time} 分钟`
  article.date = dateStr
  article.content = marked.parse(content)

  return article
}

function getDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return year + '-' + month + '-' + day
}

module.exports = {
  handleArticleList,
  handleArticle
}