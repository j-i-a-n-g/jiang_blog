const nodemailer = require('nodemailer')



module.exports = (to, subject, text, name, callbackFun ) => {
  // 创建邮件程序
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    // port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1280291927@qq.com', // 发送邮件的账号
      pass: 'fpwlegnquvlrfjba', // 授权码
    },
  });
  let info = [
    // 发给自己
    {
      from: '"还好还好" <1280291927@qq.com>', // 邮件发送人及地址
      to: '1280291927@qq.com', // 接收者的邮箱
      subject: subject, // 主题
      text: name +"先生（女士）："+ text, // 正文
    },
    // 发给申请人
    {
      from: '"还好还好" <1280291927@qq.com>', // 邮件发送人及地址
      to: to, // 接收者的邮箱
      subject: "江【自动回复】", // 主题
      text: name +"先生（女士）：您好，已收到您的邮件，后续我这边会主动联系您，非常感谢您的来信！", // 正文
    }
  ]
  info.forEach(item => {
  // 邮件发送
  transporter.sendMail(item, (err, info) => {
    if(err) {
      return callbackFun({
        code: 0, message: '发送失败'
      })
    }
    return callbackFun({
      code: 1, message: '发送成功'
    })
  });
  })

}