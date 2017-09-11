export default {
  dom: null, // canvas dom
  renderer: null, // 渲染器
  scene: null, // 当前场景
  camera: null, // 主摄像机
  group: null, // 三维对象组
  target: null, // 当前选中的三维对象
  ray: null, // 射线
  tick: null, // 渲染辅助标记
  rendererDelegation: [], // 渲染过程委托
}
