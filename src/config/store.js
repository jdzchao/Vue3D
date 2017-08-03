import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let myStore = new Vuex.Store({
  state: {
    isCanvasOpen: false,
    isPanelOpen: false,
    width: 0,
    height: 0,
  },
  mutations: {},
});
export default myStore;
