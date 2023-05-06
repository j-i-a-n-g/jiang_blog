<template>
  <div class="hanabi">
    <div class="canvas-box">
      <canvasPaint
        ref="canvasPaint"
        @reduceFontSize="reduceFontSize"
        :textFontSize="formData.textFontSize"
        :textArr="formData.textArr"
        :textColor="formData.textColor"
        :textWeight="formData.textWeight"
        :showShadow="formData.showShadow"
        :shadowBlur1="formData.shadowBlur1"
        :shadowBlur2="formData.shadowBlur2"
      />
    </div>
    <span @click="drawerShow = true" class="setting">设置属性</span>
    <el-drawer title="设置" :visible.sync="drawerShow">
      <div class="drawer-main">
    <el-button style="position: absolute;right: 100px;top: 20px;" @click="saveSetting" type="primary" size="small">保存设置</el-button>
        <el-form label-width="140px" :model="formData">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="文字" name="first">
              <div>
                <el-form-item label="文本内容主段">
                  <el-input
                    :maxlength="5"
                    v-model="formData.textArr[0]"
                  ></el-input>
                </el-form-item>
                <el-form-item label="文本内容副段">
                  <el-input
                    :maxlength="5"
                    v-model="formData.textArr[1]"
                  ></el-input>
                </el-form-item>
                <el-form-item label="文字粗细">
                  <el-input-number
                    v-model="formData.textWeight"
                    :step="100"
                    :min="500"
                    :max="1000"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="字体大小">
                  <el-input
                    type="number"
                    v-model="formData.textFontSize"
                  ></el-input>
                </el-form-item>
                <el-form-item label="字体颜色">
                  <el-color-picker v-model="formData.textColor" show-alpha>
                  </el-color-picker>
                </el-form-item>
                <el-form-item label="是否设置文字阴影">
                  <el-switch
                    v-model="formData.showShadow"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item
                  v-if="formData.showShadow"
                  label="主段文字阴影颜色"
                >
                  <el-color-picker v-model="formData.shadowColor1" show-alpha>
                  </el-color-picker>
                </el-form-item>
                <el-form-item
                  v-if="formData.showShadow"
                  label="副段文字阴影颜色"
                >
                  <el-color-picker v-model="formData.shadowColor2" show-alpha>
                  </el-color-picker>
                </el-form-item>
                <el-form-item
                  v-if="formData.showShadow"
                  label="主段文字阴影模糊"
                >
                  <el-input-number
                    v-model="formData.shadowBlur1"
                    :min="0"
                    :max="25"
                  ></el-input-number>
                </el-form-item>
                <el-form-item
                  v-if="formData.showShadow"
                  label="副段文字阴影模糊"
                >
                  <el-input-number
                    v-model="formData.shadowBlur2"
                    :min="0"
                    :max="25"
                  ></el-input-number>
                </el-form-item>
              </div>
            </el-tab-pane>
            <el-tab-pane label="烟花" name="second">烟花</el-tab-pane>
            <el-tab-pane label="其他" name="third">其他</el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import canvasPaint from "@/components/Canvas/canvas.vue";
export default {
  components: { canvasPaint },
  data() {
    return {
      drawerShow: false,
      activeName: "first",
      formData: {
        textFontSize: 200,
        textArr: ["Hello", "Canvas"],
        textColor: "yellow",
        textWeight: 700,
        showShadow: true,
        shadowColor1: "#fff",
        shadowColor2: "#fff",
        shadowBlur1: 25,
        shadowBlur2: 25,
      },
    };
  },
  methods: {
    reduceFontSize() {
      this.textFontSize--;
    },
    saveSetting() {
      this.$refs.canvasPaint.resetCanvas();
      this.drawerShow = false
    }
  },
};
</script>

<style lang="scss" scoped>
.hanabi {
  width: 100%;
  height: 100%;
  position: relative;
  .canvas-box {
    width: 100%;
    height: calc(100% - 20px);
    background-color: black;
  }
  .setting {
    position: absolute;
    z-index: 10;
    right: 0;
    top: 60px;
    display: block;
    width: 20px;
    height: 80px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    padding-top: 20px;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
  }
  ::v-deep .el-drawer {
    color: #333;
  }
  .drawer-title {
    padding-left: 20px;
    font-weight: 600;
    margin: 20px 0;
  }
  .el-tab-pane ::v-deep .el-form-item {
    margin-bottom: 10px;
    .el-input {
      max-width: 300px;
    }
  }
}
</style>