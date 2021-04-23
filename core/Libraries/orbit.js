import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class Orbit {
    constructor(camera, canvas) {
        this.control = new OrbitControls(camera, canvas);
        camera.position.set(0, 0, 10);
        return this;
    }

    update() {
        this.control.update();
    }

    get enabled() {
        this.control.enabled = true;
    }

    set enabled(val) {
        this.control.enabled = val;
    }
}

export default Orbit
