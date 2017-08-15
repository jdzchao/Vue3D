export default {
  LoadingProcess: (state) => {
    let n = state.lifecycle.length;
    let i = state.lifecycle.indexOf(state.process);
    let k = state.lifecycle.indexOf('mounted');
    if (n > i) {
      i++;
    }
    return i <= k;
  }
}
