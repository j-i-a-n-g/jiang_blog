import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@css/reset.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('timer', (val) => {
  const addZero = function(value) {
    if(value < 10) return `0${value}`
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
