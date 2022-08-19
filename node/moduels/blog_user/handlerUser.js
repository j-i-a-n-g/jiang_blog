const user = require('../mongoose/user')

const handlerUser = async ({username, password}) => {
  const result = await user.findOne({username: username})
  // 如果没有找到则注册一个
  if(!result) {
    const data =  await user.create({username, password})
    return {code:1, message: '注册成功', data}
  } 
  if(result.password === password) {
    return {code:1, message: '登录成功', data: result}
  }
  return {code:0, message: '登录失败', data: ""}
}

module.exports = handlerUser