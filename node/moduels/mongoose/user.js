const mongoose = require('mongoose')

module.exports = mongoose.model(
  'userInfo',
  new mongoose.Schema({
    username: String,
    password: String,
    userDate: {
      type: String,
      default: new Date()
    },
    lastOriginTime: {
      type: String,
      default: new Date()
    },
    userAvatar: {
      type: String,
      default: '/img/avatar.png'
    }},
  {
    versionKey: false
  }
)
)