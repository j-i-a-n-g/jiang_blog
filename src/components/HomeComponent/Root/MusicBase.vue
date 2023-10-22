<template>
  <div class="article-base">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="歌曲名称" prop="m_name">
        <el-input v-model="ruleForm.m_name"></el-input>
      </el-form-item>
      <el-form-item label="歌曲语种" prop="m_language">
        <el-input v-model="ruleForm.m_language"></el-input>
      </el-form-item>
      <el-form-item label="歌曲作者" prop="m_author">
        <el-input v-model="ruleForm.m_author"></el-input>
      </el-form-item>
      <el-form-item label="歌曲介绍" prop="m_desc">
        <el-input type="textarea" v-model="ruleForm.m_desc"></el-input>
      </el-form-item>
      <el-form-item label="上传歌曲" prop="m_url">
        <el-upload
          class="upload-demo"
          ref="file"
          drag
          :limit="1"
          action="/node/music"
          :on-success="updateFile"
          :before-upload="judgeFileType"
          :on-remove="deleteChoosedFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传歌词" prop="type">
        <el-upload
          class="upload-demo"
          ref="file"
          drag
          :limit="1"
          action="/node/music/lyrics"
          :on-success="updateLyricsFile"
          :before-upload="judgeFileType"
          :on-remove="deleteChoosedFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传封面" prop="resource">
        <el-upload
          class="avatar-uploader"
          drag
          ref="image"
          :auto-upload="false"
          :limit="1"
          action="/node/music/coverImg"
          :on-success="updateCoverImg"
          :on-remove="deleteChoosedImg"
          :on-change="handleCrop"
        >
          <img v-if="imageUrl" :src="'/node/' + imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即发表</el-button
        >
      </el-form-item>
    </el-form>
    <ImgCropper
      ref="ImgCropper"
      :cropImgUrl="cropImgUrl"
      :fileContent="fileContent"
      @setImgUrl="setImgUrl"
    />
  </div>
</template>

<script>
import { publishMusic } from "@/assets/api/index";
import ImgCropper from "../Common/ImgCropper.vue";
export default {
  name: "ArticleBase",
  components: { ImgCropper },
  data() {
    return {
      ruleForm: {
        m_name: "",
        m_language: "",
        m_author: "",
        m_desc: "",
        m_url: "",
        m_coverImg_url: "",
        m_lyrics: "",
      },
      imageUrl: "",
      rules: {
        m_name: [
          { required: true, message: "请输入歌曲名称", trigger: "blur" },
        ],
        m_url: [{ required: true, message: "请上传歌曲文件", trigger: "blur" }],
      },
      fileContent: {
        name: "",
        type: "",
      },
      cropImgUrl: "",
      showCropper: false,
    };
  },
  beforeDestory() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await publishMusic(this.ruleForm);
          if (data.code !== 200) return this.$message.error(data.message);
          this.$message.success(data.message);
          this.$refs.file.clearFiles();
          this.$refs.image.clearFiles();
          this.imageUrl = "";
          this.ruleForm = {
            m_name: "",
            m_language: "",
            m_author: "",
            m_desc: "",
            m_url: "",
            m_coverImg_url: "",
            m_lyrics: "",
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCrop(file) {
      // 点击弹出剪裁框
      console.log(file);
      this.cropImgUrl = window.URL.createObjectURL(file.raw); // 将图片转化为路径
      this.fileContent.name = file.name;
      this.fileContent.type = file.raw.type;
      this.$nextTick(() => {
        this.$refs.ImgCropper.dialogVisible = true;
      });
    },
    // 上传成功后的事件
    updateFile(response, file, fileList) {
      if (response.code == 200) {
        this.$message.success(response.message);
        this.ruleForm.m_url = response.data;
      } else {
        this.$message.error(response.message);
      }
    },
    updateLyricsFile(response, file, fileList) {
      if (response.code == 200) {
        this.$message.success(response.message);
        this.ruleForm.m_lyrics = response.data;
      } else {
        this.$message.error(response.message);
      }
    },
    // 添加文件时判断文件类型
    judgeFileType(file) {
      // if(!file.name.endsWith('.txt') || !file.name.endsWith('.md')) {
      // const f = new File([file], JSON.stringify(str2charcode(file.name)))
      // uploadFile({ file: f }).then((res) => {
      //     console.log(res);
      //     // 调用上传接口成功后执行后续操作
      // })
      // }
    },
    str2charcode(str) {
      const arr = [];
      for (const key of str) {
        arr.push(key.charCodeAt());
      }
      return arr;
    },
    // 删除文件
    async deleteChoosedFile() {
      console.log(this.fileUrl.path);
      const { data } = await deleteFile({
        fileUrl: this.fileUrl.path,
      });
      this.$message.success(data.message);
    },
    // 上传图片成功后的事件
    updateCoverImg(response, file, fileList) {
      if (response.code) {
        this.$message.success(response.message);
        this.ruleForm.m_coverImg_url = response.data;
        this.imageUrl = response.data.url;
      } else {
        this.$message.error(response.message);
      }
    },
    setImgUrl(url) {
      this.imageUrl = url;
      this.ruleForm.m_coverImg_url = url;
    },
    // 删除图片
    async deleteChoosedImg() {
      this.imageUrl = "";
      // const { data } = await deleteArticleImg({
      //   path: this.articleImgUrl.path,
      // });
      // this.$message.success(data.message);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-base {
  max-width: 1200px;
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  ::v-deep .el-form-item__label {
    color: #fff;
  }
}
.avatar-uploader ::v-deep .el-upload-dragger {
  width: 180px;
  height: 180px;
}
</style>