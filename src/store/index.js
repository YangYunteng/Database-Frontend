import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDetails: localStorage.getItem('userDetails') || null
  },
  mutations: {
    login(state, data){
      localStorage.setItem('userDetails', data.userDetails)
      state.userDetails = data.userDetails
    },
    logout(state) {
      // 移除token
      localStorage.removeItem('userDetails')
      state.userDetails = null
    }
  },
  actions: {
  }
})
