const mongoose = require('mongoose')

module.exports = mongoose.model('root', new mongoose.Schema(
  {
    rootName: String,
    rootPass: String
  },
  {
    versionKey: false
  }
))