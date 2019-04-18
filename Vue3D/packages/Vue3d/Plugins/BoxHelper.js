import *as THREE from "three"
import Plugin from "./index"

export default {
    name: "V4hBox",
    mixins: [Plugin],
    props: {
        target: {type: Object},
        color: {type: String, default: 'rgb(255,255,0)'}
    },
    data() {
        return {
            box: new THREE.BoxHelper(),
            position: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 0, z: 0},
            scale: {x: 1, y: 1, z: 1},
        }
    },
    created() {
        this.plugin = this.box;
    },
    watch: {
        target(val) {
            if (val) {
                this.position = val.position;
                this.rotation = val.rotation;
                this.scale = val.scale;
                this.box.setFromObject(this.target);
                this.scene.add(this.box);
                this.update();
            } else {
                this.scene.remove(this.box);
            }
        },
        color(val) {
            if (val) {
                this.box.color = val;
            }
        },
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
