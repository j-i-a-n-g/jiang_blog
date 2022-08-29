const root = require('../mongoose/root')
const article = require('../mongoose/Article')
const path = require('path')
const fs = require('fs')

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
    articleDate,
    articleHot: false
  })
  if(!result) return {code:0, message: '发表失败，请重试', data: ""}
  return {code:1, message: '发表成功', data: result}
}

// 获取所有文章列表
const getArticleList = async function(num) {
  const total = await article.find({},{},{sort: {articleDate: -1}})
  const length = total.length
  if(num) {
    const data = await article.find({},{},{skip:(num-1)*3,limit:3, sort: {articleDate: -1}})
    return {code:1, message: "获取文章数据成功", result: {data, total: length}}
  }
  const data = await article.find({},{},{sort: {articleDate: -1}})
    return {code:1, message: "获取文章数据成功", result: data}
}

// 修改文章推荐状态
const changeArticleHot = async function({_id, articleHot}) {
  const bol = await article.findById({_id: _id})
  if(!bol) return {code:0, message: '查无此文章'}
  await article.updateOne({_id: _id}, {articleHot: articleHot})
  return {code: 1, message: '设置文章推荐状态成功'}
}

// 替换文章的封面图片
const deleteOldArticleImg = async function({articleImgUrl, id}, url) {
  if(articleImgUrl !== '/img/avatar.png') {
    fs.unlinkSync(path.resolve(__dirname, '../../public' + articleImgUrl))
  }
  await article.updateOne({_id: id},{articleImgUrl: url})
}
// 删除文章
const deleteArticleById = async function(id) {
  await article.deleteOne({_id: id})
  return { code:1, message: '删除文章成功' }
}

// 修改文章内容
const reviseArticle = async function(data) {
  await article.updateOne({_id: data._id}, {
    articleTitle: data.articleTitle,
    articleDesc: data.articleDesc
  })
  return {code:1, message: '修改文章成功'}
}

module.exports = {
  rootLogin,
  changeRootPass,
  saveArticle,
  getArticleList,
  changeArticleHot,
  deleteArticleById,
  reviseArticle,
  deleteOldArticleImg
}