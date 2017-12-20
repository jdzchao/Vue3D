import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// self
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
// modules


let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // modules: {
  // }
});

export default store;
