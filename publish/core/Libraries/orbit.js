import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class Orbit {

    constructor(camera, canvas) {
        this.enabled = true;
        this.control = new OrbitControls(camera, canvas);
        camera.position.set(0, 0, 10); // 这一步不可少

        return this;
        // this.control.addEventListener('change', this.render, false);
        // this.$on("update", this.$data.$_control.update);
        // this.$on('play', this.orbit_onPlay);
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
