<template>
  <div class="article-content">
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
  console.log(this.$route.params.id);
  this.getmd(this.$route.params.id)
},
methods: {
  async getmd(val) {
    const {data}  = await getMdVal(val)
    this.handbook = data
  },
  // 保存文档，提交到后端
 async handlerSubmit(value, render) {
  const path = this.$route.params.id
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
}
</style>