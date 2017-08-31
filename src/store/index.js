import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './vue3d/state'
import mutations from './vue3d/mutations'
import actions from './vue3d/actions'
import getters from './vue3d/getters'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
