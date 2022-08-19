const user = require('../mongoose/user')
const fs = require('fs')
const paths = require('path')

const changeAvatar = async function(id, path ,avatar) {
  await user.updateOne({_id: id}, {userAvatar: path})
  const result = await user.findById(id)
  const bol = avatar.startsWith('/avatar')
  if (bol) {
    fs.unlink(paths.resolve(__dirname, '../../public'+ avatar), () => {})
  }

  return {code: 1, message: '用户头像更改成功', data:result }
}

module.exports = changeAvatar