<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证" class="el-form-item-icon" prop="userCaptcha">
        <el-input class="mini-el-form-item__label" v-model="ruleForm.userCaptcha"></el-input>
        <div class="svg-box" ref="svgBox" @click="changeSvgImg">
          <img src="@img/logo.png" alt="" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSvgCaptcha, postUserLogin } from "@/assets/api/index";
export default {
  name: "Login",
  data() {
    let userCaptcha = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (value.toLowerCase() !== this.isSvg) {
        return callback(new Error("验证码错误"));
      }
      callback();
    }
    let username = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      }
      callback();
    }
    let password = (rule, value, callback) => {
      let reg = /^[\w]{6,12}$/
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("请输入6-12个字符"));
      }
      callback();
    }
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: username, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }],
        userCaptcha: [{ validator: userCaptcha, trigger: "blur" }],
      },
      // 验证码正确内容
      isSvg: "",
    };
  },
  mounted() {
    this.getSvgMessage();
  },
  methods: {
    // 点击登录按钮事件
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await postUserLogin(this.ruleForm);
          console.log(data);
          if (data.code) {
            this.$store.commit("setUserInfo", data.data);
            this.$message.success(data.message);
            this.$emit("changeLoginState");
          } else {
            return this.$message.error("密码错误");
          }
        } else {
          this.$message.error("验证码错误，请重新输入");
          return false;
        }
      });
    },
    // 请求验证码图
    async getSvgMessage() {
      const { data } = await getSvgCaptcha();
      this.isSvg = data.text.toLowerCase();
      this.$refs.svgBox.innerHTML = data.data;
    },
    // 刷新验证码
    changeSvgImg() {
      this.getSvgMessage();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  right: -19px;
  top: 51px;
  width: 320px;
  height: 250px;
  box-shadow: 0 0 3px 1px #ccc;
  padding: 20px;
  overflow: hidden;
  background-color: #fff;
  ::v-deep .el-form {
    .el-form-item {
      .el-form-item__label {
        font-size: 16px;
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
          input {
            width: 150px;
          }
        }
        .svg-box {
          width: 100px;
          height: 40px;
          margin-left: 40px;
          img {
            width: 100px;
            height: 40px;
          }
        }
      }
    }
  }
}
</style>