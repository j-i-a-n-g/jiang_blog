const user = require('../mongoose/user')

const changeUserMessage =async ({username, id, newPassword}) => {
    const result = await user.findById(id)
    if (!newPassword) {
      if(!result) return {code:0,message:'该用户不存在，不能更改用户名',data: ''} 
      await user.updateOne({_id: id}, {username})
      result.username = username
       return {code:1,message:'更新用户名成功',data: result}
    } else {
      if(!result) return {code:0,message:'该用户不存在，不能更改密码',data: ''} 
      await user.updateOne({_id: id}, {password: newPassword})
      result.password = newPassword
       return {code:1,message:'更新用户名成功',data: result}
    }
}

module.exports = changeUserMessage