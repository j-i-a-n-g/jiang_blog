<template>
  <aplayer
    fixed
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
      let index = this.$refs.aplayer.playIndex;
      this.$emit("changeRightNowPlay", index);
    },
  },
};
</script>

<style>
</style>