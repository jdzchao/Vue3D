import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  lifecycle: ['start', 'scene', 'group', 'canvas', 'mounted', 'destroy'],// 生命周期
  process: 'canvas',
  isCanvasOpen: false,
  isPanelOpen: false,
  width: 0,
  height: 0,
  contentHeight: 0,
  navHeight: 0,
  scene: {}
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
