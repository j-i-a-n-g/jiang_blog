<template>
  <div class="qrCode">
    <TopicTitle topic="制作二维码" iconClass="el-icon-document" />
    <div class="main">
      <div class="left">
        <Setting :formData="formData" />
      </div>
      <div class="right">
        <vue-qr 
        :text="formData.qrText"
        :correctLevel="formData.qrCorrectLevel"
        :size="formData.qrSize"
        :margin="formData.qrMargin"
        :colorDark="formData.qrColorDark"
        :colorLight="formData.qrColorLight"
        :bgSrc="formData.qrBgSrc"
        :gifBgSrc="formData.qrGifBgSrc"
        :backgroundColor="formData.qrBackgroundColor"
        :logoSrc="formData.qrLogoSrc"
        :logoScale="formData.logoScale"
        :logoMargin="formData.qrLogoMargin"
        :logoBackgroundColor="formData.qrLogoBackgroundColor"
        :logoCornerRadius="formData.qrLogoCornerRadius"
        :whiteMargin="formData.qrWhiteMargin"
        :dotScale="formData.qrDotScale"
        ></vue-qr>
      </div>
    </div>
  </div>
</template>

<script>
import TopicTitle from '@/components/TopicTitle.vue'
import Setting from './setting.vue'
import VueQr from 'vue-qr'
export default {
  components: {TopicTitle, VueQr, Setting},
  data() {
    return {
      formData: {
        qrText: "hello World",
        qrCorrectLevel: 0, // 0-3
        qrSize: 120, // 尺寸，长宽一致
        qrMargin: 20, // 二维码外边距
        qrColorDark: "#000", // 二维码实点颜色
        qrColorLight: "#fff", // 二维码空白区颜色
        qrBgSrc: null, // 要嵌入的背景图地址
        qrGifBgSrc: null, // 要嵌入的Gif背景图地址
        qrBackgroundColor: "#fff",// 背景色
        qrBackgroundDimming: "#ccc",//叠加在背景图上的颜色
        qrLogoSrc: null,// logo图
        qrLogoScale: 0.2, // logo大小
        qrLogoMargin: 0, // logo周围的留白
        qrLogoBackgroundColor: "transparent", // logo的背景颜色
        qrLogoCornerRadius: 0, //logo边框的圆角半径
        qrWhiteMargin: true, // 背景图外将绘制白色边框
        qrDotScale: 1, //数据区域点缩小
      }
    }
  },
  methods: {
    savingSetting(data) {
      this.formData = data;
    }
  }
}
</script>

<style lang="scss" scoped>
.qrCode {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}
.main {
  height: 100%;
  display: flex;
  .left {
    height: calc(100vh - 120px);
    background-color: rgba(225, 225, 225, .2);
    overflow: scroll;
    flex: 2;
  }
  .right {
    flex: 1;
    border-left: 1px solid #ccc;
    text-align: center;
    height: calc(100vh - 120px);
    box-sizing: border-box;
    padding-top: 40px;
    background-color: #fff;
    img {
      border: 1px solid #000;
    }
  }
}
</style>