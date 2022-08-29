"use strict";(self["webpackChunkjiang_blog"]=self["webpackChunkjiang_blog"]||[]).push([[310],{4310:function(t,o,e){e.r(o),e.d(o,{default:function(){return m}});var l=function(){var t=this,o=t._self._c;return o("div",{staticClass:"link"},[t._m(0),o("el-tabs",{model:{value:t.activeName,callback:function(o){t.activeName=o},expression:"activeName"}},[o("el-tab-pane",{attrs:{label:"申请友链",name:"first"}},[o("el-alert",{attrs:{title:"友链申请-请符合规范😊",type:"warning","show-icon":""}}),o("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"博客名称",prop:"blogName"}},[o("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.blogName,callback:function(o){t.$set(t.ruleForm,"blogName",o)},expression:"ruleForm.blogName"}})],1),o("el-form-item",{attrs:{label:"博客地址",prop:"blogOrigin"}},[o("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.blogOrigin,callback:function(o){t.$set(t.ruleForm,"blogOrigin",o)},expression:"ruleForm.blogOrigin"}})],1),o("el-form-item",{attrs:{label:"logo地址",prop:"blogLogo"}},[o("el-input",{attrs:{type:"text",placeholder:"若该项不填，则使用系统默认logo",autocomplete:"off"},model:{value:t.ruleForm.blogLogo,callback:function(o){t.$set(t.ruleForm,"blogLogo",o)},expression:"ruleForm.blogLogo"}})],1),o("el-form-item",{attrs:{label:"博客描述",prop:"blogMessage"}},[o("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.blogMessage,callback:function(o){t.$set(t.ruleForm,"blogMessage",o)},expression:"ruleForm.blogMessage"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(o){return t.submitForm("ruleForm")}}},[t._v("申请")]),o("el-button",{on:{click:function(o){return t.resetForm("ruleForm")}}},[t._v("重置")])],1)],1)],1),o("el-tab-pane",{attrs:{label:"友链展示",name:"second"}},[o("ul",{staticClass:"link-friend"},t._l(t.links,(function(l,i){return o("li",{key:i,staticClass:"link-friend-list",on:{click:function(o){return t.toBlogLink(l)}}},[o("div",{staticClass:"link-friend-list-avatar"},[o("img",{attrs:{src:l.blogLogo||e(5080),alt:""}})]),o("div",{staticClass:"link-friend-list-content"},[o("p",{staticClass:"link-friend-list-content-name"},[t._v(t._s(l.blogName))]),o("p",{staticClass:"link-friend-list-content-desc"},[t._v(" "+t._s(l.blogMessage)+" ")])])])})),0)]),o("el-tab-pane",{attrs:{label:"推荐友链",name:"third"}},[o("ul",{staticClass:"link-friend"},t._l(t.hotLinks,(function(l,i){return o("li",{key:i,staticClass:"link-friend-list",on:{click:function(o){return t.toBlogLink(l)}}},[o("div",{staticClass:"link-friend-list-avatar"},[o("img",{attrs:{src:l.blogLogo||e(5080),alt:""}})]),o("div",{staticClass:"link-friend-list-content"},[o("p",{staticClass:"link-friend-list-content-name"},[t._v(t._s(l.blogName))]),o("p",{staticClass:"link-friend-list-content-desc"},[t._v(" "+t._s(l.blogMessage)+" ")])])])})),0)]),o("el-tab-pane",{attrs:{label:"个人友链",name:"fourth"}},[o("el-form",{attrs:{model:t.blogForm,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"博客名称",prop:"blogName"}},[o("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:t.blogForm.blogName,callback:function(o){t.$set(t.blogForm,"blogName",o)},expression:"blogForm.blogName"}})],1),o("el-form-item",{attrs:{label:"博客地址",prop:"blogOrigin"}},[o("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:t.blogForm.blogOrigin,callback:function(o){t.$set(t.blogForm,"blogOrigin",o)},expression:"blogForm.blogOrigin"}})],1),o("el-form-item",{attrs:{label:"logo地址",prop:"blogLogo"}},[o("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:t.blogForm.blogLogo,callback:function(o){t.$set(t.blogForm,"blogLogo",o)},expression:"blogForm.blogLogo"}})],1),o("el-form-item",{attrs:{label:"博客描述",prop:"blogMessage"}},[o("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:t.blogForm.blogMessage,callback:function(o){t.$set(t.blogForm,"blogMessage",o)},expression:"blogForm.blogMessage"}})],1),o("el-form-item",{attrs:{label:"创建时间",prop:"blogDate"}},[o("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:t.blogForm.blogDate,callback:function(o){t.$set(t.blogForm,"blogDate",o)},expression:"blogForm.blogDate"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(o){t.activeName="first"}}},[t._v("修改友链")])],1)],1)],1)],1)],1)},i=[function(){var t=this,o=t._self._c;return o("h2",[o("i",{staticClass:"el-icon-link"},[t._v("友情链接")])])}];e(1703);const a=function(t){const o=function(t){return t<10?`0${t}`:t},e=o(new Date(t).getFullYear()),l=o(new Date(t).getMonth()+1),i=o(new Date(t).getDate()),a=o(new Date(t).getHours()),s=o(new Date(t).getMinutes()),g=o(new Date(t).getSeconds());return`${e}-${l}-${i} ${a}:${s}:${g}`};var s=e(9158),g={name:"Link",data(){let t=(t,o,e)=>{if(!o)return e(new Error("博客名称不能为空"));e()},o=(t,o,e)=>{""===o.trim()?e(new Error("地址不能为空")):o.startsWith("http")?e():e(new Error("格式不正确(开头需是http)"))};return{activeName:"second",ruleForm:{blogName:"",blogOrigin:"",blogLogo:"",blogMessage:""},rules:{blogName:[{validator:t,trigger:"blur"}],blogOrigin:[{validator:o,trigger:"blur"}],blogMessage:[{validator:t,trigger:"blur"}]},links:[{blogName:"网易云（系统自带友链，无法删除）",blogOrigin:"https://music.163.com/",blogLogo:"https://timg03.bdimg.com/timg?wapbaike&quality=60&size=b1024_1024&sec=1349839550&di=4c994b5556baf684a3a89ddfc59fc49c&src=http://imgsrc.baidu.com/baike/pic/item/838ba61ea8d3fd1fa92d29173d4e251f95ca5ff3.jpg",blogMessage:"网易云音乐是一款专注于发现与分享的音乐产品，依托专业音乐人、DJ、好友推荐及社交功能，为用户打造全新的音乐生活",blogHotLink:!1},{blogName:"QQ音乐（系统自带友链，无法删除）",blogOrigin:"https://y.qq.com/",blogLogo:"https://img.zcool.cn/community/0117c85799fca90000012e7eab90ac.jpg@1280w_1l_2o_100sh.jpg",blogMessage:"QQ音乐是腾讯公司推出的一款网络音乐服务产品",blogHotLink:!1},{blogName:"酷狗音乐（系统自带友链，无法删除）",blogOrigin:"http://www.kugou.com/",blogLogo:"https://www.lgstatic.com/thumbnail_300x300/i/image/M00/A0/B3/CgqKkVimoV-AaHn1AAA3fMbzZ2o402.jpg",blogMessage:"酷狗音乐旗下最新最全的在线正版音乐网站",blogHotLink:!1},{blogName:"CSS在线格式化工具- 功能强大的CSS编辑器（系统自带友链，无法删除）",blogOrigin:"https://lightly.teamcode.com",blogLogo:"https://lightly.teamcode.com/assets/logo.3daf54a7.svg",blogMessage:"来自百度Lightly CSS编辑器,支持在线格式化CSS代码,编辑运行CSS项目",blogHotLink:!1},{blogName:"bilibili（系统自带友链，无法删除）",blogOrigin:"https://www.bilibili.com",blogLogo:"https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/bd/0f/17/bd0f1731-eab9-978b-45ae-c46978dba494/AppIcon-0-1x_U007emarketing-0-0-85-220-6.png/1024x1024bb.jpeg",blogMessage:"bilibili是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。",blogHotLink:!1}],hotLinks:[],blogForm:{blogName:"",blogOrigin:"",blogLogo:"",blogMessage:"",blogDate:""}}},created(){this.getAllLink(),this.getUserLink()},methods:{submitForm(t){this.$refs[t].validate((async o=>{if(!o)return console.log("error submit!!"),!1;{if(!this.$store.state.userInfo._id)return this.$message.error("请先登录账号");let{data:o}=await(0,s.D9)({ruleForm:this.ruleForm});this.$message.success(o.message),this.$refs[t].resetFields(),this.getAllLink(o.data)}}))},toBlogLink(t){window.open(t.blogOrigin)},async getAllLink(){this.links=[{blogName:"网易云",blogOrigin:"https://music.163.com/",blogLogo:"https://timg03.bdimg.com/timg?wapbaike&quality=60&size=b1024_1024&sec=1349839550&di=4c994b5556baf684a3a89ddfc59fc49c&src=http://imgsrc.baidu.com/baike/pic/item/838ba61ea8d3fd1fa92d29173d4e251f95ca5ff3.jpg",blogMessage:"网易云音乐是一款专注于发现与分享的音乐产品，依托专业音乐人、DJ、好友推荐及社交功能，为用户打造全新的音乐生活",blogHotLink:!1},{blogName:"QQ音乐",blogOrigin:"https://y.qq.com/",blogLogo:"https://img.zcool.cn/community/0117c85799fca90000012e7eab90ac.jpg@1280w_1l_2o_100sh.jpg",blogMessage:"QQ音乐是腾讯公司推出的一款网络音乐服务产品",blogHotLink:!1},{blogName:"酷狗音乐",blogOrigin:"http://www.kugou.com/",blogLogo:"https://www.lgstatic.com/thumbnail_300x300/i/image/M00/A0/B3/CgqKkVimoV-AaHn1AAA3fMbzZ2o402.jpg",blogMessage:"酷狗音乐旗下最新最全的在线正版音乐网站",blogHotLink:!1},{blogName:"CSS在线格式化工具- 功能强大的CSS编辑器",blogOrigin:"https://lightly.teamcode.com",blogLogo:"https://lightly.teamcode.com/assets/logo.3daf54a7.svg",blogMessage:"来自百度Lightly CSS编辑器,支持在线格式化CSS代码,编辑运行CSS项目",blogHotLink:!1},{blogName:"bilibili",blogOrigin:"https://www.bilibili.com",blogLogo:"https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/bd/0f/17/bd0f1731-eab9-978b-45ae-c46978dba494/AppIcon-0-1x_U007emarketing-0-0-85-220-6.png/1024x1024bb.jpeg",blogMessage:"bilibili是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。",blogHotLink:!1}];const{data:t}=await(0,s.lk)();console.log(t),this.links.unshift(...t.data),this.hotLinks=t.data.filter((t=>!0===t.blogHotLink))},async getUserLink(){const{data:t}=await(0,s.VE)();this.blogForm.blogName=t.data.blogName,this.blogForm.blogOrigin=t.data.blogOrigin,this.blogForm.blogLogo=t.data.blogLogo,this.blogForm.blogMessage=t.data.blogMessage,this.blogForm.blogDate=a(t.data.blogDate)}}},r=g,n=e(1001),b=(0,n.Z)(r,l,i,!1,null,"0e9da0f8",null),m=b.exports}}]);
//# sourceMappingURL=310.8796c84c.js.map