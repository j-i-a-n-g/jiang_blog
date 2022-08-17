<template>
   <div class="emoji">
     <b v-for="(item,index) of emoji" :key="index" @click="chooseEmoji(item)">{{item}}</b>
   </div>
</template>

<script>
export default {
    name:"Emoji",
    props:["emoji"],
    methods: {
      chooseEmoji(item) {
        this.$emit('chooseEmoji', item)
      }
    }
}
</script>

<style lang="scss" scoped>
.emoji {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  b {
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border: 1px solid #999;
  }
}
</style>