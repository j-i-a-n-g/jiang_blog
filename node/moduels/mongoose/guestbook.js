const mongoose = require('mongoose')
const user = require('./user')
const schame = mongoose.Schema

module.exports = mongoose.model('guestbook', new schame({
  guestbook: String,
  publishDate: Date,
  userAbout: {
    type: schame.Types.ObjectId,
    ref: user
  }
},
{
  versionKey: false
}
))