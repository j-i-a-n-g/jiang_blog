<template>
  <div class="article-content">
    <span class="article-content-back" @click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>
      返回
    </span>
    <mavonEditor v-model="handbook" 
    @save="handlerSubmit" />
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import { getMdVal, reviseArticleContent } from '@/assets/api/index'
import 'mavon-editor/dist/css/index.css'
export default {
name: 'ArticleContent',
data() {
  return {
    handbook: ''
  }
},
created() {
  this.$store.commit('hideLeftSider', false)
  this.getmd(this.$route.query.id)
},
methods: {
  async getmd(val) {
    const {data}  = await getMdVal(val)
    this.handbook = data
  },
  // 保存文档，提交到后端
 async handlerSubmit(value, render) {
  const path = this.$route.query.id
   const {data} = await reviseArticleContent({value, path})
   this.$message.success(data.message)
   this.$router.push({path: '/admin'})
   this.$store.commit("hideLeftSider", false);
 }
},
beforeRouteLeave(to, from, next) {
    this.$store.commit("hideLeftSider", true);
    next();
},
components: {
  mavonEditor
}
}
</script>

<style lang="scss" scoped>
.article-content {
  margin-top: 50px;
  overflow-y: scroll;
  &-back {
    display: inline-block;
    margin-bottom: 20px;
    cursor: pointer;
  }
}
</style>