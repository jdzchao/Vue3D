import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return state
  },
  mutations,
  actions,
  getters
};
