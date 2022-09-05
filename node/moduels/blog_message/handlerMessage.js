const guestbook = require('../mongoose/guestbook')

// 发布单个留言
const publishMessage = async function({message, id}) {
  const result = await guestbook.create({
    guestbook: message,
    publishDate: new Date(),
    // messageSort: Date.now(),
    userAbout: id
  })
  return {code: 1, message: '发布留言成功',data: result}
}
// 获取所有留言
const getAllmessage = async function({skip}) {
  const data = await guestbook.find({},{},{skip: parseInt(skip),limit: 10, sort: {publishDate: -1}}).populate('userAbout', {password: 0})
  // const total = await guestbook.find({},{},{}).count()
  return {code: 1, message: '获取全部留言成功', data: data}
}

module.exports = {
  publishMessage,
  getAllmessage
}