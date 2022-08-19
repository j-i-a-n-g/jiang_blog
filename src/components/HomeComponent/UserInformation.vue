<template>
  <div class="user-information">
    <h3 class="border-left">修改资料</h3>
    <div class="user-information-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 修改用户名 -->
        <el-tab-pane label="用户名" name="first">
          <UserName></UserName>
        </el-tab-pane>
        <!-- 修改密码 -->
        <el-tab-pane label="密码" name="second">
          <Password></Password>
        </el-tab-pane>
        <!-- 修改头像 -->
        <el-tab-pane label="头像" name="third">
          <div class="user-information-tab-avatar">
            <el-alert title="点击上传图片修改头像" type="warning" show-icon>
            </el-alert>
            <el-upload
              class="avatar-uploader"
              action="/node/blog/changeAvatar"
              :data='{"id": $store.state.userInfo._id}'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UserName from "../UserInformationTag/UserName.vue";
import Password from "../UserInformationTag/Password.vue";
export default {
  name: "UserInformation",
  data() {
    return {
      activeName: "first",
      imageUrl: "",
    };
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$store.commit('setUserInfo', res.data)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  components: { UserName, Password },
};
</script>

<style lang="scss">
.user-information {
  width: 100%;
  padding: 20px;
}
.avatar-uploader .el-upload {
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
</style>