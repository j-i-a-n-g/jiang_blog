<template>
  <el-pagination
  :page-size="pageSize"
  :pager-count="pagerCount"
  :layout=layout
  :total="total"
  class="blog-pagination">
</el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pagerCount: {
      type: Number,
      default: 6
    },
    layout: {
      type: String,
      default: "total, prev, pager, next"
    }
  }
}
</script>

<style lang="scss" scoped>
 .blog-pagination {
  ::v-deep .el-pagination__total,
  ::v-deep .btn-prev,
  ::v-deep .number,
  ::v-deep .btn-next {
    background-color: transparent !important;
    color: #fff ;
  }
  ::v-deep .el-pager .active {
    text-shadow: 0 0 10px #fff;
    font-size: 16px;
  }
}
</style>