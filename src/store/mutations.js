export default {
  MobileResize(state) {
    state.width = document.body.clientWidth;
    state.height = document.body.clientHeight;
    state.rem = document.body.clientHeight * state.ratio;
    document.documentElement.style.fontSize = state.rem + "px";
  },
  RendererDelegation(state, func) {
    if (typeof func === 'function') {
      state.rendererDelegation.push(func);
    } else {
      console.debug('Error Delegation Function');
    }
  },
  Render(state) {
    console.log(state.rendererDelegation);
    if (state.rendererDelegation.length < 1) return;
    state.rendererDelegation.forEach((func) => {
      func();
    });
  },
}
