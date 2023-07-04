<template>
  <div class="setting-qr">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="二维码内容">
        <el-input v-model="form.qrText"></el-input>
      </el-form-item>
      <el-form-item label="二维码尺寸">
        <el-input-number
        size="mini"
          v-model="form.qrSize"
          :min="60"
          :max="300"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="容错级别">
        <el-input-number
        size="mini"
          v-model="form.qrCorrectLevel"
          :min="0"
          :max="3"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="码外边距">
        <el-input-number
        size="mini"
          v-model="form.qrMargin"
          :step="5"
          :min="0"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="实点颜色">
            <el-color-picker
              v-model="form.qrColorDark"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="空白区颜色">
            <el-color-picker
              v-model="form.qrColorLight"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="背景色">
            <el-color-picker
              v-model="form.qrBackgroundColor"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="背景图叠加色">
            <el-color-picker
              v-model="form.qrBackgroundDimming"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="背景图地址">
        <el-input v-model="form.qrBgSrc"></el-input>
      </el-form-item>
      <el-form-item label="gif背景图地址">
        <el-input v-model="form.qrGifBgSrc"></el-input>
      </el-form-item>
      <el-form-item label="logo图地址">
        <el-input v-model="form.qrLogoSrc"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="logo大小">
            <el-input-number
            size="mini"
              v-model="form.qrLogoScale"
              :step="0.1"
              :min="0"
              :max="1"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="logo圆角">
            <el-input-number
            size="mini"
              v-model="form.qrLogoCornerRadius"
              :step="1"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="logo背景颜色">
            <el-color-picker
              v-model="form.qrLogoBackgroundColor"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="logo边留白">
            <el-input-number
            size="mini"
              v-model="form.qrLogoMargin"
              :step="2"
              :min="0"
              :max="30"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="外层白色边框">
            <el-switch v-model="form.qrWhiteMargin"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据区域点缩小">
            <el-input-number size="mini" v-model="form.qrDotScale"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-group">
      <el-button type="primary" @click="onSubmit">生成二维码</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      require: true,
    },
  },
  data() {
    return {
      form: this.formData
    };
  },
  methods: {
    onSubmit() {
      this.$emit("savingSetting", this.form)
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-qr {
  padding: 60px 10px 10px;
  margin-top: 20px;
  position: relative;
}
.setting-qr ::v-deep .el-form-item {
  margin-bottom: 10px !important;
  & .el-form-item__label {
    color: #fff !important;
  }
}
.btn-group {
  position: absolute;
  top: 0;
  right: 20px;
}
</style>