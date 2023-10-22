<template>
  <div class="music">
    <TopicTitle topic="来点音乐" iconClass="el-icon-headset">
      <div class="main" v-if="rightNowPlay">
        <div class="music_data">
          <span class="music_cover">
            <img :src="rightNowPlay.pic" alt="" />
          </span>
          <div class="music_desc">
            <h2 class="title">
              {{ rightNowPlay.title }} [ {{ rightNowPlay.artist }} ]
            </h2>
            <div class="content">
              <span>语种：{{ rightNowPlay.language }}</span>
              <span>上传时间：{{ rightNowPlay.createTime }}</span>
            </div>
            <div class="desc">
              <span>歌曲详情：</span>
              <span>{{ rightNowPlay.desc }}</span>
            </div>
          </div>
        </div>
        <div class="detail_layout">
          <!-- 歌词 -->
          <div class="detail_layout_main">
            <div class="detail_title">
              <span>歌词</span>
              <i class="el-icon-document-copy"></i>
            </div>
            <p class="detail_lyrics"></p>
          </div>
          <!-- 推荐 -->
          <div class="detail_layout_other"></div>
        </div>
        <!-- <div class="footer">
        <player :audio="audio" @changeRightNowPlay="changeRightNowPlay" />
      </div> -->
      </div>
      <div class="canvas_box">
        <canvas ref="canvas" width="1000px" height="200px"></canvas>
      </div>
    </TopicTitle>
  </div>
</template>

<script>
import { mapState } from "vuex";
import analyserAudio from "./analyser";
// import player from "./Aplayer.vue";
// import { getMusicList } from "@/assets/api/index";
export default {
  name: "Music",
  data() {
    return {
      scrollTimer: null,
    };
  },
  // components: { player },
  computed: {
    ...mapState({
      rightNowPlay: function (state) {
        return state.musicSongsList[state.currentSingIndex];
      },
    }),
  },
  watch: {
    rightNowPlay: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.lrc) {
          this.requestLyrics(val.lrc);
        }
      },
    },
  },
  mounted() {
    analyserAudio();
  },
  beforeDestroy() {
    this.resetScroll();
  },
  methods: {
    /**
     * 请求歌词文件,并放置到页面
     */
    requestLyrics(lrc) {
      this.resetScroll();
      const xhr = new XMLHttpRequest();
      xhr.open("GET", lrc ? lrc : this.rightNowPlay.lrc, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const content = xhr.responseText;
          this.$nextTick(() => {
            let html = document.querySelector(".detail_lyrics");
            html.innerHTML = content;
            this.LyricsAutoScroll();
          });
        }
      };
      xhr.send();
    },
    /**
     * 歌词自动滚动
     */
    LyricsAutoScroll() {
      const pElement = document.querySelector(".detail_lyrics");
      const textHeight = pElement.scrollHeight;
      const pHeight = pElement.offsetHeight;
      if (textHeight > pHeight) {
        this.scrollTimer = setInterval(() => {
          // 滚动高度大于列表高度时，复位0
          // function scroll() {
          if (
            pElement.scrollTop >
            pElement.scrollHeight - pElement.offsetHeight
          ) {
            pElement.scrollTop = 0;
          } else {
            pElement.scrollTop += 1;
          }
          // }
        }, 60);
      } else {
        this.resetScroll();
      }
    },
    resetScroll() {
      clearInterval(this.scrollTimer);
      this.scrollTimer = null;
      const pElement = document.querySelector(".detail_lyrics");
      if (pElement) {
        pElement.scrollTop = 0;
      }
    },
  },
  changeRightNowPlay(index) {
    if (index == -1) {
      this.rightNowPlay = this.audio[0];
    } else {
      this.rightNowPlay = this.audio[index];
    }
    this.requestLyrics();
  },
};
</script>

<style lang="scss" scoped>
.music .main {
  height: calc(100% - 50px);
  margin: 40px 50px 0;
  .music_data {
    position: relative;
    height: 200px;
    .music_cover {
      position: absolute;
    }
    .music_cover img {
      width: 200px;
      height: 200px;
    }
    .music_desc {
      position: absolute;
      padding-left: 305px;
      height: 200px;
      width: 500px;
      h2 {
        font-size: 28px;
        line-height: 32px;
      }
      .content {
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
      .content span:first-child {
        margin-right: 30px;
      }
      .desc {
        line-height: 24px;
      }
    }
  }
  .detail_layout {
    margin-top: 50px;
    height: calc(100vh - 500px);
    display: flex;
    .detail_layout_main {
      flex: 7;
      .detail_title {
        font-size: 24px;
        padding-bottom: 20px;
        span:first-child {
          margin-right: 20px;
        }
      }
    }
    .detail_layout_other {
      flex: 3;
    }
  }
}
.detail_lyrics {
  height: calc(100% - 50px);
  overflow: scroll;
  white-space: pre-line;
}
// 播放器样式
.footer {
  position: relative;
  bottom: -50px;
}
.aplayer {
  overflow: unset !important;
}
.aplayer ::v-deep .aplayer-list {
  background-color: #fff;
  height: var(--h) !important;
  width: 300px !important;
  position: absolute !important;
  right: 0px !important;
  bottom: 51px !important;
  overflow: scroll;
}
// 右下角canvas动画
.canvas_box {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>