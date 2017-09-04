import Vue from 'vue';
import Vuex from 'vuex';
// self
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
// modules
import three from './three/'

Vue.use(Vuex);

let store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    three
  }
});
console.log(store);
export default store;
