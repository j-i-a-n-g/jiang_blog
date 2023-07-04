<template>
  <div class="nav-bar">
    <div class="nav-bar-content">
      <!-- 左侧logo -->
      <div :class="['nav-bar-content-logo','hidden-xs-only']">
      </div>
      <ul class="nav-bar-content-list">
        <li v-for="(item, index) in navtitle" :key="index">
        <router-link class="nav-bar-content-list-topic" :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
      <!-- 音乐播放器 -->
      <!-- <NavMusic /> -->
      <div class="nav-bar-content-login">
        <div @click="showState">
          <i class="el-icon-key"></i>
          <span class="hidden-xs-only">{{$store.state.userInfo.username ? $store.state.userInfo.username : '登录戳我'}}</span>
        </div>
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
            // {
            //   path:'/message',
            //   title: '留言'
            // },
            {
              path:'/onlineEdit',
              title: '开发'
            },{
              path:'/link',
              title: '友链'
            },{
              path:'/hanabi',
              title: 'Canvas'
            },
            {
              path:'/qrCode',
              title: '生成二维码'
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
  // box-shadow: 0 0 5px 1px #eee;
  cursor: pointer;
  &-content {
    height: 100%;
    max-width: 1500px;
    min-width: 375px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // logo图片
    &-logo {
      width: 50px;
      height: 100%;
    }
    // 标题列表样式
    &-list {
      display: flex;
      max-width: 800px;
      min-width: 300px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      li {
        width: 80px;
        // border: 1px solid #C4F9FF;
        // border-radius: 10px;
        margin: 0 2px;
        position: relative;
        pointer-events: none;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          // border: 2px solid #16a085;
          transform-origin: center;
        }
        &:hover::after {
          transform: scale(1.25);
          transition: all ease-out .5s;
          border: 1px solid #96f3e0;
          border-radius: 10px;
          opacity: 0;
        }
        .nav-bar-content-list-topic {
          color: #fff;
          pointer-events: auto;
        }
      }
    }
    // 登录按钮
    &-login {
      position: relative;
      width: 100px;
      height: 40px;
      right: 0;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        text-shadow: 0 0 10px #fff;
      }
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