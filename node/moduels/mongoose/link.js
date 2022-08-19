const mongoose = require('mongoose')
const user = require('./user')
const schame = mongoose.Schema
module.exports = mongoose.model('link', new schame(
  {
    blogName: String,
    blogOrigin: String,
    blogLogo: String,
    blogMessage: String,
    blogDate: Date,
    blogHotLink: {
      type: Boolean,
      default: false
    },
    about: {
      type: schame.Types.ObjectId,
      ref: user
    }
},
{
  versionKey: false
}
))