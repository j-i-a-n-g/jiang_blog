const multer  = require('multer')
const path = require('path')

// 处理头像图片
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // 上传文件的存储位置
    if(file.originalname.endsWith('.md') || file.originalname.endsWith('.txt')) {
    cb(null, path.resolve(__dirname, '../../public/fulltext'))
    } else {
    cb(null, path.resolve(__dirname, '../../public/avatar'))
    }
  },
  filename: function (req, file, cb) { // 设置上传文件名称
    console.log(file);
    cb(null, Date.now() + file.originalname)
  }
})

module.exports = multer({ storage: storage }).single('file')