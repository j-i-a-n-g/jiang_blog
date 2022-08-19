<template>
  <div class="nav-bar">
    <div class="nav-bar-content">
      <div :class="['nav-bar-content-logo','hidden-xs-only']">
        <img src="@img/logo.png" draggable="false" alt="">
      </div>
      <ul class="nav-bar-content-list">
        <li v-for="(item, index) in navtitle" :key="index">
        <router-link :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
      <!-- 音乐播放器 -->
      <!-- <NavMusic /> -->
      <div class="nav-bar-content-login">
        <i class="el-icon-key"  @click="showState"></i>
        <span>{{$store.state.userInfo.username ? $store.state.userInfo.username : '登录戳我'}}</span>
        <transition name="login">
        <Login v-if="isShowLogin" @changeLoginState="changeLoginState"></Login>
        <UserMessage v-if="isShowUserMessage" @hideUsermessage="hideUsermessage"></UserMessage>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NavMusic from './HomeComponent/NavMusic.vue';
import Login from './HomeComponent/Login.vue';
import UserMessage from './HomeComponent/UserMessage.vue';
import { postAutoLogin } from '@/assets/api/index'
export default {
    name: "NavBar",
    data() {
      return {
          // nav的数据
          navtitle: [
            {
              path:'/',
              title: '首页'
            },
            {
              path:'/article',
              title: '文章'
            },
            {
              path:'/message',
              title: '留言'
            },{
              path:'/link',
              title: '友链'
            },{
              path:'/about',
              title: '关于'
            }
          ],
          // 控制登录表单的隐藏显示
          isShowLogin: false,
          // 控制信息表单的隐藏显示
          isShowUserMessage: false,
          // 验证码：
          isSvg: ''
        }
    },
    mounted() {
      this.autoLogin()
    },
    methods: {
      // 收起登录表单
      changeLoginState() {
        this.isShowLogin = false
        this.isShowUserMessage =true
      },
      // 收起用户信息表单
      hideUsermessage() {
        this.isShowUserMessage = false
        this.isShowLogin = true
      },
      // 点击右上角图标控制展示的内容
      showState() {
        if(this.$store.state.userInfo.username) {
          this.isShowLogin = false
          this.isShowUserMessage = !this.isShowUserMessage
        } else {
          this.isShowUserMessage = false
          this.isShowLogin = !this.isShowLogin
        }
      },
      // 自动登录功能
      async autoLogin() {
        const {data} = await postAutoLogin()
        if(data) {
          this.$store.commit('setUserInfo', data)
        }
      }
    },
    components: { NavMusic, Login, UserMessage }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000;
}
.nav-bar {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 50px;
  background: linear-gradient( to right, #11C3F2, #6CF1AD);
  box-shadow: 0 0 5px 1px #eee;
  cursor: pointer;
  &-content {
    height: 100%;
    max-width: 1500px;
    min-width: 375px;
    // margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // logo图片
    &-logo {
      width: 50px;
      height: 100%;
      background-color: #C4F9FF;
      border: 2px solid blue;
      border-radius: 50%;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      margin: 0 20px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    // 标题列表样式
    &-list {
      display: flex;
      max-width: 800px;
      min-width: 600px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      // margin-left: 250px;
      li {
        width: 100px;
        border: 1px solid #C4F9FF;
      }
    }
    // 登录按钮
    &-login {
      position: relative;
      width: 100px;
      height: 40px;
      right: 0;
      // border: 1px solid #C4F9FF;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 20px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
// 表单的隐藏显示动画
.login-enter-active {
  animation: enter .5s;
}
.login-leave-active {
  animation: leave .5s;
}
@keyframes enter {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 250px;
  }
}
@keyframes leave {
  0% {
    max-height: 250px;
  }
  100% {
    max-height: 0;
  }
}
</style>