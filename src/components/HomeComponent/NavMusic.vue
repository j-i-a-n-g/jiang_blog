<template>
  <aplayer
    fixed
    :autoplay="true"
    :float="true"
    :listFolded="true"
    repeat="list"
    v-if="audio.length"
    ref="aplayer"
    :list="audio"
    :music="{
      title: audio[0].title,
      artist: audio[0].artist,
      src: audio[0].url,
      pic: audio[0].pic,
      lrc: audio[0].lrc,
    }"
    @play="changePlayMusic"
  />
</template>

<script>
import aplayer from "vue-aplayer";
import { getMusicList } from "@/assets/api/index";
export default {
  components: { aplayer },
  data() {
    return {
      audio: [],
    };
  },
  async created() {
    let result = await getMusicList();
    if (result.data.code == 200) {
      let list = result.data.data;
      list.forEach((item) => {
        this.audio.push({
          title: item.m_name,
          artist: item.m_author,
          url: "/node" + item.m_url,
          pic: "/node" + item.m_coverImg_url,
          lrc: "/node" + item.m_lyrics,
          language: item.m_language,
          createTime: item.createTime,
          desc: item.m_desc,
        });
      });
      this.$store.commit("musicSongsList", this.audio);
      this.$nextTick(() => {
        let listHtml = document.querySelector(".aplayer-list");
        // 动态设置列表高度
        listHtml.style.setProperty(
          "--h",
          this.audio.length > 10 ? "330px" : this.audio.length * 33 + "px"
        );
        listHtml.style.setProperty(
          "--b",
          this.audio.length > 10
            ? "-334px"
            : (this.audio.length * 33 + 4) * -1 + "px"
        );
      });
    }
  },
  methods: {
    /**
     * 请求歌词文件,并放置到页面
     */
    requestLyrics() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", this.rightNowPlay.lrc, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const content = xhr.responseText;
          let html = document.querySelector(".detail_lyrics");
          html.innerHTML = content;
          this.LyricsAutoScroll();
        }
      };
      xhr.send();
    },
    changePlayMusic() {
      let index = this.$refs.aplayer.playIndex;
      this.$store.commit("setCurrentSingIndex", index == -1 ? 0 : index);
    },
  },
};
</script>

<style lang="scss" scoped>
.aplayer {
  overflow: unset !important;
  top: 10px !important;
  width: 500px;
}
.aplayer ::v-deep .aplayer-list {
  background-color: #fff;
  height: var(--h) !important;
  width: 300px !important;
  position: absolute !important;
  right: 0px !important;
  bottom: var(--b) !important;
  overflow-y: auto;
}
</style>