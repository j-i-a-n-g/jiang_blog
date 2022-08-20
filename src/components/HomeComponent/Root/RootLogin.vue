<template>
  <div class="root-login" v-show="isShow" >
    <h4>管理员登录入口</h4>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
     <el-form-item label="账号:" prop="rootName">
        <el-input v-model="ruleForm.rootName"></el-input>
      </el-form-item>
      
      <el-form-item label="密码:" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.rootPass"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { rootLogin } from '@/assets/api/index'
export default {
  name: "RootLogin",
  props: ['isShow'],
  data() {
    var rootName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
       callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } 
        callback();
    };
    return {
      ruleForm: {
        rootPass: "123123",
        rootName: "root",
      },
      rules: {
        rootPass: [{ validator: validatePass, trigger: "blur" }],
        rootName: [{ validator: rootName, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交表单事件
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const {data} = await rootLogin(this.ruleForm)
          this.$store.commit('setRootName', data.data.rootName)
          this.$message.success(data.message)
          this.$store.commit('hideLeftSider', false)
          this.$emit('hideRootLogin')
          this.$router.push('/admin')
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.root-login {
  z-index: 99;
  width: 400px;
  height: 300px;
  padding: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  h4 {
    text-align: center;
    line-height: 30px;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  ::v-deep .el-form {
    // background-color: pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-form-item {
      .el-form-item__label {
        width: 50px !important;
        padding: 0;
        font-size: 18px;
      }
      .el-form-item__content {
        width: 200px;
      }
    }
  }
}
</style>