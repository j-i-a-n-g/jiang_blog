import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@css/reset.css'
import 'element-ui/lib/theme-chalk/display.css';
import MonacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
// 注册全局组件
import components from './components';

Vue.use(components)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('timer', (val) => {
  const addZero = function (value) {
    if (value < 10) return `0${value}`
    return value
  }
  const y = addZero(new Date(val).getFullYear())
  const m = addZero(new Date(val).getMonth() + 1)
  const d = addZero(new Date(val).getDate())
  const hh = addZero(new Date(val).getHours())
  const mm = addZero(new Date(val).getMinutes())
  const ss = addZero(new Date(val).getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.filter('timer2', (val) => {
  const addZero = function (value) {
    if (value < 10) return `0${value}`
    return value
  }
  const y = addZero(new Date(val).getFullYear())
  const m = addZero(new Date(val).getMonth() + 1)
  const d = addZero(new Date(val).getDate())
  return `${y}-${m}-${d}`
})
Vue.prototype.$message = function (msg) {
  return Message({
    message: msg,
    duration: 1500,
    showClose: true,
    offset: 40
  })
}
// 分别对success、warning和error等样式进行设置
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 1500,
    showClose: true,
    offset: 40

  })
}
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 1500,
    showClose: true,
    offset: 40
  })
}
Vue.prototype.$message.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 1000,
    showClose: true,
    offset: 40
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
