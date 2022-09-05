<template>
  <div class="article-manager">
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="文章标题" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-input
              type="text"
              v-model="scope.row.articleTitle"
              :disabled="scope.row.isDisable"
              autocomplete="off"
            ></el-input
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="文章简介" width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <el-input
              type="textarea"
              v-model="scope.row.articleDesc"
              :disabled="scope.row.isDisable"
              autocomplete="off"
            ></el-input
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="修改文章" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="scope.row.isDisable = false"
            v-if="scope.row.isDisable"
            >修改文章</el-button
          >
          <div class="botton-two" v-else>
            <el-button
              size="mini"
              @click="
                {
                  submitArticleChange(scope.row), (scope.row.isDisable = true);
                }
              "
              >提交修改</el-button
            >
            <el-button size="mini" @click="cancelArticleChange(scope.row)"
              >取消修改</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章封面" width="240">
        <template slot-scope="scope">
          <img
            style="width: 150px"
            :src="`/node${scope.row.articleImgUrl}`"
            alt=""
          />
          <el-upload
            class="upload-demo"
            action="/node/root/reviseArticleImg" 
            :data="{articleImgUrl: scope.row.articleImgUrl, id:scope.row._id}"
            :on-success="function(response){updateActicleImg(response, scope.row)}"
            :on-remove="function(file){deleteChoosedImg(file,scope.row)}"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="文章内容文件" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="routerToArticleContent(scope.row)">修改文章内容</el-button>
        </template>
      </el-table-column>
      <el-table-column label="推荐状态" width="100">
        <template slot-scope="scope">
          <el-result icon="success" v-if="scope.row.articleHot"></el-result>
          <el-result icon="error" v-else></el-result>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)"
            >是否推荐</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="2"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {
  getArticleList,
  postChangeArticleHot,
  deleteArticle,
  reviseArticleTitle,
  deleteArticleImg,
} from "@/assets/api/index";
export default {
  name: "ArticleManager",
  data() {
    return {
      tableData: [],
      // 保留一份原始数据
      originData: [],
      total: 0
    };
  },
  created() {
    this.getAllArticle();
  },
  methods: {
    // 获取文章数据
    async getAllArticle(num=1) {
      const { data } = await getArticleList(num);
      console.log(data);
      data.result.data.forEach((item) => {
        item.isDisable = true;
      });
      this.total = data.result.total
      this.tableData = data.result.data;
      this.originData = this.tableData.slice(0);
    },
    // 提交对文章内容的修改
    async submitArticleChange({articleDesc, articleTitle, _id}) {
      // const bol = this.originData.find((item) => {
      //   return item._id === row._id;
      // });
      // if (
      //   bol.articleTitle === row.articleTitle &&
      //   bol.articleDesc === row.articleDesc 
      // ) {
      //   return this.$message("未对文章内容做修改");
      // }
      const { data } = await reviseArticleTitle({
        articleDesc,
        articleTitle,
        _id
      })
      this.$message.success(data.message);
    },
    // 取消修改
    cancelArticleChange(row) {
      row.isDisable = true;
      this.tableData = this.originData.slice(0);
    },
    // 设置是否推荐该文章
    async handleEdit(row) {
      row.articleHot = !row.articleHot;
      const { data } = await postChangeArticleHot(row);
      if (!data.code) return this.$message.error(data.message);
      this.$message.success(data.message);
    },
    // 删除文章
    handleDelete({ _id }) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteArticle(_id);
          this.$message.success(data.message);
          this.getAllArticle();
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    // 上传图片成功后的事件
    updateActicleImg(response, row) {
      row.articleImgUrl = response.data.url
      console.log(response, row);
      if (response.code) {
        this.$message.success(response.message);
      } else {
        this.$message.error(response.message);
      }
    },
    // 删除图片
    async deleteChoosedImg(file, row) {
      console.log(row);
      const { data } = await deleteArticleImg({
        path: file.response.data.path,
      });
      row.articleImgUrl = '/img/avatar.png'
      this.$message.success('删除图片成功');
    },
    // 分页器
    handleCurrentChange(num) {
      this.getAllArticle(num)
    },
    // 跳转到修改文章内容页面
    routerToArticleContent(row) {
      this.$router.push({path: '/articleContent/' + row._id, query:{id: row.articleFileUrl}})
    }
  },
};
</script>

<style lang="scss" scoped>
.article-manager {
  overflow: hidden;
  ::v-deep .cell {
    text-align: center;
    .el-result {
      padding: 0;
      .el-result__icon {
        .icon-success,
        .icon-error {
          width: 30px !important;
          height: 30px !important;
        }
      }
    }
  }
  ::v-deep .botton-two {
    display: flex;
    flex-direction: column;
    button {
      margin-left: 0;
      margin-top: 15px;
    }
  }
  ::v-deep .el-table--fit {
    min-height: 780px;
  }
  ::v-deep .el-pagination {
    padding: 10px 20px;
    background-color: #fff;
  }

}
</style>