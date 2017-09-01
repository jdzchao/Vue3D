export default {
  MobileResize(state) {
    state.rem = document.body.clientHeight * 0.06;
    document.documentElement.style.fontSize = state.rem + "px";
    state.width = document.body.clientWidth;
    state.height = document.body.clientHeight;
  },
  // 更新三维场景时执行的方法委托
  UpdateSceneDelegation(state, func) {
    if (typeof func === 'function') {
      state.updateSceneDelegation.push(func);
    } else {
      console.debug('Error Delegation Function');
    }
  },
  // 更新三维场景
  UpdateScene: (state) => {
    state.updateSceneDelegation.forEach((func) => {
      func();
    });
  },
}
