<template>
  <div class="link-base">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="博客名" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.blogName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="博客地址" width="240">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.blogOrigin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="博客logo地址" width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.blogLogo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="博客简述" width="260">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.blogMessage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更改推荐状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.blogHotLink }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">是否推荐</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLinkList, changeHotLink, deleteLink } from '@/assets/api/index'
export default {
  name: "LinkBase",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getAllLinks()
  },
  methods: {
    async handleEdit(row) {
      row.blogHotLink = !row.blogHotLink
      const result = await changeHotLink({
        _id: row._id,
        blogHotLink: row.blogHotLink
        // 到这里了
      })
      console.log(result);
    },
    // 删除友链
    async handleDelete(row) {
      console.log(row);
      const {data}  = await deleteLink({
        params: {
          id: row._id
        }
      })
      if(!data.code) {
       return this.$message.warning(data.message)
      } 
      this.$message.success(data.message)
      this.tableData = this.tableData.filter(item => {
        return item._id !== row._id
      })
    },
    // 获取友链数据
    async getAllLinks() {
      const {data} = await getLinkList()
      this.tableData.push(...data.data)
      console.log(this.tableData);
    }
  },
};
</script>

<style>
</style>