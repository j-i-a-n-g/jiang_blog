<template>
  <div class="user-information">
    <h3 class="border-left">修改资料</h3>
    <div class="user-information-tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户名" name="first">
          <UserName></UserName>
        </el-tab-pane>
        <el-tab-pane label="密码" name="second">
          <Password></Password>
        </el-tab-pane>
        <el-tab-pane label="头像" name="third">
          <div class="user-information-tab-avatar">
            <el-alert
              title="点击上传图片修改头像"
              type="warning"
              show-icon>
            </el-alert>
            <div class="user-information-tab-avatar-box">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UserName from '../UserInformationTag/UserName.vue';
import Password from '../UserInformationTag/Password.vue';
export default {
    name: "UserInformation",
    data() {
      return {
      activeName: "first"
      }
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        },
    },
    components: { UserName, Password }
};
</script>

<style lang="scss">
.user-information {
  width: 100%;
  padding: 20px;
  &-tab-avatar-box {
    margin-top: 20px;
    width: 200px;
    height: 200px;
    font-size: 40px;
    font-weight: 300;
    color: #999;
    border: 1px solid #999;
    background-color: #fff;
    text-align: center;
    line-height: 200px;
  }
}
</style>