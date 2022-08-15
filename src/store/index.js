import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      password: "",
      userAvatar: "",
      userDate: "",
      username: "",
      _id: null,
    }
  },
  getters: {
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, val) {
      state.userInfo = val
    },
    // 删除用户信息
    deleteUserInfo(state) {
      state.userInfo = {
        password: "",
        userAvatar: "",
        userDate: "",
        username: "",
        _id: null,
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
