<template>
  <div id="online-edit">
    <TopicTitle topic="开发" iconClass="el-icon-s-comment" />
    <div class="main">
      <div class="main-edit">
        <el-button
          type="primary"
          plain
          size="small"
          style="position: absolute; right: 10px; top: 5px; z-index: 10"
          @click="saveCode"
          >保存</el-button
        >
        <el-tabs type="border-card">
          <el-tab-pane label="html">
            <monica
              @setCode="setCode"
              ref="monica1"
              :code="code.html"
              language="html"
            />
          </el-tab-pane>
          <el-tab-pane label="js">
            <monica
              @setCode="setCode"
              language="javascript"
              ref="monica2"
              :code="code.js"
            />
          </el-tab-pane>
          <el-tab-pane label="css">
            <monica
              @setCode="setCode"
              language="css"
              ref="monica3"
              :code="code.css"
            />
          </el-tab-pane>
          <el-tab-pane style="background-color: black;padding: 10px;" label="更多">尚在开发中...</el-tab-pane>
        </el-tabs>
      </div>
      <div class="main-render">
        <onlineRender ref="onlineRender" :code="code" />
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
    onlineRender,
  },
  data() {
    return {
      code: {
        html: `<div class="text">123</div>`,
        js: `export default {
              components: {},
              data() {
                return {
                }
              },
              mounted() {},
              methods: {},
            }`,
        css: `.text {
                color: red
              }`,
      },
    };
  },
  mounted() {},
  methods: {
    saveCode() {
      this.$refs["monica1"].initEditer("html");
      this.$refs["monica2"].initEditer("js");
      this.$refs["monica3"].initEditer("css");
      this.$nextTick(() => {
        this.$refs["onlineRender"].initComponent();
      });
    },
    setCode(code, key) {
      this.code[key] = code;
    },
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
    position: relative;
    flex: 1;
    ::v-deep .el-tabs {
      height: 100%;
      .el-tabs__header {
        background-color: #1e1e1e;
        height: 40px;
      }
      .el-tabs__content {
        height: calc(100% - 40px);
        padding: 0;
        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
  &-render {
    flex: 1;
    border: 2px solid skyblue;
  }
}
</style>