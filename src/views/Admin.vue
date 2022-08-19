<template>
  <div class="admin">
    <el-tabs v-model="activeName">
      <el-tab-pane label="修改密码" name="first">
       <div class="admin-password">
         新密码：
        <el-input class="input" type="text" v-model="rootPass" placeholder="请输入新密码"></el-input>
       </div>
         <el-button type="primary" @click="changeRootPassword">确认修改</el-button>
      </el-tab-pane>
      <el-tab-pane label="友链管理" name="second">
        <LinkBase />
      </el-tab-pane>
      <el-tab-pane label="发表文章" name="third">
        <ArticleBase />
      </el-tab-pane>
      <el-tab-pane label="文章管理" name="fourth">文章管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { postRootPassword } from '@/assets/api/index'
import LinkBase from '@/components/HomeComponent/Root/LinkBase.vue';
import ArticleBase from '@/components/HomeComponent/Root/ArticleBase.vue';
export default {
    name: "Admin",
    data() {
        return {
            activeName: "second",
            rootPass: ""
        };
    },
    methods: {
        // 修改密码
        async changeRootPassword() {
            const { data } = await postRootPassword({ rootPass: this.rootPass });
            this.$message.success(data.message);
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit("hideLeftSider", true);
        next();
    },
    components: { LinkBase, ArticleBase }
}
</script>

<style lang="scss" scoped>
.admin {
  margin-top: 40px;
  font-size: 20px;
  &-password {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 40px 0;
    .input {
      width: 300px;
    }
  }
}
</style>