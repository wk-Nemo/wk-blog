var fs = require("fs")
var mysql = require('mysql');
var path = require("path")

const root = path.join(__dirname, 'blogs')

fs.readdir(root, function (err, files) {
   if (err) {
       return console.error(err);
   }

   files.forEach(function(filename) {
     const filePath = path.join(root, filename)
     parseMD(filePath)
   })
});

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
        
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'wkblog'
        })
        connection.connect()
        //    const insertSql = 'INSERT INTO articles (title, categories, date, read, imgSrc, introduce, content) VALUES(?,?,?,?,?,?,?)'
        //    const insertParams = [articleTitle, articleDate, articleCategories, articleRead, articleImgSrc, articleIntroduce, articleContent]
        const insertSql = 'INSERT INTO articles (title, categories, date, imgSrc, introduce, content) VALUES(?,?,?,?,?,?) '
        const insertParams = [articleTitle, articleCategories, articleDate, articleImgSrc, articleIntroduce, articleContent]
        connection.query(insertSql, insertParams, function (err, result) {
            if (err) {
            console.log('[INSERT ERROR] - ', err.message)
            return
            }
        
            console.log('--------------------------INSERT----------------------------');
            console.log(result)
            console.log('------------------------------------------------------------\n\n');
        })
        connection.end();
    });
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
    const introduceStart =  regIntroduce.exec(articleStr)
    
    let articleTitle
    let articleDate
    let articleCategories
    let articleImgSrc
    let articleIntroduce
    let articleContent
 
    articleContent = articleStr.slice(end + 3)
    if(titleStart) articleTitle = getData(articleMsg, titleStart.index + 7)
    if(dateStart) articleDate = getData(articleMsg, dateStart.index + 6)
    if(categoriesStart) articleCategories = getData(articleMsg, categoriesStart.index + 12)
    if(imgSrcStart) {
        articleImgSrc = getData(articleMsg, imgSrcStart.index + 8)
    } else {
        articleImgSrc = 'https://liuyib.github.io/assets/banner/1.jpg'
    } 
    if(introduceStart) {
        articleIntroduce = getData(articleMsg, introduceStart.index + 11)
    } else {
        articleIntroduce = articleContent.slice(0, 150)
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
    for(let i = end; i < str.length; i++) {
        if(str[i] === '\n') {
            end = i
            break;
        }
    }
    return str.slice(start, end)
}

