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
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    let oldPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      }
      callback()
    }
    let newPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      }
      callback()
    }
    let confirmPassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      }
      callback()
    }
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
      },
      rules: {
        oldPassword: [{ validator: oldPassword, trigger: "blur" }],
        newPassword: [{ validator: newPassword, trigger: "blur" }],
        confirmPassword: [{ validator: confirmPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
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
      .el-form-item__label {
        font-size: 16px;
      }
      .el-button--primary {
        width: 50%;
      }
    }
    .el-form-item-icon {
      .el-form-item__content {
        display: flex;
        align-items: center;
        .mini-el-form-item__label {
          input {
            width: 150px;
          }
        }
      }
    }
}
</style>