<template>
  <div class="username">
    <p>原用户名：<span>{{$store.state.userInfo.username}}</span></p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm">
      <el-form-item label="新用户名：" prop="username">
        <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postChangeUsername } from '@/assets/api/index'
export default {
  name: "Username",
  data() {
    let username = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      } else if(value === this.$store.state.userInfo.username) {
        return callback(new Error("与原用户名一致，无需更改"));
      }
      callback();
    };
    return {
      ruleForm: {
        username: "",
        id: this.$store.state.userInfo._id
      },
      rules: {
        username: [{ validator: username, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const {data} = await postChangeUsername(this.ruleForm)
          console.log(data);
          if (data.code) {
            this.$store.commit('setUserInfo', data.data) 
            this.$message.success('更改用户名成功')
          } else {
            this.$message.success('该用户不存在，无法修改用户名')
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form {
  .el-form-item {
    display: flex;
    justify-content: left;
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-form-item__label {
      font-size: 18px;
      color: #333;
      width: 90px !important;
      text-align: left;
      padding: 0;
    }
    .el-input__inner {
      width: 300px;
    }
    .el-button--primary {
      width: 150px;
    }
  }
}
.username {
  margin-bottom: 20px;
  p {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
</style>