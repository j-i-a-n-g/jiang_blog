<template>
  <el-pagination
  :page-size="pageSize"
  :pager-count="11"
  layout="total, prev, pager, next"
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