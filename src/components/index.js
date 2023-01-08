import BlogPagination from '@/components/basic/Blog-Pagination.vue'

export default {
  install(Vue, options) {
    Vue.component('BlogPagination', BlogPagination)
  }
}