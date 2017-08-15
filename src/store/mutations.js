export default {
  LoadingNext(state) {
    let n = state.lifecycle.length;
    let i = state.lifecycle.indexOf(state.process);
    if (n > i) {
      console.info('Loaded : ' + state.process);
      i++;
      state.process = state.lifecycle[i];
    }
  },
  Reload(state) {
    state.process = state.lifecycle[0];
  }
}
