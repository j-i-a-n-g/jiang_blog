<template>
  <div class="left">
    <div class="left-avatar">
      <img class="left-avatar-img" src="@img/comImg/avatar.png" alt="" />
    </div>
    <div class="left-title">你指尖跃动的电光，是我此生不变的信仰</div>
    <div class="box_trani" @click="changeTransition">{{ text_box }}</div>
    <!-- 文章 -->
    <div class="left-article-text">
      <h3 class="border_left">热门文章</h3>
      <el-skeleton :loading="article_Arr.length ? false : true" animated>
        <template slot="template">
          <!-- 图片位置 -->
          <div style="display: flex; margin-top: 20px">
            <el-skeleton-item
              variant="image"
              style="width: 60px; height: 60px"
            />
            <!-- 描述位置 -->
            <div style="display: flex; flex-direction: column">
              <el-skeleton-item
                variant="text"
                style="margin: 0 0 10px 20px; width: 230px"
              />
              <el-skeleton-item
                variant="text"
                style="margin: 0 0 10px 20px; width: 230px"
              />
              <el-skeleton-item
                variant="text"
                style="margin-left: 20px; width: 150px"
              />
            </div>
          </div>
        </template>
        <template>
          <div class="left-article-text-box" ref="scrollBox" :style="{height: '175px', overflow: 'hidden'}">
            <ul
              class="left-article-text-box-ul"
              ref="scrollUl"
              @mouseover="scrollStop"
              @mouseout="scrollStart"
            >
              <li
                class="left-article-text-box-list"
                v-for="item in article_Arr"
                :key="item._id"
                @click="watchFullText(item._id, item.articleFileUrl)"
              >
                <div class="article_bg">
                  <img
                    :src="'/node' + item.articleImgUrl"
                    alt=""
                    draggable="false"
                  />
                </div>
                <span>{{ item.articleDesc }}</span>
              </li>
            </ul>
            <ul ref="scrollUl2"></ul>
          </div>
        </template>
      </el-skeleton>
    </div>
    <!-- 博客 -->
    <div class="left-blog-message">
      <h3 class="left-blog-message-title">博客信息</h3>
      <ul>
        <li
          class="left-blog-message-list"
          v-for="(item, index) in blogText"
          :key="index"
        >
          <i :class="item.iconClass"></i>
          <span>{{ item.titleText }}</span>
          <span class="count">{{ item.changeNumber }}</span>
        </li>
      </ul>
    </div>
    <!-- 管理 -->
    <div class="left-manage" @click="showRootLoginFrom">
      <i class="el-icon-s-cooperation"></i>
      管理
    </div>
    <RootLogin
      :isShow="isShow"
      @hideRootLogin="isShow = false"
      class="root-login-form"
    />
  </div>
</template>

