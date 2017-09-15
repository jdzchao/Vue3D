import Vue from 'vue';
import Vuex from 'vuex';
// self
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
// modules
import vue3d from './Vue3D/'

Vue.use(Vuex);

let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    vue3d
  }
});

export default store;
