<template>
  <div class="music">
    <aplayer fixed 
    :music="{
      title: '有心人',
      artist: '邓紫棋',
      src: 'https://dl.stream.qqmusic.qq.com/C400001zF1FS1Hzstk.m4a?guid=140044668&vkey=FB27C9B066EEDE11509AACBE18975472470513C5424628D21CD910ABBED5721A5B0D7597E99A382E9172A3B7D3EF0DF9A4B48DEEE6F12268&uin=&fromtag=120032',
      pic: 'https://y.qq.com/music/photo_new/T002R300x300M000000FyZ4M1bYVm8_1.jpg?max_age=2592000'
    }"
  />
  </div>
</template>

<script>
import aplayer from "vue-aplayer"
export default {
  name: 'NavMusic',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  components: { aplayer }
}
</script>

<style lang="scss">
.music {
  height: 50px;
  width: 300px;
  margin: 0;
  .aplayer {
    margin: 0;
    height: 50px;
    .aplayer-body {
      height: 50px !important; 
      .aplayer-pic {
        width: 50px;
        height: 50px;
      }
      .aplayer-info {
        padding: 0 7px 0 10px;
        height: 50px;
      }
    }
  }
}
</style>