const axios = require('axios')

axios.default.baseURL = 'http://localhost:80'
axios.default.headers = {
  "Content-Type": "text/html;charset=utf-8"
}
// axios.interceptors.response.use(response => {
//         response.responseType = 'blob'
//         response.transformResponse = [function(data) {
//           var reader = new FileReader()
//           reader.readAsText(data, 'GBK')
//           reader.onload = function(e) {
//             var music = JSON.parse(reader.result)
//             console.log(music)
//             that.data = music
//           }
//           return data
//         }]
//         return response
// })


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

// 获取所有友链列表
export const getLinkList = () => axios.get('/node/user/getAllLink')

// 获取当前账号的友链信息
export const getLinkById = () =>axios.get('/node/user/getUserLink')

// 发送留言
export const postMessage = (data) => axios.post('/node/message/message', data)

// 获取所有留言数据
export const getAllMessage = (val) => axios.get('/node/message/getAll', {params:{
  skip: val
}})

// -----------------------------------
// 登录路由
export const rootLogin = (data) => axios.post('/node/root/rootlogin',data)

// 修改root密码
export const postRootPassword = (rootPass) => axios.post('/node/root/rootPassword', rootPass)

// 管理员将友链移入移出推荐友链列表
export const changeHotLink = (data) => axios.post('/node/root/isHotLink', data)

// 删除友链
export const deleteLink = (data) => axios.delete(`/node/root/deleteLink`, data)

// 删除选中上传的文件
export const deleteFile = (data) => axios.post('/node/root/deleteFile', data)

// 删除选中上传的图片
export const deleteArticleImg = (data) => axios.post('/node/root/deleteImg', data)

// 将所有文章信息传入到数据库中
export const publishArticle = (data) => axios.post('/node/root/saveArticle',data)

// 获取所有文章列表
export const getArticleList = () => axios.get('/node/root/getArticlelist')

// 获取文章详情
export const getMdVal = (val) => axios.get(`/node${val}`)
