export default {
  rendererDelegation(state, func) {
    if (typeof func === 'function') {
      state.rendererDelegation.push(func);
    } else {
      console.debug('Error Delegation Function');
    }
  },
  render(state) { // 渲染一帧
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
  resetCamera(state) {
    if (typeof state.resetCamera === 'function') {
      state.resetCamera();
    }
  }
}
