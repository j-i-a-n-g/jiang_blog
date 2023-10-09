<template>
  <el-dialog
    title="图片裁切"
    class="cropper-dialog"
    :close-on-click-modal="false"
    :visible="dialogVisible"
    center
  >
    <div class="cropper-wrap">
      <div class="cropper-box">
        <VueCropper
          ref="cropper"
          :img="cropImgUrl"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="option.info"
          :full="option.full"
          :canScale="option.canScale"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed="option.fixed"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          :high="option.high"
          :info-true="option.infoTrue"
          :max-img-size="option.maxImageSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          :maxImgSize="option.maxImgSize"
        />
        <!-- @realTime="realTime" -->
      </div>
      <!-- <div class="preview-box">
        <div class="preview-title">
          <span>预览</span>
          <span @click="upload" class="preveiw-upload">重新上传</span>
        </div>
        <input
          ref="upload"
          type="file"
          style="position: absolute; clip: rect(0 0 0 0)"
          accept="image/png, image/jpeg, image/jpg"
          @change="uploadImg"
        />
        <div :style="previewStyle" class="preview-img">
          <div :style="preview.div">
            <img :style="preview.img" :src="preview.url" />
          </div>
        </div>
      </div> -->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="finish">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  props: ["fileContent", "cropImgUrl"],
  components: { VueCropper },
  data() {
    return {
      option: {
        // img: this.cropImgUrl, // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        full: true, // 是否输出原图比例的截图
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        canMove: true, // 上传图片是否可以移动
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: 1,
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        height: true,
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        enlarge: 4, // 图片根据截图框输出比例倍数
        mode: "contain", // 图片默认渲染方式
      },
      dialogVisible: false,
    };
  },
  mounted() {},
  methods: {
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        let file = new File([data], this.fileContent.name);
        const formData = new FormData();

        formData.append("file", file);
        fetch("/node/music/coverImg", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            // 处理响应
            this.$message.success("上传封面成功");
            this.dialogVisible = false;
          })
          .catch((error) => {
            // 处理错误
            this.$message.error("上传失败");
          });
      });
    },
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper-box {
  height: 300px;
}
</style>