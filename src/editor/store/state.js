export default {
  /* 基础数据 */
  vWidth: 0, // viewport width
  vHeight: 0, // viewport height

  /* 场景数据是否加载完成 */
  loaded: false,

  /* 编辑器scene组件dom对象 */
  dom: {},

  /* 从接口读取的数据 */
  data: {
    info: {},

    /* 系统默认数据 */
    builtin: {
      objects: [],
      materials: []
    },

    /* 场景自定数据 */
    scene: { // 场景数据
      objects: [],
      materials: [] // 目前新建的材质文件不记录在该对象中
    },

    /* 用户自定义数据 */
    design: {
      uv: [],
      data: []
    }
  },

  /* 设置选项 */
  setting: {
    orbit: true, /* 摄像机随鼠标盘旋转动 */
    transform: 'translate'/* transform模式: translate || rotation || scale */
  },

  /* 场景中的三维对象 */
  object3d: {},

  /* 场景中的材质对象 */
  materials: {},

  /* 场景中的可定制UV */
  uv: {},

  /* 当前选中的目标对象 */
  selected: {
    obj: {},
    handler: '',
    name: '',
  },

  /* 加载进度计数器 */
  progress: {
    goal: 0, // 目标
    current: 0 // 当前进度
  }
}
