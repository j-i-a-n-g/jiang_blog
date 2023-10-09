<template>
  <aplayer
    fixed
    :autoplay="true"
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
export default {
  components: { aplayer },
  props: ["audio"],
  data() {
    return {};
  },
  methods: {
    changePlayMusic() {
      // console.log(this.$refs.aplayer);
      let index = this.$refs.aplayer.playIndex;
      // this.rightNowPlay = this.$refs.aplayer.internalMusic;
      // this.isPlaying = true;
      // this.rightNowPlay = JSON.parse(
      //   JSON.stringify(this.$refs.aplayer.currentMusic)
      // );
      // let value = this.$refs.aplayer._computedWatchers.currentMusic.value;
      // let value = this.$refs.aplayer.internalMusic;
      // this.rightNowPlay = JSON.parse(JSON.stringify(value));
      this.$emit("changeRightNowPlay", index);
    },
  },
};
</script>

<style>
</style>