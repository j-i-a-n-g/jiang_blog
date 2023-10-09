const axios = require('axios')
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.default.baseURL = 'http://localhost:3000'
// axios.default.headers = {
//   "Content-Type": "aplication/json;charset=utf-8"
// }
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

// 发送邮箱信息
// export const postEmailMessage = (data) => axios.post('/node/blog/email', { data: data })

// 获取验证码
export const getSvgCaptcha = () => axios.get('/node/user/getsvg')

// 用户登录
export const postUserLogin = (data) => axios.post('/node/user/login', { ...data })

// 用户自动登录
export const postAutoLogin = () => axios.post('/node/user/autologin')

// 用户退出登录
export const postUserLogout = () => axios.post('/node/user/logout')

// 更改用户名
export const postChangeUsername = (data) => axios.post('/node/blog/changeUsername', data)

// 更改密码
export const postChangePassword = (data) => axios.post('/node/blog/changePassword', data)

// -------------------------------

// 申请友链
// export const postUserLink = (data) => axios.post('/node/user/userLink', data)

// // 获取所有友链列表
// export const getLinkList = () => axios.get('/node/user/getAllLink')

// // 获取当前账号的友链信息
// export const getLinkById = () =>axios.get('/node/user/getUserLink')

// // 发送留言
// export const postMessage = (data) => axios.post('/node/message/message', data)

// // 获取所有留言数据
// export const getAllMessage = (val) => axios.get('/node/message/getAll', {params:{
//   skip: val
// }})

// -----------------------------------

// // 初始化路由
// export const initializeAccount = () => axios.get('/node/root/')

// // 登录路由
export const rootLogin = (data) => axios.post('/node/user/rootLogin', data)

// // 修改root密码
// export const postRootPassword = (rootPass) => axios.post('/node/root/rootPassword', rootPass)

// // 管理员将友链移入移出推荐友链列表
// export const changeHotLink = (data) => axios.post('/node/root/isHotLink', data)

// // 删除友链
// export const deleteLink = (data) => axios.delete(`/node/root/deleteLink`, data)

// 删除选中上传的文件
export const deleteFile = (data) => axios.post('/node/article/deleteFile', data)

export const uploadFile = (data) => axios.post('/node/article/uploadFile', data)

// 删除选中上传的图片
export const deleteArticleImg = (data) => axios.post('/node/article/deleteImg', data)

// 将所有文章信息传入到数据库中
export const publishArticle = (data) => axios.post('/node/article/saveArticle', data)

// 获取所有文章列表
export const getArticleList = (num, pageSize) => axios.get('/node/article/getArticlelist', { params: { currentPage: num, pageSize: pageSize } })

// 获取文章详情
export const getMdVal = (val) => axios.get(`/node${val}`)

// 修改文章是否推荐的状态
export const postChangeArticleHot = (row) => axios.post('/node/article/changeArticleHot', row)

// 移除文章
export const deleteArticle = (id) => axios.delete('/node/article/deleteArticle', { params: { id: id } })

// 提交文章修改
export const reviseArticleContent = (data) => axios.post('/node/article/reviseArticle', data)

// 获取文章相关tag
export const getArticleTagList = (id) => axios.get('/node/article/getArticleTagList', { params: { id: id } })

// 提交文章相关标签修改
export const reviseArticleTagList = (data) => axios.post('/node/article/reviseArticleTagList', data)

// 提交文章标题和简介的修改
export const reviseArticleTitle = (data) => axios.post('/node/article/reviseArticleTitle', data)

// 获取文章标签列表
export const getTagList = () => axios.get('/node/articleTag/getTagList')

// 新增文章标签
export const addTag = (data) => axios.post('/node/articleTag/addTag', data)

// 删除文章标签
export const deleteTag = (tag) => axios.get('/node/articleTag/deleteTag', { params: { tag: tag } })

// 上传音乐
export const publishMusic = (data) => axios.post('/node/music/create', data)

// 获取列表
export const getMusicList = () => axios.get('/node/music/getList')
