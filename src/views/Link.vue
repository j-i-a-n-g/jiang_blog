<template>
  <div class="link">
    <h2><i class="el-icon-link">友情链接</i></h2>

    <el-tabs v-model="activeName">
      <!-- 申请友链 -->
      <el-tab-pane label="申请友链" name="first">
        <el-alert title="友链申请-请符合规范😊" type="warning" show-icon>
        </el-alert>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="博客名称" prop="blogName">
            <el-input
              type="text"
              v-model="ruleForm.blogName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="博客地址" prop="blogOrigin">
            <el-input
              type="text"
              v-model="ruleForm.blogOrigin"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="logo地址" prop="blogLogo">
            <el-input
              type="text"
              v-model="ruleForm.blogLogo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="博客描述" prop="blogMessage">
            <el-input
              type="text"
              v-model="ruleForm.blogMessage"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >申请</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--友链展示  -->
      <el-tab-pane label="友链展示" name="second">
        <ul class="link-friend">
          <li class="link-friend-list" v-for="(item, index) in links" :key="index" @click="toBlogLink(item)">
            <div class="link-friend-list-avatar">
              <img :src="item.blogLogo" alt="" />
            </div>
            <div class="link-friend-list-content">
              <p class="link-friend-list-content-name">{{item.blogName}}</p>
              <p class="link-friend-list-content-desc">{{item.blogMessage}}</p>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="推荐友链" name="third">
        <!-- <LinkChild :links="hotLinks" /> -->
      </el-tab-pane>
      <el-tab-pane label="个人友链" name="fourth">
        <button @click="activeName = 'first'">修改友链</button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { postUserLink } from "@/assets/api/index";
export default {
  name: "Link",
  data() {
    let blogNameval = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("博客名称不能为空"));
      } else {
        callback();
      }
    };
    let blogOriginval = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("地址不能为空"));
      } else if (!value.startsWith("http")) {
        callback(new Error("格式不正确(开头需是http)"));
      } else {
        callback();
      }
    };
    return {
      activeName: "second",
      ruleForm: {
        blogName: "",
        blogOrigin: "",
        blogLogo: "",
        blogMessage: "",
      },
      rules: {
        blogName: [{ validator: blogNameval, trigger: "blur" }],
        blogOrigin: [{ validator: blogOriginval, trigger: "blur" }],
        blogLogo: [{ validator: blogOriginval, trigger: "blur" }],
        blogMessage: [{ validator: blogNameval, trigger: "blur" }],
      },
      links: [
        {
          blogName: "网易云",
          blogOrigin: "https://music.163.com/",
          blogLogo: "https://timg03.bdimg.com/timg?wapbaike&quality=60&size=b1024_1024&sec=1349839550&di=4c994b5556baf684a3a89ddfc59fc49c&src=http://imgsrc.baidu.com/baike/pic/item/838ba61ea8d3fd1fa92d29173d4e251f95ca5ff3.jpg",
          blogMessage: "网易云音乐是一款专注于发现与分享的音乐产品，依托专业音乐人、DJ、好友推荐及社交功能，为用户打造全新的音乐生活",
        },
        {
        blogName: "QQ音乐",
        blogOrigin: "https://y.qq.com/",
        blogLogo: "https://img.zcool.cn/community/0117c85799fca90000012e7eab90ac.jpg@1280w_1l_2o_100sh.jpg",
        blogMessage: "QQ音乐是腾讯公司推出的一款网络音乐服务产品"
      },
      {
        blogName: "酷狗音乐",
        blogOrigin: "http://www.kugou.com/",
        blogLogo: "https://www.lgstatic.com/thumbnail_300x300/i/image/M00/A0/B3/CgqKkVimoV-AaHn1AAA3fMbzZ2o402.jpg",
        blogMessage: "酷狗音乐旗下最新最全的在线正版音乐网站",
      },
      {
        blogName: "CSS在线格式化工具- 功能强大的CSS编辑器",
        blogOrigin: "https://lightly.teamcode.com",
        blogLogo: "https://lightly.teamcode.com/assets/logo.3daf54a7.svg",
        blogMessage: "来自百度Lightly CSS编辑器,支持在线格式化CSS代码,编辑运行CSS项目",
      },
      {
        blogName: "bilibili",
        blogOrigin: "https://www.bilibili.com",
        blogLogo: "https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/bd/0f/17/bd0f1731-eab9-978b-45ae-c46978dba494/AppIcon-0-1x_U007emarketing-0-0-85-220-6.png/1024x1024bb.jpeg",
        blogMessage: "bilibili是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。",
      }
      ],
      hotLinks: [],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 验证成功设置请登录
          if (!this.$store.state.userInfo._id) {
            return this.$message.error("请先登录账号");
          }
          // 提交后端数据库中
          let { data } = await postUserLink({
            ruleForm: this.ruleForm,
          });
          this.$message.success(data.message);
          this.$refs[formName].resetFields();
          this.links.unshift(data.data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toBlogLink(item) {
      window.open(item.blogOrigin)
    }
  },
};
</script>

<style lang="scss" scoped>
.link {
  padding: 20px;
  h2 {
    font-size: 24px;
    font-weight: 800;
    margin: 10px;
  }
  &-friend {
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    &-list {
      width: 300px;
      height: 60px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: left;
      border: 1px solid #999;
      border-radius: 15px;
      padding: 10px;
      margin: 10px;
      cursor: pointer;
      &-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #999;
        text-align: center;
        line-height: 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      &-content {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        line-height: 24px;
        p {
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          // 谷歌
          display: -webkit-box;
          // 行数
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          font-size: 14px;
          line-height: 20px;
        }
        &-name {
          font-size: 20px;
          color: #333;
        }
        &-desc {
          font-size: 16px;
          color: #999;
        }
      }
    }
  }
  // tab 切换栏
  ::v-deep .el-tabs__nav-scroll {
    .el-tabs__item {
      font-size: 16px;
    }
  }
  // 提示
  .el-alert--warning {
    margin-bottom: 15px;
  }
  // 申请友链的表单
  ::v-deep .el-form {
    .el-form-item {
      display: flex;
      flex-direction: row;
      justify-content: left;
      .el-form-item__content {
        margin-left: 20px !important;
        input {
          width: 500px;
        }
      }
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
}
</style>