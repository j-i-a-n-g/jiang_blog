const root = require('../moduels/mongoose/root')
const express = require('express')
const router = express.Router()
const {rootLogin, changeRootPass, saveArticle, getArticleList, changeArticleHot, deleteArticleById, reviseArticle, deleteOldArticleImg } = require('../moduels/blog_root/handlerRoot')
const { changeHotLink, deleteLink } = require('../moduels/blog_link/handlerLink')
const upload = require('../moduels/plugin/multer')
const multer  = require('multer')
const fs = require('fs')
const path = require('path')
// 初始化root账号
router.get('/', async (req, res) => {
  const bol = await root.findOne({rootName: 'root'})
  if(bol) return root.updateOne({rootName: 'root'}, {rootPass: '123123'})
  await root.create({
    rootName: 'root',
    rootPass: '123123'
  })
})

// 登录root账号
router.post('/rootlogin', async (req, res) => {
  const data = req.body
  const result = await rootLogin(data)
  res.send(result)
})

// 修改root密码
router.post('/rootPassword', async (req, res) => {
  const {rootPass} = req.body
  const result = await changeRootPass(rootPass)
  res.send(result)
})

// 是否设为推荐友链
router.post('/isHotLink', async (req, res) => {
  const data = req.body
  const result = await changeHotLink(data)
  res.send(result)
})

// 删除友链
router.delete('/deleteLink', async (req, res) => {
  const id = req.query.id
  const result = await deleteLink(id)
  res.send(result)
})
// 上传文章文档
router.post('/uploadFile',async(req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) { // 上传错误
    res.send({code:0, message: '上传错误'})
    } else if (err) {
    // 未知错误
    res.send({code:0, message: '未知错误'})
    }
    let path = req.file.path
    let url = '/fulltext/' + req.file.filename
    res.send({code:1, message: '上传成功',data: {path, url}})
  })
})

// 删除上传的文章文档
router.post('/deleteFile', async(req, res) => {
  const path = req.body.path
  fs.unlinkSync(path)
  res.send({message: '移除文件成功'})
})

// 上传封面图片
router.post('/uploadArticleImg', async (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) { // 上传错误
    res.send({code:0, message: '上传错误'})
    } else if (err) {
    // 未知错误
    res.send({code:0, message: '未知错误'})
    }
    let path = req.file.path
    let url = '/avatar/' + req.file.filename
    res.send({code:1, message: '上传成功',data: {path, url}})
  })
}),

// 修改封面图片
router.post('/reviseArticleImg', async (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) { // 上传错误
    res.send({code:0, message: '上传错误'})
    } else if (err) {
    // 未知错误
    res.send({code:0, message: '未知错误'})
    }
    let path = req.file.path
    let url = '/avatar/' + req.file.filename
    deleteOldArticleImg(req.body, url)
    res.send({code:1, message: '上传成功',data: {path, url}})
  })
})

// 删除上传的文章封面图片
router.post('/deleteImg', async(req, res) => {
  const path = req.body.path
  fs.unlinkSync(path)
  res.send({message: '移除封面图片成功'})
})

// 将所有文章信息保存到数据库中
router.post('/saveArticle', async (req, res) => {
  const data = req.body
  const result = await saveArticle(data)
  res.send(result)
})

// 获取文章列表
router.get('/getArticlelist', async (req, res) => {
  const num = req.query.num
  const result = await getArticleList(num)
  res.send(result)
})

// 修改文章推荐状态
router.post('/changeArticleHot', async (req, res) => {
  const data = req.body
  const result = await changeArticleHot(data)
  res.send(result)
})

// 删除文章
router.delete('/deleteArticle', async (req, res) => {
  const id = req.query.id
  const result = await deleteArticleById(id)
  res.send(result)
})

// 修改文章内容
router.post('/reviseArticle',async (req, res) => {
  const data = req.body
  let url = path.resolve(__dirname, '../public'+ data.path)
  fs.writeFile(url, data.value, ()=> {})
  res.send({code:1,message:'保存成功'})
})

// 修改文章标题与简介
router.post('/revisetitle', async (req, res) => {
  const data = req.body
  const result = await reviseArticle(data)
  res.send(result)
})

module.exports = router