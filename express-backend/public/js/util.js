const { marked } = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    const value = hljs.highlight(code, { language }).value;
    return value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const handleArticleList = function(articleList) {
  const list = articleList.slice()
  const listLen = list.length

  for (let i = 0; i < listLen; i++) {
    const content = list[i].content.toString()
    const number = content.length
    const time = Math.floor(number / 700)
    const date = handleDate(list[i].date)
    
    list[i].readTime = `${number} 字约 ${time} 分钟`
    list[i].date = date
    list[i].content = content
  }

  return list
}

const handleDate = function (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const arr = [year, month, day]

  return arr.join('-')
}

const handleArticle = function(article) {
  const content = article.content.toString()
  const number = article.content.length
  const time = Math.floor(number / 700)
  const date = handleDate(article.date)
  
  article.readTime = `${number} 字约 ${time} 分钟`
  article.date = date
  article.content = marked.parse(content)

  return article
}

const handleArchivesList = function(articleList) {
  const list = articleList.slice()
  const map = new Map()
  const listLen = list.length

  for (let i = 0; i < listLen; i++) {
    const year = list[i].date.getFullYear()
    const content = list[i].content.toString()
    const number = content.length
    const time = Math.floor(number / 700)
    const date = handleDate(list[i].date)
    
    list[i].content = content
    list[i].readTime = `${number} 字约 ${time} 分钟`
    list[i].date = date

    if(map.has(year)) {
      map.get(year).push(list[i])
    } else {
      map.set(year, [list[i]])
    }

  }

  return map
}

module.exports = {
  handleArticleList,
  handleArticle,
  handleArchivesList
}