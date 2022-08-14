<template>
  <div class="login">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图标" class="el-form-item-icon" prop="userCaptcha">
      <el-input class="mini-el-form-item__label" v-model.number="ruleForm.userCaptcha"></el-input>
      <img src="@img/logo.png" alt="">
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
   data() {
      let userCaptcha = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'))
        }
          callback()
      }
      let username = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('账号不能为空'))
        } 
          callback()
      }
      let password = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码不能为空'))
        }
          callback()
      }
      return {
        ruleForm: {
          username: '',
          password: '',
          userCaptcha: ''
        },
        rules: {
          username: [
            { validator: username, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ],
          userCaptcha: [
            { validator: userCaptcha, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="scss">
.login {
  position: absolute;
  right: -19px;
  top: 51px;
  width: 400px;
  height: 250px;
  box-shadow: 0 0 3px 1px #ccc;
  padding: 20px;
  overflow: hidden;
  background-color: #fff;
  .el-form {
    .el-form-item {
      .el-form-item__label {
        font-size: 18px;
      }
      .el-button--primary {
        width: 100%;
      }
    }
  .el-form-item-icon {
    .el-form-item__content {
    display: flex;
    align-items: center;
      .mini-el-form-item__label {
        width: 200px;
      }
      img {
        width: 100px;
        height: 40px;
        margin-left: 40px;
      }
    }
  }
 }
}
</style>