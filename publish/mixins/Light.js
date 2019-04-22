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
            light: null,
            lightHelper: null,
        }
    },
    methods: {
        setHelper() {
            this.addObject3d(this.lightHelper, true);
            this.renderer.$on("update", this.lightHelper.update);
        }
    },
    beforeMount() {
        this.object3d = this.light;
        if (this.helper) {
            this.setHelper();
        }
    }
}
