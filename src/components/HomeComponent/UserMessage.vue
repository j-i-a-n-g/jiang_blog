<template>
  <div class="user-message">
    <div  class="user-message-base">
      <div class="user-message-base-img">
        <img :src="'/node/' + userInfo.userAvatar" alt="">
      </div>
      <div class="user-message-base-title">
        <p>昵称：<span>{{userInfo.username}}</span></p>
        <p>登录时间：<span>{{userInfo.userDate | timer}}</span></p>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="user-message-botton">
      <router-link to="/userInformation">
      <el-button type="success" plain @click="reviseeMssage">修改资料</el-button>
      </router-link>
      <el-button type="primary" plain @click="userLogout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import { postUserLogout } from "@/assets/api/index"
export default {
  name: 'UserMessage',
  data() {
    return {
      userInfo: this.$store.state.userInfo
    }
  },
  methods: {
    async userLogout() {
      const {data} = await postUserLogout()
      console.log(data);
      this.$store.commit('deleteUserInfo')
      this.$emit('hideUsermessage')
      this.$message.success('退出登录成功')
    },
    // 修改个人信息
    reviseeMssage() {
      this.$emit('reviseeMssage')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-message {
  position: absolute;
  right: -19px;
  top: 51px;
  width: 400px;
  height: 250px;
  box-shadow: 0 0 3px 1px #ccc;
  padding: 20px;
  overflow: hidden;
  background-color: #fff;
  &-base {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
    &-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid skyblue;
      img {
        width: 100px;
        height: 100px;
      }
    }
    &-title {
      flex: 1;
      margin-left: 40px;
      p {
        font-size: 20px;
        line-height: 30px;
        color: #999;
      }
    }
  }
  a {
    display: block;
    width: 100%;
    text-align: center;
  }
  &-botton {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 20px;
    .el-button {
      margin-top: 15px;
      margin-left: 0;
      width: 70%;
  }
  }
}
</style>