const axios = require('axios')

axios.default.baseURL = 'http://localhost:80'

// 发送邮箱信息
export const postEmailMessage = (data) => axios.post('/node/blog/email', { data: data })

// 获取验证码
export const getSvgCaptcha = () => axios.get('/node/blog/getsvg')

// 用户登录
export const postUserLogin = (data) => axios.post('/node/blog/login', {data})

// 用户自动登录
export const postAutoLogin = () => axios.post('/node/blog/autologin')

// 用户退出登录
export const postUserLogout = () => axios.post('/node/blog/logout')

// 更改用户名
export const postChangeUsername = (data) => axios.post('/node/blog/changeUsername', data)

// 更改密码
export const postChangePassword = (data) => axios.post('/node/blog/changePassword', data)

// -------------------------------

// 申请友链
export const postUserLink = (data) => axios.post('/node/user/userLink', data)
