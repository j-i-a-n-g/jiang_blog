<template>
  <div class="article">
    <h2><i class="el-icon-document">文章列表</i></h2>
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
                <el-button type="text" class="button" @click="watchFullText(item.articleFileUrl)">查看全文</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/assets/api/index'
export default {
  name: "Article",
  data() {
    return {
      // 数据源
      articleList: [],
    }
  },
  created() {
    this.getAllArticle()
  },
  methods: {
    watchFullText(url) {
      this.$router.push({name:"FullText",params:{id:url}})
    },
    // 获取文章列表
    async getAllArticle() {
      const {data} = await getArticleList()
      this.articleList = data.data
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  padding: 20px;
  h2 {
    font-size: 24px;
    font-weight: 800;
    margin: 10px;
  }
  ::v-deep .el-row {
    margin-top: 40px;
    .el-card__body {
      margin: 20px;
    }
    .article-content-img {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      .image {
        width: 100px;
        height: 100px;
        display: block;
      }
      &-desc {
        display: inline-block;
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
}
</style>