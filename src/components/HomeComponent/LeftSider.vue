<template>
  <div class="left">
    <div class="left-avatar">
      <img class="left-avatar-img" src="@img/comImg/touxiang.png" alt="" />
    </div>
    <div class="left-title">不求与人相比，但求超越自己</div>
    <div class="box_trani" @click="changeTransition">{{ text_box }}</div>
    <!-- 文章 -->
    <div class="left-article-text">
      <h3 class="border_left">热门文章</h3>
      <ul>
        <li
          class="left-article-text-list"
          v-for="(item, index) in article_Arr"
          :key="index"
        >
          <div class="article_bg">
            <img :src="item.imgSrc" alt="" draggable="false" />
          </div>
          <span>{{ item.HotTitle }}</span>
        </li>
      </ul>
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
  </div>
</template>

<script>
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
      article_Arr: [
        {
          imgSrc: require("@img/comImg/hot1.png"),
          HotTitle: "一个可以绑定多个天翼云网盘的目录列表程序",
        },
        {
          imgSrc: require("@img/comImg/hot2.png"),
          HotTitle:
            "cpulimit 是一个限制进程的 CPU 使用率的工具（以百分比表示，而不是 CPU 时间）。当您不希望批处理作业占用太多 CPU 周期时，控制批处理作业很有用",
        },
        {
          imgSrc: require("@img/comImg/hot3.png"),
          HotTitle:
            "查找适合自己当前网络环境的优选Cloudflare Anycast IP，具体这玩意儿有啥用？可以",
        },
        {
          imgSrc: require("@img/comImg/hot4.png"),
          HotTitle:
            "Deluge是一款免费的 BT 传输软件，相比于其他同类产品，Deluge完美支持各大主流操作系统( Windows 、 Linux 、 Mac OS )，软件体积小巧、绿色安全，",
        },
        {
          imgSrc: require("@img/comImg/hot5.png"),
          HotTitle:
            "多时候，我们监控程序都使用supervisor，但是在一些小场景中，没必要安装额外的软件，并且supervisor对新手不太友好，需要根据他的语法格式进行撰写",
        },
      ],
      blogText: [
        {
          iconClass: "el-icon-notebook-1",
          titleText: "文章",
          changeNumber: "1",
        },
        {
          iconClass: "el-icon-chat-dot-square",
          titleText: "评论数量",
          changeNumber: "2",
        },
        {
          iconClass: "el-icon-loading",
          titleText: "运行天数",
          changeNumber: "3",
        },
        {
          iconClass: "el-icon-edit",
          titleText: "最后活动",
          changeNumber: "4",
        },
      ],
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 300px;
  height: 100vh;
  padding: 17px;
  background: transparent;
  box-shadow: 0 0 5px 2px #ccc;

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
  }
  // 热门文章
  .left-article-text {
    margin-top: 50px;

    &-list {
      display: flex;
      flex-direction: row;
      height: 60px;
      margin-top: 15px;
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
        width: 40px;
        height: 25px;
        background-color: rgb(215, 46, 46);
        border-radius: 40%;
        color: #fff;
      }
    }
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
</style>