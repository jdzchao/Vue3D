export default {
  Success: (state) => {
    let i = state.steps.indexOf(state.step);
    let k = state.steps.indexOf('update');
    return i >= k;
  }
}
