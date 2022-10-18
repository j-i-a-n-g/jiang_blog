<template>
  <div class="password">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          type="password"
          v-model="ruleForm.oldPassword"
          autocomplete="off">
          </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          v-model="ruleForm.newPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model="ruleForm.confirmPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">更改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postChangePassword } from '@/assets/api/index'
import Vue from 'vue';
export default {
  name: "Password",
  data() {
    let reg = /^[\w]{6,12}$/
    let oldPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入6-12个字符"));
      } else if (value !== this.$store.state.userInfo.password) {
        return callback(new Error("密码错误"));
      }
      callback();
    }
    let newPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else if (value === this.ruleForm.oldPassword) {
        return callback(new Error("新密码与原密码相同，无需修改"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入6-12个字符"));
      }
      callback()
    }
    let confirmPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else if (value !== this.ruleForm.newPassword) {
        return callback(new Error("两次密码不一致，请重新输入"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入6-12个字符"));
      }
      callback()
    }
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [{ validator: oldPassword, trigger: "blur" }],
        newPassword: [{ validator: newPassword, trigger: "blur" }],
        confirmPassword: [{ validator: confirmPassword, trigger: "blur" }],
      },
      id: this.$store.state.userInfo._id
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.ruleForm.id = this.id
          const {data} = await postChangePassword(this.ruleForm)
          if(!data.code) return this.$message.error('未登录账号，无需修改密码操作')
          this.$message.success(data.message)
          this.$store.commit('setUserInfo', data.data)
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
      .el-form-item--feedback {
        display: flex;
        justify-content: left;
      }
      .el-form-item__label {
        font-size: 16px;
        width: 80px !important;
        color: #fff;
      }
      .el-button--primary {
        width: 100px;
      }
    }

      .el-form-item__content {
        display: flex;
        .el-input {
            width: 400px;
          }
      }
}
</style>