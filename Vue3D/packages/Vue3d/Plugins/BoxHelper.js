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
            box: new THREE.Box3(),
            position: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0},
            scale: {x: 1, y: 1, z: 1},
        }
    },
    created() {
        this.box.color = this.color;
        this.plugin = new THREE.Box3Helper(this.box, this.color);
        this.renderer.on("capture", this.pickTarget)
    },
    methods: {
        pickTarget(val) {
            if (val && val.hasOwnProperty('object')) {
                val = val.object;
                this.target = val;
                this.position = val.position;
                this.rotation = val.rotation;
                this.scale = val.scale;
                this.box.setFromObject(this.target);
                this.V$scene.add(this.plugin);
                this.renderer.render();
            } else {
                this.V$scene.remove(this.plugin);
                this.renderer.render();
            }
        },
        setActive() {
            return;
        },
    },
    watch: {
        position: {
            deep: true,
            handler() {
                if (!this.target) return;
            }
        },
        rotation: {
            deep: true,
            handler() {
                if (!this.target) return;
            }
        },
        scale: {
            deep: true,
            handler() {
                if (!this.target) return;
            }
        },
    }
}