<script>
import RootLogin from "./Root/RootLogin.vue";
import { getArticleList } from "@/assets/api/index";
import { DateWithoutHours } from "@/assets/js/dateFilter";
export default {
  name: "LeftSider",
  data() {
    return {
      textArr: [
        "我可不会碰你,除非忍不住🤪🤪🤪🤪",
        "你这个年龄段，你怎么睡得着的😪😪😪",
        "早上好,新的一天⏰⏰⏰",
        "学习再忙，也要注意休息",
        "下午好,努力吧少年💦💦💦",
        "晚上好,开始学习了嘛📚︎📚︎📚︎",
      ],
      text_box: "我可不会碰你,除非忍不住🤪🤪🤪🤪",
      article_Arr: [],
      blogText: [
        {
          iconClass: "el-icon-notebook-1",
          titleText: "文章总数",
          changeNumber: 0,
        },
        {
          iconClass: "el-icon-chat-dot-square",
          titleText: "热门文章",
          changeNumber: 0,
        },
        {
          iconClass: "el-icon-loading",
          titleText: "账号天数",
          changeNumber: "未登录",
        },
        {
          iconClass: "el-icon-edit",
          titleText: "上次登录",
          changeNumber: "未登录",
        },
      ],
      // 控制root登录面板的输入框
      isShow: false,
      scrollTimer: null,
    };
  },
  created() {
    this.getAllArticle();
  },
  updated() {
    this.listScroll();
  },
  methods: {
    // 左侧热门文章自动滚动
    listScroll() {
      const box = this.$refs.scrollBox;
      const ul = this.$refs.scrollUl;
      this.$refs.scrollUl2.innerHTML = ul.innerHTML
      this.scrollStart();
    },
    scrollStart() {
      const box = this.$refs.scrollBox;
      const ul = this.$refs.scrollUl;
      this.scrollStop();
      this.scrollTimer = setInterval(() => {
        // 滚动高度大于列表高度时，复位0
        if (box.scrollTop >= (ul.scrollHeight + 15 * (this.article_Arr.length - 3))) {
          box.scrollTop = 0
        } else {
          box.scrollTop += 1
        }
      }, 60);
    },
    scrollStop() {
      clearInterval(this.scrollTimer);
    },
    changeTransition() {
      let timer = setTimeout(() => {
        this.changeTransition();
      }, 1000);
      clearTimeout(timer);
      let date = new Date().getHours();
      switch (true) {
        case date >= 0 && date < 6:
          this.text_box = this.textArr[1];
          break;
        case date >= 6 && date < 12:
          this.text_box = this.textArr[2];
          break;
        case date >= 12 && date < 14:
          this.text_box = this.textArr[3];
          break;
        case date >= 14 && date < 17:
          this.text_box = this.textArr[4];
          break;
        case date >= 17 && date < 24:
          this.text_box = this.textArr[5];
          break;
        default:
          this.text_box = this.textArr[0];
      }
      setTimeout(timer);
    },
    showRootLoginFrom() {
      this.isShow = !this.isShow;
    },
    // 获取文章数据
    async getAllArticle() {
      const { data } = await getArticleList();
      const articleList = data.result;
      this.blogText[0].changeNumber = articleList.length;
      this.$store.commit("setArticleList", articleList);

      // 获取热门文章的数据
      this.article_Arr = articleList.filter((item) => {
        return item.articleHot === true;
      });
      this.blogText[1].changeNumber = this.article_Arr.length;
      // this.article_Arr = this.article_Arr.slice(0, 3)
    },
    // 查看文章详细内容
    watchFullText(id, url) {
      this.$router.push({ path: "/article/" + id, query: { id: url } });
    },
    // 计算注册天数
    getDaysBetween(enrollDate, newDate) {
      let startDate = Date.parse(enrollDate);
      let endDate = Date.parse(newDate);
      if (startDate > endDate) {
        return 0 + "天";
      }
      if (startDate == endDate) {
        return 1 + "天";
      }
      let days = parseInt((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
      return days + "天";
    },
  },
  watch: {
    "$store.state.userInfo.userDate": {
      handler: function (val) {
        if (!val) return;
        if (val !== "未登录") {
          // 获取现在的时间
          const nowTime = new Date();
          const result = this.getDaysBetween(val, nowTime);
          this.blogText[2].changeNumber = result;
        } else {
          this.blogText[2].changeNumber = "未登录";
        }
      },
      immediate: true,
    },
    "$store.state.userInfo.lastOriginTime": {
      handler: function (val) {
        if (!val) return (this.blogText[3].changeNumber = "未登录");
        this.blogText[3].changeNumber = DateWithoutHours(val);
      },
      immediate: true,
    },
  },
  components: { RootLogin },
};
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding: 17px;
  background: transparent;

  &-avatar {
    margin: 20px auto;
    width: 150px;
    height: 150px;

    &-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &-title {
    font-size: 14px;
    position: relative;
    cursor: pointer;

    &:after {
      position: absolute;
      right: -20px;
      bottom: -2px;
      content: " ";
      width: 0px;
      height: 0px;
      border: 6px solid black;
      border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;
    }
  }
  .box_trani {
    margin-top: 10px;
    animation: shan 2s infinite;
  }
  @keyframes shan {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  h3 {
    font-size: 24px;
    font-weight: 700;
    border-left: 4px solid skyblue;
    padding-left: 10px;
    margin-bottom: 15px;

  }
  // 热门文章
  .left-article-text {
    margin-top: 50px;
     &-box {
      height: 175px;
      overflow: hidden;
      &-list {
        display: flex;
        flex-direction: row;
        height: 60px;
        margin-top: 15px;
        padding: 5px;
        background-color: rgba(232, 229, 229, 0.5);
        border-radius: 6px;
        transition: all 0.5s;
        &:hover {
          cursor: pointer;
          background-color: rgba(232, 229, 229, 0.9);
          transition: all 0.5s;
        }
        .article_bg {
          float: left;
          margin-right: 10px;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          // 谷歌
          display: -webkit-box;
          // 行数
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          font-size: 14px;
          line-height: 20px;
          color: #333;
        }
      }
    }

    img {
      width: 60px;
      height: 60px;
    }
  }
  // 博客信息
  &-blog-message {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    &-title {
      margin-bottom: 10px;
    }
    &-list {
      font-size: 20px;
      line-height: 40px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      i {
        margin-right: 15px;
        font-size: 24px;
      }
      .count {
        display: inline-block;
        margin-left: 10px;
        text-align: center;
        line-height: 25px;
        min-width: 20px;
        padding: 2px 10px;
        font-size: 14px;
        height: 25px;
        background-color: rgb(215, 46, 46);
        border-radius: 40%;
        color: #fff;
      }
    }
  }
  &-manage {
    margin-top: 50px;
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
  }
}
.postscript-enter-active {
  animation: enter 0.5s;
}
@keyframes enter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.postscript-leave-active {
  animation: leave 0.5s;
}
@keyframes leave {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.root-login-form {
  position: absolute;
  top: 400px;
  right: 105px;
}
</style>