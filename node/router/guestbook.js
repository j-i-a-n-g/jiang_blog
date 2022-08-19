const express = require('express')
const router = express.Router()
const  { publishMessage, getAllmessage } = require('../moduels/blog_message/handlerMessage')

// 发布留言
router.post('/message', async (req, res) => {
  const result = await publishMessage(req.body)
  res.send(result)
})

// 获取所有留言数据
router.get('/getAll', async (req, res) => {
  const num = req.query
  const result = await getAllmessage(num)
  res.send(result)
})


module.exports = router