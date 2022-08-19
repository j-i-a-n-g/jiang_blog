const express = require('express')
const router = express.Router()
const email = require('../moduels/plugin/nodemailer')
const svg = require('../moduels/plugin/svgCaptcha')
const handlerUser = require('../moduels/blog_user/handlerUser')
const changeUserMessage = require('../moduels/blog_user/changeUsername')
const changeAvatar = require('../moduels/blog_user/changeAvatar')
const upload = require('../moduels/plugin/multer')
const multer  = require('multer')

// about页面提交邮箱信息的接口
router.post('/email', (req, res) => {
  const {data} = req.body
  console.log(data);
  const uname = data.Uname
  const address = data.address
  const topic = data.topic
  const content = data.content
  const callbackFun = function(value) {
    res.send(value)
  }
  email(address, topic, content, uname, callbackFun)
})

// 获取登录验证码
router.get('/getsvg', (req, res) => {
  const {text, data} = svg()
  res.send({code:1,text, data})
})

// 用户登录
router.post('/login', async (req, res) => {
  const {data} = req.body
  const result = await handlerUser(data)
  if(result.code) {
    req.session.userSession = result.data
  }
  res.send(result)
})

// 自动登录
router.post('/autologin', async (req, res) => {
  const data = req.session.userSession
  if(data) {
    res.send(data)
  }
  else {
    let data = {code: 0}
    res.send(data)
  }
})

// 退出登录
router.post('/logout', async (req, res) => {
  req.session.userSession = ''
  res.send({code: 1, message: '退出登录成功'})
})

// 修改用户名
router.post('/changeUsername', async (req, res) => {
  const data = req.body
  const result = await changeUserMessage(data)
  if(result.code) {
    req.session.userSession = result.data
  }
  res.send(result)
})

// 修改密码
router.post('/changePassword', async (req, res) => {
  const data = req.body
  const result = await changeUserMessage(data)
  if(result.code) {
    req.session.userSession = result.data
  }
  console.log(data);
  res.send(result)
})

// 修改用户头像
router.post('/changeAvatar',  (req, res) => {
    upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) { // 上传错误
    console.log('上传错误');
    } else if (err) {
    // 未知错误
    console.log('未知错误');
    }
    const { id } = req.body
    const avatar = req.session.userSession.userAvatar // 旧头像的地址
    const path = '/avatar/' + req.file.filename // 获取上传的文件的地址
    // 改数据库、session、删除旧头像图
    const result = await changeAvatar(id, path, avatar)
    req.session.userSession = result.data
    res.send(result)
  })
})

module.exports = router