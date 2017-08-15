export default {
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
  // 加载下一个生命周期进程
  LoadingNext: (state) => {
    let n = state.lifecycle.length;
    let i = state.lifecycle.indexOf(state.process);
    if (n > i) {
      console.info('Loaded : ' + state.process);
      state.process = state.lifecycle[i + 1];
    }
  },
  // 加载指定进程
  LoadingProcess: (state, process) => {
    if (state.lifecycle.indexOf(process) > 0) {
      state.process = process;
    }
  },
  // 重新加载
  Reload: (state) => {
    // 0：awake 为启动时已执行，除非关闭或刷新，否则不进行重置
    state.process = state.lifecycle[1];
  }
}
