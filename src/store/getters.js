export default {
  OnLoading: (state) => {
    let i = state.lifecycle.indexOf(state.process);
    let k = state.lifecycle.indexOf('mounted');
    return i < k;
  }
}
