/**
 * 配置文件
 */
const config = {
    // WebGLRenderer parameters
    renderer: {
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
    },

    // Base camera
    camera: {
        fov: 60,
        near: 0.1,
        far: 5000
    },

    /****************************************
     ** PLUGINS Setting
     ****************************************/
    capture: {
        enabled: true,
        near: 0,
        far: 5000
    },
}

export default {
    props: {
        config: {type: Object},  // Vue3d Configs Object
    },
    data() {
        return {
            conf: this.loadConf(this.config)
        }
    },
    methods: {
        loadConf(conf) {
            if (typeof conf !== 'object') {
                return config
            } else {
                return Object.assign({}, config, conf)
            }
        }
    }
}
