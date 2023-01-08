<template>
  <div class="article">
    <TopicTitle topic="文章列表" iconClass="el-icon-document" />
    <div class="article-content">
      <el-row v-for="item in articleList" :key="item._id">
        <el-col :span="24">
          <el-card :body-style="{ padding: '0px' }">
            <div class="article-content-img">
              <img
                :src="'/node' + item.articleImgUrl"
                class="image"
              />
              <span class="article-content-img-desc"
                >{{item.articleDesc}}</span
              >
            </div>
            <div class="article-content-title">
              <p class="article-content-title-name">{{item.articleTitle}}</p>
              <div class="bottom clearfix">
                <time class="time">{{ item.articleDate | timer }}</time>
                <el-button type="text" class="button" @click="watchFullText(item._id,item.articleFileUrl)">查看全文</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TopicTitle from '@/components/TopicTitle.vue'
import { getArticleList } from "@/assets/api/index";
export default {
  name: "Article",
  data() {
    return {
      // 数据源
      articleList: this.$store.state.articleList
    }
  },
  created() {
    if(!articleList.length) {
      getAllArticle()
    }
  },
  methods: {
    watchFullText(id,url) {
      this.$router.push({path: '/article/' + id , query:{id:url}})
    },
      // 获取文章数据
    async getAllArticle() {
      const { data } = await getArticleList();
      const articleList = data.result;
      this.blogText[0].changeNumber = articleList.length;
      this.$store.commit("setArticleList", articleList);
    }
  },
  components: { TopicTitle }
};
</script>

<style lang="scss" scoped>
.article {
  padding: 20px;
  ::v-deep .el-row {
    max-width: 800px;
    transform: scale(0.95);
    box-shadow: 0 0 0 #fff;
    transition: all .3s;
    &:hover {
      transform: scale(0.98);
      box-shadow: 0 0 5px #fff;
      transition: all .5s;
    }
    .el-card__body {
      margin: 10px 20px;
    }
    .article-content-img {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      .image {
        width: 80px;
        height: 80px;
        display: block;
      }
      &-desc {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        // 谷歌
        display: -webkit-box;
        // 行数
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        font-size: 14px;
        line-height: 20px;
        max-width: 800px;
        margin-left: 20px;
        font-size: 14px;
        color: #999;
      }
    }
    .article-content-title {
      padding-top: 20px;
      &-name {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 15px;
      }
    }
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }
  }
  &-content {
    max-height: calc(100vh - 200px);
    overflow: scroll;
  }
}
</style>