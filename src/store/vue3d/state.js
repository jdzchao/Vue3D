export default {
  // UI相关
  rem: 0,
  width: 0,
  height: 0,
  isCanvasOpen: false,
  isPanelOpen: false,
  // 生命周期及加载控制
  lifecycle: ['awake', 'render', 'scene', 'canvas', 'mounted', 'update', 'destroy'],// 生命周期
  process: 'mounted',
  // 三维场景相关
  scene: {},
  canvas: {},
  updateSceneDelegation: []
}
