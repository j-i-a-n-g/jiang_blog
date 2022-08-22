const mongoose = require('mongoose')

module.exports = mongoose.model(
  'article',
  new mongoose.Schema({
    articleTitle: String,
    articleDesc: String,
    articleFileUrl: String,
    articleImgUrl: {
      type: String,
      default: '/img/avatar.png'
    },
    articleHot: {
      type:Boolean,
      default: false
    },
    articleDate: Date,

  },
  {
    versionKey: false
  }
  )
)