import BlogPagination from '@/components/basic/Blog-Pagination.vue'
import TopicTitle from '@/components/TopicTitle'
import MonacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

export default {
  install(Vue, options) {
    Vue.component('BlogPagination', BlogPagination)
    Vue.component('TopicTitle', TopicTitle)
    // Vue.component('MonacoEditor', {
    //   template: '<div class="editor"></div>',
    //   render(h) {
    //     return h('div', {
    //       class: 'editor'
    //     })
    //   },
    //   props: MonacoEditor   
    // });  
  }
}