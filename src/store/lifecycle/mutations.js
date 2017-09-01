export default {
  NextStep: (state) => {
    let n = state.steps.length;
    let i = state.steps.indexOf(state.step);
    if (n > i) {
      console.info('LifeCycle : ' + state.step);
      state.step = state.steps[i + 1];
    }
  },
}
