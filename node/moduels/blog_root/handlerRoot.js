const root = require('../mongoose/root')
const article = require('../mongoose/Article')

const rootLogin = async function({rootName, rootPass}) {
  const bol = await root.findOne({rootName : rootName})
  if(!bol) return {code:0, message: '查无此号'}
  if(bol.rootPass === rootPass) {
    return {code:1, message: '登录成功',data: bol}
  }
  return {code:0, message: '密码错误'}
}

const changeRootPass = async function(rootPass) {
  await root.updateOne({rootName: 'root'}, {rootPass: rootPass})
  return {code: 1, message: '修改密码成功'}
}

// 将文章所有信息存储到数据库
const saveArticle = async function({articleTitle,articleDesc,articleFileUrl,articleImgUrl,articleDate}) {
  const result = await article.create({
    articleTitle,
    articleDesc,
    articleFileUrl,
    articleImgUrl,
    articleDate
  })
  if(!result) return {code:0, message: '发表失败，请重试', data: ""}
  return {code:1, message: '发表成功', data: result}
}

// 获取所有文章列表
const getArticleList = async function() {
  const data = await article.find({},{},{sort: {articleDate: -1}})
  return {code:1, message: "获取文章数据成功", data: data}
}

module.exports = {
  rootLogin,
  changeRootPass,
  saveArticle,
  getArticleList
}