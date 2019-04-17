class Object3D {
    constructor() {
        this.type = "object3d"
    }
}

class Light extends Object3D {
    constructor() {
        super()
        this.type = "light"
    }
}

import Bus from './renderer'

export {
    Bus as Vue3d,
    Object3D,
    Light
}
