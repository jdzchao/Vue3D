import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default {
    data() {
        return {
            $_control: null,
        }
    },
    methods: {
        orbit_init() {
            this.$data.$_control = new OrbitControls(this.$data._$camera, this.$data._$canvas);
            // controls.update() must be called after any manual changes to the camera's transform
            this.$data._$camera.position.set(0, 0, 10); // 这一步不能少
            this.$data.$_control.addEventListener('change', this.render, false);
            this.$on("update", this.$data.$_control.update);
            this.$on('play', this.orbit_onPlay);
        },
        orbit_get() {
            return this.$data.$_control;
        },
        orbit_set(param, value) {
            if (!this.$data.$_control) return;
            this.$data.$_control[param] = value;
        },
        orbit_onPlay(play) {
            this.$data.$_control.enabled = !play;
        },
    }
}
