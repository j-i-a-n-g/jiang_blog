<template>
  <div class="full-text">
    <mavonEditor v-model="handbook" 
    :editable="false"
    :toolbarsFlag="false"
    :subfield="false"
    defaultOpen="preview"
     />
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import { getMdVal } from '@/assets/api/index'
import 'mavon-editor/dist/css/index.css'
export default {
name: 'FullText',
data() {
  return {
    handbook: ''
  }
},
created() {
  this.getmd(this.$route.params.id)
},
methods: {
  async getmd(val) {
    const {data}  = await getMdVal(val)
    this.handbook = data
  }
},
beforeRouteEnter(to, from, next) {
  next(vm => {
    vm.$store.commit("hideLeftSider", false)
  });
},
beforeRouteLeave(to, from, next) {
    this.$store.commit("hideLeftSider", true)
    next();
},
components: {
  mavonEditor
}
}
</script>

<style lang="scss" scoped>
.full-text {
  overflow-y: scroll;
}
</style>