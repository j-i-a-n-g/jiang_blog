<template>
  <div id="online-edit">
    <TopicTitle topic="在线开发" iconClass="el-icon-s-comment" />
    <div class="main">
      <div class="main-edit">
        <el-tabs type="border-card">
          <el-tab-pane label="html">
            <monica :code="code.htmlCode" language="html" />
          </el-tab-pane>
          <el-tab-pane label="js" language="js">
            <monica :code="code.jsCode" />
          </el-tab-pane>
          <el-tab-pane label="css" language="css">
            <monica :code="code.cssCode" />
          </el-tab-pane>
          <el-tab-pane label="更多">敬请期待...</el-tab-pane>
        </el-tabs>
      </div>
      <div class="main-render">
        <onlineRender :code="code" />
      </div>
    </div>
  </div>
</template>

<script>
import monica from "@/components/monica/monica.vue";
import onlineRender from "@/components/monica/render.vue";
export default {
  components: {
    monica,
    onlineRender
  },
  data() {
    return {
      code: {
        htmlCode: `<div>123</div>`,
        jsCode: `ecport default {}`,
        cssCode: ``,
      }
    };
  },
  mounted() {
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-wrap: nowrap;
  &-edit {
    flex: 1;
    ::v-deep .el-tabs {
      height: 100%;
      .el-tabs__content {
        height: 100%;
        padding: 0;
        .el-tab-pane {
          height: 90%;
        }
      }
    }
  }
  &-render {
    flex: 1;
  }
}
</style>