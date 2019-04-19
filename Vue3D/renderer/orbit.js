import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default {
    data() {
        return {
            _$control: null,
        }
    },
    methods: {
        orbit_init() {
            this.$data._$control = new OrbitControls(this.$data._$camera, this.$data._$canvas);
            // controls.update() must be called after any manual changes to the camera's transform
            this.$data._$camera.position.set(0, 0, 10); // 这一步不能少
            this.$data._$control.addEventListener('change', this.render, false);
            this.$on("update", this.$data._$control.update);
            this.$on('play', this.orbit_onPlay);
        },
        orbit_get() {
            return this.$data._$control;
        },
        orbit_set(param, value) {
            if (!this.$data._$control) return;
            this.$data._$control[param] = value;
        },
        orbit_onPlay(play) {
            this.$data._$control.enabled = !play;
        },
    }
}
