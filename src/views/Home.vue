<template>
  <div class="home">
    <TopicTitle topic="首页" iconClass="el-icon-orange">
      <h5>网站介绍：</h5>
      <p>
        本网站为个人博客空间网站，使用时需注意以下几点：
        <br />
        (1)
        点击左侧栏的“热门文章”可查看对应文章内容；“博客信息”项下有文章和账号的相关信息<br />
        (2)
        点击左侧栏最下方的“管理”，可登录管理员账号，进入网站后台，对网站所展示信息进行管理员操作。<br />
        (3)
        点击导航“文章”，页面可展示本网址内所有的已存储文章(写文章只有管理员能操作)，点击每篇文章卡片右下角“查看全文”，可进入文章内容阅读页面。<br />
        (4)
        点击导航“留言”，该功能需要登录后方可展示留言信息，展示的留言信息为所有用户曾经发送过的留言,未登录账号不显示留言信息。<br />
        (5) 点击导航“友链”，该模块分为四大功能：<br />
        ①点击“申请友链”，可填写相关信息进行申请或修改该账户友链信息，注意：一个账号只能有一个友链；后续提交申请均为修改友链信息操作<br />
        ②点击“友链展示”，点击此处可展示目前本网页已有的所有友链，点击可跳转到对应博客链接中<br />
        ③点击“推荐友链”，所有友链默认为不推荐友链，如果需设为推荐友链，需登录管理员账号进行设置<br />
        ④点击“个人友链”，会展示本账号的友链相关信息，如未登录或该账号未申请过友链，则此处的展示内容为空<br />
        (6)
        点击导航“关于”，页面最后的邮箱信息表单真实可用，填写正确的邮箱地址进行发送，网页开发人员可收到对应的邮件<br />
        (7)
        点击右上角钥匙🔑图标，可进行用户登录操作，如果是第一次登录，则为注册操作，按要求填写账号密码并且输入验证码即可注册登录成功<br />
        (8) 管理：管理员账号只有一个，登录进去后，可对网页的文章与友链进行操作。
      </p>
      <h3>技术支持:</h3>
      <p>vue2全家桶、Element-ui、nodejs、mongodb数据库、sass等技术</p>
    </TopicTitle>
  </div>
</template>

<script>
import TopicTitle from "@/components/TopicTitle.vue";
import axios from "axios";
export default {
  name: "Home",
  components: { TopicTitle },
  data() {
    return {
      warehouseOption: [1, 2, 3, 4, 5, 6],
    };
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.home {
  // padding: 20px;
  h5 {
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0;
  }
  p {
    font-size: 18px;
    line-height: 28px;
  }
}
</style>
