import *as THREE from "three"
import Plugin from "./index"

export default {
    name: "V4hBox",
    mixins: [Plugin],
    props: {
        color: {type: String, default: 'rgb(255,255,0)'}
    },
    data() {
        return {
            target: null,
            box: new THREE.BoxHelper(),
            position: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0},
            scale: {x: 1, y: 1, z: 1},
        }
    },
    created() {
        this.box.color = this.color;
        this.plugin = this.box;
        this.renderer.on("pick", this.pickTarget)
    },
    methods: {
        pickTarget(val) {
            if (val) {
                this.target = val;
                this.position = val.position;
                this.rotation = val.rotation;
                this.scale = val.scale;
                this.box.setFromObject(this.target);
                this.scene.add(this.box);
                this.box.update();
            } else {
                this.scene.remove(this.box);
            }
        },
    },
    watch: {
        // target(val){
        //     if (val) {
        //         this.position = val.position;
        //         this.rotation = val.rotation;
        //         this.scale = val.scale;
        //         this.box.setFromObject(this.target);
        //         this.scene.add(this.box);
        //         this.box.update();
        //     } else {
        //         this.scene.remove(this.box);
        //     }
        // },
        position: {
            deep: true,
            handler() {
                if (!this.target) return;
                this.box.update();
            }
        },
        rotation: {
            deep: true,
            handler() {
                if (!this.target) return;
                this.box.update();
            }
        },
        scale: {
            deep: true,
            handler() {
                if (!this.target) return;
                this.box.update();
            }
        },
    }
}
