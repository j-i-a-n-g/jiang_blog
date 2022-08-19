const express = require('express')
const router = express.Router()
const { addUserLink, getAllLink, getUserLink } = require('../moduels/blog_link/handlerLink')

// 申请创建友链或者修改友链
router.post('/userLink',  async(req, res) => {
  const data = req.body
  const id = req.session.userSession._id
  const result = await addUserLink(data, id)
  res.send(result)
})

// 获取所有友链列表
router.get('/getAllLink', async(req, res) => {
  const result = await getAllLink()
  res.send(result);
})

// 获取当前用户的友链信息
router.get('/getUserLink', async (req, res) => {
  const {_id} = req.session.userSession
  // console.log(_id);
  const result = await getUserLink(_id)
  res.send(result)
})

module.exports = router