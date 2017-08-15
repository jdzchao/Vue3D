export default {
  LoadingNext(state) {
    let n = state.lifecycle.length;
    let i = state.lifecycle.indexOf(state.process);
    if (n > i) {
      i++;
      state.process = state.lifecycle[i];
      console.info('In Process:' + state.process);
    }
  },
  Reload(state) {
    state.process = state.lifecycle[0];
  }
}
