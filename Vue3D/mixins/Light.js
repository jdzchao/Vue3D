import Object3d from "./Object3d"

export default {
    name: "Light",
    mixins: [Object3d],
    props: {
        helper: {type: Boolean, default: false},
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
    },
    data() {
        return {
            _keyPoint: 'light',
            _helper: null,
            light: null,
        }
    },
    methods: {
        setHelper() {
            this.object3d = this.light;
            console.info("Undefined function 'setHelper' in Light Component")
        }
    },
    beforeMount() {
        if (this.helper) {
            this.setHelper();
        } else {
            this.object3d = this.light;
        }
    }
}
