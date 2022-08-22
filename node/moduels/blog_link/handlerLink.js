const link = require('../mongoose/link')

const addUserLink = async ({ruleForm}, id) => {
  const bol = await link.findOne({about: id})
  if(!bol) {
    // 创建友链
    await link.create({
      blogName: ruleForm.blogName,
      blogOrigin: ruleForm.blogOrigin,
      blogLogo: ruleForm.blogLogo,
      blogMessage: ruleForm.blogMessage,
      blogHotLink: false,
      blogDate: new Date(),
      about: id
    })
  } else {
    await link.updateOne({about: id}, {
      blogName: ruleForm.blogName,
      blogOrigin: ruleForm.blogOrigin,
      blogLogo: ruleForm.blogLogo,
      blogMessage: ruleForm.blogMessage,
      blogHotLink: false
    })
  }
  return {
    code: 1,
    message: bol ? "修改友链成功" : "创建友链成功",
    data: {
      blogName: ruleForm.blogName,
      blogOrigin: ruleForm.blogOrigin,
      blogLogo: ruleForm.blogLogo,
      blogMessage: ruleForm.blogMessage
    }
  }
}

// 获取友链
const getAllLink = async () => {
  const data = await link.find({},{},{limit:20})
  return {code:1, message: '获取友链数据成功', data: data}
}

// 是否为推荐友链
const changeHotLink = async function({_id, blogHotLink}) {
  const bol =  await link.findOne({_id: _id})
  if(!bol) return {code:0, message: '查无此友链，请刷新页面'}
  const data = await link.updateOne({_id: _id}, {blogHotLink: blogHotLink})
  return {code: 1, message: '设置友链推荐状态成功'}
}

// 获取当前用户的友链
const getUserLink = async function(id) {
  const bol = await link.findOne({about: id})
  if(!bol) return {code:1, message: '该用户尚未申请过友链'}
  return {code:1, message: "获取用户友链信息成功", data:bol}
}

// 删除友链
const deleteLink = async function(id) {
  const bol = await link.deleteOne({_id: id})
  if(bol.deletedCount) return { code:1, message: '删除友链成功' }
  return { code:0, message: '删除友链失败，请稍后重试' }
}

module.exports = {
  addUserLink,
  getAllLink,
  changeHotLink,
  getUserLink,
  deleteLink
}