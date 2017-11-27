const version = "1.0";

class Vue3d {
  constructor () {
    this.version = version;
    this.size = 100;
    this.dom = null; // webGL canvas dom
    this.renderer = null; // 渲染器
    this.scene = null; // 当前场景
    this.camera = null; // 主摄像机
    this.group = null; // 三维对象组
    this.target = null; // 当前选中的三维对象
    this.ray = null; // 射线
    this.tick = null; // 渲染辅助标记
    this.rendererDelegation = []; // 渲染过程委托
  }

  rendererDelegationReg (func) {
    if (typeof func === 'function') {
      this.rendererDelegation.push(func);
    } else {
      console.debug('Error Delegation Function');
    }
  };

  render () {
    if (this.rendererDelegation.length < 1) return;
    if (this.tick) return;
    this.tick = requestAnimationFrame(() => {
      this.tick = null;
      this.rendererDelegation.forEach((func) => {
        func();
      });
      this.renderer.render(this.scene, this.camera);
    })
  };

  // resetCamera () {
  //   if (typeof this.resetCamera === 'function') {
  //     this.resetCamera();
  //   }
  // }
}

export default new Vue3d;
