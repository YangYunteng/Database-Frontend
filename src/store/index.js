import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobNumber: localStorage.getItem('jobNumber') || null,
    name: localStorage.getItem("name") || null,
    telephone: localStorage.getItem("telephone") || null,
    type: localStorage.getItem("type") || null,
    wardNumber: localStorage.getItem("wardNumber") || null
  },
  mutations: {
    login(state, data) {
      localStorage.setItem('jobNumber', data.jobNumber);
      localStorage.setItem('name', data.name);
      localStorage.setItem('telephone', data.telephone);
      localStorage.setItem('type', data.type);
      localStorage.setItem('wardNumber', data.wardNumber);
      state.jobNumber = data.jobNumber;
      state.name = data.name;
      state.telephone = data.telephone;
      state.type = data.type;
      state.wardNumber = data.wardNumber;
    },
    logout(state) {
      localStorage.removeItem('jobNumber');
      localStorage.removeItem('name');
      localStorage.removeItem('telephone');
      localStorage.removeItem('type');
      localStorage.removeItem('wardNumber');
      state.jobNumber = null;
      state.name = null;
      state.telephone = null;
      state.type = null;
      state.wardNumber = null;
    }
  },
  actions: {}
})
