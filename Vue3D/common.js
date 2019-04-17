class Scene {
    constructor() {
        this.type = "scene"
    }

}

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


export {
    Scene,
    Object3D,
    Light
}
