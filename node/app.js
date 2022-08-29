const express = require('express')
const compression = require('compression')
const app = express()

const history = require('connect-history-api-fallback')
app.use(history())

// 解析请求数据
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// 静态资源压缩
app.use(compression())
app.use(express.static('./public'))
// 要在子路由之前 设置session
app.use(require('./moduels/plugin/session'))
// 使用mongoose数据库
require('./moduels/mongoose/mongoose')

app.use('/blog', require('./router/blog'))
app.use('/user', require('./router/user'))
app.use('/message', require('./router/guestbook'))
app.use('/root', require('./router/root'))

app.listen('120', () => {
  console.log('120端口服务器启动成功');
})