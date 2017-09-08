export default {
  rendererDelegation(state, func) {
    if (typeof func === 'function') {
      state.rendererDelegation.push(func);
    } else {
      console.debug('Error Delegation Function');
    }
  },
  // 渲染一帧
  render(state) {
    if (state.rendererDelegation.length < 1) return;
    if (state.tick) return;
    state.tick = requestAnimationFrame(() => {
      state.tick = null;
      state.rendererDelegation.forEach((func) => {
        func();
      });
      state.renderer.render(state.scene, state.camera);
    })
  },
}
