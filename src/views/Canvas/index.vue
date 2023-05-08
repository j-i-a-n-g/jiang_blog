<template>
  <div class="hanabi">
    <div class="canvas-box">
      <canvasPaint
        v-if="reloadCanvas"
        ref="canvasPaint"
        @reduceFontSize="reduceFontSize"
        :formData="formData"
        :fireFlowerData="fireFlowerData"
        :BgImg="BgImg"
      />
    </div>
    <span @click="drawerShow = true" class="setting">设置属性</span>
    <el-drawer title="设置" :visible.sync="drawerShow">
      <div class="drawer-main">
        <el-button
          style="position: absolute; right: 100px; top: 20px"
          @click="saveSetting"
          type="primary"
          size="small"
          >保存设置</el-button
        >
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="文字" name="first">
            <el-form label-width="140px" :model="formData">
              <el-form-item label="文本内容主段">
                <el-input
                  :maxlength="7"
                  v-model="formData.textArr[1]"
                ></el-input>
              </el-form-item>
              <el-form-item label="文本内容副段">
                <el-input
                  :maxlength="7"
                  v-model="formData.textArr[0]"
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
              <el-form-item label="主段文本填充方式">
                <el-switch
                  v-model="formData.StrokeOrFill1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="fill"
                  inactive-value="stroke"
                  active-text="填充"
                  inactive-text="描边"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="副段文本填充方式">
                <el-switch
                  v-model="formData.StrokeOrFill2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="fill"
                  inactive-value="stroke"
                  active-text="填充"
                  inactive-text="描边"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="字体颜色">
                <el-color-picker
                  @active-change="(e) => (formData.textColor = e)"
                  v-model="formData.textColor"
                  show-alpha
                >
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
              <el-form-item v-if="formData.showShadow" label="文字阴影颜色">
                <el-color-picker v-model="formData.shadowColor1" show-alpha>
                </el-color-picker>
              </el-form-item>
              <el-form-item v-if="formData.showShadow" label="页面滤镜颜色">
                <el-color-picker v-model="formData.shadowColor2" show-alpha>
                </el-color-picker>
              </el-form-item>
              <el-form-item v-if="formData.showShadow" label="主段文字阴影模糊">
                <el-input-number
                  v-model="formData.shadowBlur1"
                  :min="0"
                  :max="25"
                ></el-input-number>
              </el-form-item>
              <el-form-item v-if="formData.showShadow" label="副段文字阴影模糊">
                <el-input-number
                  v-model="formData.shadowBlur2"
                  :min="0"
                  :max="25"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="主段文本顶部偏移">
                <el-input-number
                  v-model="formData.offsetTop1"
                  :step="50"
                  :min="-200"
                  :max="200"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="副段文本顶部偏移">
                <el-input-number
                  v-model="formData.offsetTop2"
                  :step="50"
                  :min="-200"
                  :max="200"
                ></el-input-number>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="烟花" name="second">
            <el-form label-width="140px" :model="fireFlowerData">
              <el-form-item label="烟花颜色：">
                <el-switch
                  v-model="fireFlowerData.isColorful"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="五颜六色"
                  inactive-text="自定义(仅支持五种颜色)"
                >
                </el-switch>
              </el-form-item>
              <el-form-item v-show="!fireFlowerData.isColorful" label="自定义颜色：">
                <el-color-picker
                v-for="(item, index) in fireFlowerData.fireColorArr"
                :key="index"
                  @active-change="(e) => (fireFlowerData.fireColorArr[index] = e)"
                  v-model="fireFlowerData.fireColorArr[index]"
                  color-format='hsl'
                >
                </el-color-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="背景" name="third">
            <div class="other">
              <div class="imgs_block" v-for="(img, index) in imgs" :key="index">
                <div @click="selectBGImg(index)" class="imgs_block_box">
                  <span class="title">{{ img.title }}</span>
                  <el-avatar
                    shape="square"
                    :size="100"
                    fit="contain"
                    :src="img.url"
                  ></el-avatar>
                  <i v-show="img.isActive" class="el-icon-check"></i>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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
        textArr: ["13", "Harden"],
        textColor: "red",
        textWeight: 700,
        showShadow: true,
        shadowColor1: "#fff",
        shadowColor2: "rgba(255, 255, 255, 0)",
        shadowBlur1: 25,
        shadowBlur2: 25,
        StrokeOrFill1: "fill",
        StrokeOrFill2: "stroke",
        offsetTop1: 0,
        offsetTop2: 0,
      },
      fireFlowerData: {
        isColorful: true,
        fireColorArr: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]
      },
      imgs: [
        {
          url: require("@/assets/img/CanvasBG1.png"),
          title: "静夜",
          isActive: true,
        },
        {
          url: require("@/assets/img/CanvasBG2.png"),
          title: "少女",
          isActive: false,
        },
      ],
      BgImg: require("@/assets/img/CanvasBG1.png"),
      reloadCanvas: true,
    };
  },
  methods: {
    reduceFontSize() {
      this.textFontSize--;
    },
    saveSetting() {
      // this.$refs.canvasPaint.resetCanvas();
      this.drawerShow = false;
      this.reloadCanvas = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.reloadCanvas = true;
        }, 50);
      });
    },
    // 选择背景
    selectBGImg(index) {
      this.imgs.forEach((item) => (item.isActive = false));
      this.imgs[index].isActive = true;
      this.BgImg = this.imgs[index].url;
    },
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
  .other {
    display: flex;
    padding: 0 10px;
    .imgs_block {
      margin-right: 10px;
    }
    .imgs_block_box {
      display: flex;
      position: relative;
      flex-direction: column;
      .el-icon-check {
        position: absolute;
        right: 0px;
        top: 36px;
        display: block;
        background-color: #409eff;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        border-radius: 5px;
      }
    }
    .title {
      text-align: center;
      margin: 10px;
    }
  }
}
</style>