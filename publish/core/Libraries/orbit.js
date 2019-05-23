import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class Orbit {

    constructor(camera, canvas) {
        this.enabled = true;
        this.control = new OrbitControls(camera, canvas);
        camera.position.set(0, 0, 10);
        return this;
    }

    update() {
        this.control.update();
    }

    enable() {
        this.control.enabled = true;
    }

    disable() {
        this.control.enabled = false;
    }
}

export default Orbit
