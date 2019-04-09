import Object3d from "./Object3d"

export default {
    name: "Camera",
    mixins: [Object3d],
    props: {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
    },
    data() {
        return {
            layers: 1,
            viewport: {x: this.x, y: this.y, w: this.width, h: this.height}
        }
    },
    methods: {},
    created() {
        console.log("camera")
    },
    mounted() {
        // console.log(this.object3d)
    },
    updated() {

    },
    destroyed() {

    }
}
