<template>
  <div class="article-base">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章标题" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章简述" prop="region">
        <el-input type="textarea" v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="上传文档" prop="type">
        <el-upload
          class="upload-demo"
          ref="file"
          drag
          :limit="1"
          action="/node/article/uploadFile"
          :on-success="updateFile"
          :before-upload="judgeFileType"
          :on-remove="() => deleteChoosedFile(fileUrl)"
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
          :limit="1"
          action="/node/article/uploadArticleImg"
          :on-success="updateActicleImg"
          :on-remove="() => deleteChoosedFile(articleImgUrl, 'img')"
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
  </div>
</template>

<script>
import {
  uploadFile,
  deleteFile,
  deleteArticleImg,
  publishArticle,
} from "@/assets/api/index";
export default {
  name: "ArticleBase",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请输入文章简述", trigger: "blur" },
        ],
      },
      imageUrl: "",
      fileUrl: "",
      articleImgUrl: "",
    };
  },
  beforeDestory() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await publishArticle({
            articleTitle: this.ruleForm.name,
            articleDesc: this.ruleForm.region,
            articleFileUrl: this.fileUrl,
            articleImgUrl: this.articleImgUrl,
            author: "lijiang",
          });
          if (!data.code) return this.$message.error(data.message);
          this.$message.success(data.message);
          this.$refs.file.clearFiles();
          this.$refs.image.clearFiles();
          this.fileUrl = "";
          this.articleImgUrl = "";
          this.imageUrl = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传成功后的事件
    updateFile(response, file, fileList) {
      if (response.code) {
        this.$message.success(response.message);
        this.fileUrl = response.data;
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
    // 上传图片成功后的事件
    updateActicleImg(response, file, fileList) {
      if (response.code) {
        this.$message.success(response.message);
        this.articleImgUrl = response.data;
        this.imageUrl = response.data;
      } else {
        this.$message.error(response.message);
      }
    },
    // 删除文件
    async deleteChoosedFile(url, flag) {
      const { data } = await deleteFile(url);
      this.$message.success(data.message);
      if (flag) {
        this.imageUrl = "";
      }
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
</style>