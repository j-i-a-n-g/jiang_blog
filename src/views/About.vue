<template>
  <div class="about">
    <div class="about-img">
      <img src="@/assets/img/misaka.jpg" alt="">
    </div>
    <!-- 自述 -->
    <div class="about-text">
      <h3 class="border_left">自述</h3>
      <span>这个人很神秘，什么都没有写</span>
    </div>
    <!-- 技能 -->
    <div class="about-text">
      <h3 class="border_left">技能</h3>
      <h4 v-for="(item, index) in skill" :key="index"><span>·</span>{{item}}</h4>
    </div>
    <div class="about-text">
      <h3 class="border_left">联系方式</h3>
      <span>手机号码：188****9609</span>
    </div>
    <div class="about-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="贵姓" prop="Uname">
        <el-input type="text" v-model.trim="ruleForm.Uname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="address">
        <el-input type="text" v-model.trim="ruleForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱主题" prop="topic">
        <el-input type="text" v-model.trim="ruleForm.topic"></el-input>
      </el-form-item>
      <el-form-item label="邮箱内容" prop="content">
        <el-input type="text" v-model.trim="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { postEmailMessage } from '@/assets/api/index'
export default {
  name: 'About',
  data() {
      let topic = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('主题不能为空'));
        }
        callback()
      }
      let content = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        }
        callback()
      }
      let Uname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('麻烦留下贵姓，方便后续联系'));
        }
          callback();
      }
      let address = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        } else if (!reg.test(value)) {
          callback(new Error('邮箱格式错误，请重新输入'));
        } else {
          callback();
        }
      }
    return {
      skill: [
        'JavaScript',
        'ES6',
        'JQuery',
        'Nodejs',
        'mongoose',
        'Vue2.0全家桶',
        'Github',
        'PhotoShop'
      ],
       ruleForm: {
          Uname: '',
          address: '',
          topic: '',
          content: ''
        },
        rules: {
          Uname: [
            { validator: Uname, trigger: 'blur' }
          ],
          address: [
            { validator: address, trigger: 'blur' }
          ],
          topic: [
            { validator: topic, trigger: 'blur' }
          ],
          content: [
            { validator: content, trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$message({
            message: '发送成功！',
            type: 'success'
          })
          // ajax请求
          const data = await postEmailMessage(this.ruleForm)
          console.log(data)
        } else {
          this.$message.error('发送失败，待发送信息有误，请按提示补充或修改')
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

<style lang="scss" scoped>
.about {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  &-img {
    margin: 0 auto;
    margin-top: 10px;
    img {
      height: 600px;
      border-radius: 30px;
    }
  }
  &-text {
    span {
      font-size: 20px;
    }
    h4 {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      span {
        font-weight: 800;
        margin-right: 15px;
      }
    }
  }
  h3 {
    margin: 20px auto;
    font-size: 24px;
    font-weight: 700;
    border-left: 4px solid skyblue;
    padding-left: 10px;
  }
  &-form {
    margin: 20px;
    width: 90%;
    border-radius: 30px;
    border: 1px solid #ccc;
    .el-form {
      margin: 25px auto;
      .el-form-item__label {
        font-size: 24px !important;
      }
      .el-form-item__content {
        .el-input {
          width: 400px;
        }
      }
    }
  }
}
</style>