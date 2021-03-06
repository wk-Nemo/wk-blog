var fs = require("fs")
var mysql = require('mysql');
var path = require("path")

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'wkblog'
})
connection.connect()

function parse() {
    // 清空表格
    const emptyBlogSql = 'TRUNCATE TABLE articles'
    connection.query(emptyBlogSql, function (err) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            return
        }
    })

    const emptyCategoriesSql = 'TRUNCATE TABLE categories'
    connection.query(emptyCategoriesSql, function (err) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            return
        }
    })

    // 读取blogs
    const rootBlogs = path.join(__dirname, 'blogs')
    const blogs = fs.readdirSync(rootBlogs)
    blogs.forEach(function (filename) {
        const filePath = path.join(rootBlogs, filename)
        parseMDSync(filePath)
    })

    // 读取categories
    const rootCategories = path.join(__dirname, 'categories')
    const categories = fs.readdirSync(rootCategories)
    categories.forEach(function (filename) {
        const filePath = path.join(rootCategories, filename)
        parseCategoriesSync(filePath)
    })

    // 关闭数据库
    connection.end()
}

function parseMD(path) {
    fs.readFile(path, function (err, data) {
        if (err) {
            return console.error(err)
        }

        const Msg = getMsg(data)
        let articleTitle = Msg.articleTitle
        let articleDate = Msg.articleDate
        let articleCategories = Msg.articleCategories
        let articleImgSrc = Msg.articleImgSrc
        let articleIntroduce = Msg.articleIntroduce
        let articleContent = Msg.articleContent

        const insertSql = 'INSERT INTO articles (title, categories, date, imgSrc, introduce, content) VALUES(?,?,?,?,?,?) '
        const insertParams = [articleTitle, articleCategories, articleDate, articleImgSrc, articleIntroduce, articleContent]
        connection.query(insertSql, insertParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message)
                console.log(path)
                return
            }
        })
    })
}

function parseMDSync(path) {
    const data = fs.readFileSync(path)
    const Msg = getMsg(data)
    let articleTitle = Msg.articleTitle
    let articleDate = Msg.articleDate
    let articleCategories = Msg.articleCategories
    let articleImgSrc = Msg.articleImgSrc
    let articleIntroduce = Msg.articleIntroduce
    let articleContent = Msg.articleContent

    const insertSql = 'INSERT INTO articles (title, categories, date, imgSrc, introduce, content) VALUES(?,?,?,?,?,?) '
    const insertParams = [articleTitle, articleCategories, articleDate, articleImgSrc, articleIntroduce, articleContent]
    connection.query(insertSql, insertParams, function (err) {
        if (err) {
            console.log(articleTitle, ' [INSERT ERROR] - ', err.message)
            return
        }
        console.log('[SUCCESS]: read blogs：', articleTitle)
    })
}

function parseCategoriesSync(path) {
    const data = fs.readFileSync(path)
    const Msg = getMsg(data)
    let articleCategories = Msg.articleCategories

    const insertSql = 'INSERT INTO categories (name) VALUES(?) '
    const insertParams = [articleCategories]
    connection.query(insertSql, insertParams, function (err) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            return
        }

        console.log('[SUCCESS]: read categories')
    })
}

function getMsg(data) {
    const articleStr = data.toString()
    const reg = /---/g
    const regTitle = /title/g
    const regDate = /date/g
    const regCategories = /categories/g
    const regImgSrc = /imgSrc/g
    const regIntroduce = /introduce/g

    // 获取信息框
    const start = reg.exec(articleStr).index
    const end = reg.exec(articleStr).index
    const articleMsg = articleStr.slice(start, end + 3)

    // 获取数据开始位置
    const titleStart = regTitle.exec(articleMsg)
    const dateStart = regDate.exec(articleStr)
    const categoriesStart = regCategories.exec(articleStr)
    const imgSrcStart = regImgSrc.exec(articleStr)
    const introduceStart = regIntroduce.exec(articleStr)

    let articleTitle
    let articleDate
    let articleCategories
    let articleImgSrc
    let articleIntroduce
    let articleContent

    articleContent = articleStr.slice(end + 3)
    if (titleStart) articleTitle = getData(articleMsg, titleStart.index + 7)
    if (dateStart) articleDate = getData(articleMsg, dateStart.index + 6)
    if (categoriesStart) articleCategories = getData(articleMsg, categoriesStart.index + 12)
    if (imgSrcStart) {
        articleImgSrc = getData(articleMsg, imgSrcStart.index + 8)
    } else {
        articleImgSrc = 'https://liuyib.github.io/assets/banner/1.jpg'
    }
    if (introduceStart) {
        articleIntroduce = getData(articleMsg, introduceStart.index + 11)
    } else {
        articleIntroduce = articleContent.slice(0, 50)
    }

    return {
        articleTitle,
        articleDate,
        articleCategories,
        articleImgSrc,
        articleIntroduce,
        articleContent
    }
}

function getData(str, start) {
    let end = start + 1
    for (let i = end; i < str.length; i++) {
        // windows是CRLF换行，换行结尾是/r/n
        // linux是LF换行，换行结尾是/n
        if (str[i] === '\n' || str[i] === '\r') {
            end = i
            break;
        }
    }
    return str.slice(start, end)
}

parse()
