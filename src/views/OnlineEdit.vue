<template>
  <div id="online-edit">
  <TopicTitle topic="在线开发" iconClass="el-icon-s-comment" />
  <div class="main">
    <div class="main-edit">
  <monica />
    </div>
    <div  class="main-render">
    </div>
  </div>
</div>
</template>

<script>
import monica from '@/components/monica/monica.vue'
export default {
  components: {
    monica
  }

}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-wrap: nowrap;
  &-edit {
    flex: 1;
  }
  &-render {
    flex: 1;
  }
}
</style>