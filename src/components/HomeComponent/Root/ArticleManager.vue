<template>
  <div class="article-manager">
    <!-- 修改文章相关Tag的弹窗 -->
    <el-dialog
      title="请选择该文章相关联的Tag"
      :visible.sync="tagDialogVisible"
      width="40%">
      <div class="dialog-tag">
      <p>可选标签</p>
      <div class="not-selected">
        <el-tag 
        closable
        @click="choosedTag(item)" 
        class="dialog-tag-item" v-for="item in tagList" 
        :key="item._id" 
        @close="deleteTag(item)"
        type="success">
        {{ item.tagName }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
      </div>
      <p style="margin-top:30px">已选标签</p>
      <div class="selected">
        <el-tag @click="removeTag(item)" class="dialog-tag-item" v-for="(item, index) in choosedTagList" :key="index" type="success">{{ item.tagName }}</el-tag>
        <p v-show="!choosedTagList.length" style="font-size:14px;color:#ccc;text-align:center">暂无标签</p>
      </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tagDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTagList">确 定</el-button>
      </span>
    </el-dialog>
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
            action="/node/article/reviseArticleImg" 
            :data="{articleImgUrl: scope.row.articleImgUrl, id:scope.row._id}"
            :on-success="(response) => {updateActicleImg(response, scope.row)}"
            :on-remove="(file) => {deleteChoosedImg(file,scope.row)}"
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
          <el-button size="mini" @click="handlechangeTag(scope.row)"
            >添加标签</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="3"
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
  getArticleTagList,
  reviseArticleTagList,
  deleteArticleImg,
  getTagList,
  addTag,
  deleteTag
} from "@/assets/api/index";
export default {
  name: "ArticleManager",
  data() {
    return {
      tableData: [],
      // 保留一份原始数据
      originData: [],
      total: 0,
      // 添加新tag
      inputVisible: false,
      inputValue: '',
      // 选择tag弹窗是否显示
      tagDialogVisible: false,
      // 所有标签数组
      // tagList: [
      //   {
      //     id: 0,
      //     tagName: '前端'
      //   },
      //   {
      //     id: 1,
      //     tagName: '正则'
      //   },
      //   {
      //     id: 2,
      //     tagName: 'C#'
      //   },
      //   {
      //     id: 3,
      //     tagName: 'TypeScript'
      //   },
      //   {
      //     id: 4,
      //     tagName: 'Webpack'
      //   },
      //   {
      //     id: 5,
      //     tagName: 'Vue'
      //   },
      //   {
      //     id: 6,
      //     tagName: 'JavaScript'
      //   }
      // ],
      tagList: [],
      // 已选标签数组
      choosedTagList: [],
      // 编辑的文章对应_id
      choosedId: -1,
      inputVisible: false,
      inputValue: ''
    };
  },
  created() {
    this.getAllArticle();
  },
  methods: {
    // 获取文章数据
    async getAllArticle(num=1, pageSize=3) {
      const { data } = await getArticleList(num, pageSize);
      console.log(data);
      data.data.list.forEach((item) => {
        item.isDisable = true;
      });
      this.total = data.data.pagination.total
      this.tableData = data.data.list;
      this.originData = this.tableData.slice(0);
    },
    // 提交对文章内容的修改
    async submitArticleChange({articleDesc, articleTitle, _id}) {
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
      }).then(async () => {
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
    },
    // 修改文章相关tag
    async handlechangeTag({_id}) {
      const result = await getTagList()
      this.tagList = result.data.data
      // console.log(this.tagList)
      const { data } = await getArticleTagList(_id)
      this.choosedTagList = data.data.articleTagList
      this.choosedId = _id
      this.tagDialogVisible = true
    },
    showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.tagList.push({
            id: this.tagList.length,
            tagName: inputValue
          });
        }
        this.inputVisible = false;
        this.inputValue = '';
    },
    // 添加tag
    async handleInputConfirm() {
      let inputValue = this.inputValue;
      const flag = this.tagList.filter(item => item.tagName === inputValue)
      if (inputValue) {
        // 新增标签内容与以前的标签重复
      if(flag.length) {
        return this.$message.error('添加失败，该标签已存在');
      }
        const result = await addTag({tagName: inputValue})
        // console.log(result.data.data)
        this.tagList.push(result.data.data);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 删除tag
    deleteTag(item) {
      this.$confirm('是否删除该标签?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { data } = await deleteTag(item.tag)
          if(data.code) {
            this.tagList = this.tagList.filter(it => it.tag !== item.tag)
            this.choosedTagList = this.choosedTagList.filter(it => it.tagName !== item.tagName)
            this.$message.success(data.message);
          } else {
            this.$message.error('删除失败，请重试');
          }
        }).catch(() => {
          this.$message('已取消删除');          
        });
    },
    // 选择Tag
    choosedTag(tag) {
      if(this.choosedTagList.length >= 5) return this.$message.warning('最多选择五个标签')
      // 没有重复的Tag，返回Undefined
      const result = this.choosedTagList.find(item => item.tagName === tag.tagName)
      if(!result) {
        this.choosedTagList.push(tag)
      } else {
        this.$message.warning('该标签已选择，请勿重复选中');
      }
    },
    // 移除选中的Tag
    removeTag(tag) {
      this.choosedTagList = this.choosedTagList.filter(item => item.tagName != tag.tagName)
    },
    // 提交对文章相关标签的修改
    async submitTagList() {
      const { data } = await reviseArticleTagList({tagList: this.choosedTagList, id: this.choosedId})
      this.$message.success(data.message);
      this.choosedTagList = []
      this.choosedId = -1
      this.tagDialogVisible = false 
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
.dialog-tag {
    max-width: 760px;
    padding: 15px;
    margin-left: 5px;
    ::v-deep .el-tag {
      margin-right: 15px;
    }
  }
  .not-selected,
  .selected {
    border: 2px solid #ccc;
    min-height: 80px;
    padding: 10px;
    margin-top: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>