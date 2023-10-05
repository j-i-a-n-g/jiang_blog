<template>
  <div class="article">
    <TopicTitle topic="文章列表" iconClass="el-icon-document" />
    <div class="article-tag">
      <el-tag class="article-tag-all" @click="getAllArticle">全部</el-tag>
      <el-tag class="article-tag-item" v-for="item in tagList" :key="item._id" @click="selectArticleByTag(item)" type="success">{{ item.tagName }}</el-tag>
    </div>
    <div class="article-content">
      <el-row v-for=" (item, index) in articleListByTag" :key="index">
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
              <div style="display:flex; flex-wrap: nowrap;">
                <p class="article-content-title-name">{{item.articleTitle}}</p>
              <ul class="article-content-title-group">
                <li style="padding-left:10px" v-for="tag in item.articleTagList" :key="tag.id" @click="selectTags(tag)">
                  <el-tag>{{ tag.tagName }}</el-tag>
                </li>
              </ul>
              </div>
              <div class="bottom clearfix">
                <time class="time">{{ item.articleDate | timer }}</time>
                <el-button type="text" class="button" @click="watchFullText(item._id,item.articleFileUrl)">查看全文</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- <el-pagination
      :page-size="pageSize"
      :page-sizes="[8, 10, 15, 20]"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, sizes"
      :total="total"
      class="blog-pagination">
    </el-pagination> -->
    <!-- <blog-paggination style="margin-left:15px;" :total="articleList.length" :pageSize="8" /> -->
  </div>
</template>

<script>
import TopicTitle from '@/components/TopicTitle.vue'
import { getArticleList, getTagList } from "@/assets/api/index";
// import BlogPagination from '@/components/basic/Blog-Pagination.vue';
export default {
  name: "Article",
  data() {
    return {
      // 数据源
      articleList: this.$store.state.articleList,
      articleListByTag: this.$store.state.articleList,
      // 标签数组
      tagList: [],
      // 分页器相关变量
      // pageSize: 8,
      // total: 0
    }
  },
  async created() {
    const { data } = await getTagList()
    this.tagList = data.data
    if(!this.articleList.length) {
      this.getAllArticle()
    }
  },
  methods: {
    watchFullText(id,url) {
      this.$router.push({path: '/article/' + id , query:{id:url}})
    },
      // 获取文章数据
    async getAllArticle() {
      const { data } = await getArticleList();
      this.articleList = data.data.list;
      this.articleListByTag = data.data.list
      this.total = data.data.pagination.total
      this.$store.commit("setArticleList", this.articleList);
    },
    selectArticleByTag(item) {
      this.articleListByTag = []
      this.articleList.forEach(it => {
        const result = it.articleTagList.filter(tag => tag.tagName === item.tagName)
        if(!result.length) return
        this.articleListByTag.push(it)
      });
    },
    // 分页器
    // handleCurrentChange(num = 8) {
    //   this.getAllArticle(num)
    // }
  },
  components: { TopicTitle }
};
</script>

<style
    BlogPagination lang="scss" scoped>
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
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 10px;
        margin-top: 5px;
      }
      &-group {
        display: flex;
        flex-wrap: nowrap;
        margin-left: 10px;
        /* cursor: pointer; */
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
    max-height: calc(100vh - 230px);
    overflow: scroll;
  }
  &-tag {
    max-width: 760px;
    padding: 15px;
    margin-left: 5px;
    cursor: pointer;
    ::v-deep .el-tag {
      margin-right: 15px;
    }
  }
}
/* 分页器样式 */
.blog-pagination {
  ::v-deep .el-pagination__total,
  ::v-deep .btn-prev,
  ::v-deep .number,
  ::v-deep .btn-next {
    background-color: transparent !important;
    color: #fff ;
  }
  ::v-deep .el-pagination__total {
    padding-left: 15px;
  }
  ::v-deep .el-pager .active {
    text-shadow: 0 0 10px #fff;
    font-size: 16px;
  }
}
</style>