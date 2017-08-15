import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  lifecycle: ['awake', 'scene', 'group', 'canvas', 'mounted', 'update', 'destroy'],// 生命周期
  process: 'mounted',
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
