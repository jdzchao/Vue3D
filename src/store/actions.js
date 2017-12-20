export default {
  windowResize(context) {
    context.commit('setRatio');
    context.commit('setDirection');
    context.commit('setRem');
  },
}
