/**
 * Vue3d 推荐配置
 */
export default {
    // Debug mode
    debug: true,

    // WebGLRenderer parameters
    renderer: {
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
    },

    capture: true,
    orbit: true,
    scenes: true,

    /****************************************
     ** PLUGINS Setting
     ****************************************/
    // plugin : box helper
    box: {
        color: 'rgb(255,255,0)'
    },
    // plugin : grid helper
    grid: {
        size: 100,
        divisions: 10,
        colorCenterLine: 'rgb(136,136,136)',
        colorGrid: 'rgb(68,68,68)',
    },

}
