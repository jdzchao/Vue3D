import *as THREE from "three/src/Three"
import Plugin from "./_mixin_"

export default {
    name: "BoxHelper",
    mixins: [Plugin],
    props: {
        color: {type: String, default: 'rgb(255,255,0)'}
    },
    data() {
        return {
            target: null,
            box: null,
        }
    },
    created() {
        this.box = new THREE.Box3();
        this.plugin = new THREE.Box3Helper(this.box, this.color);
        this.vue3d.on("capture", this.setBox)
    },
    beforeMount() {
        if (this.plugin) this.vue3d_remove(this.plugin);
    },
    methods: {
        setBox(val) {
            if (val && val.hasOwnProperty('object')) {
                val = val.object;
                this.target = val;
                this.box.setFromObject(this.target);
                this.vue3d_add(this.plugin);
            } else {
                this.vue3d_remove(this.plugin);
            }
        },
    },
    watch: {
        "target.position": {
            deep: true,
            handler() {
                if (!this.target) return;
                this.box.setFromObject(this.target);
            }
        },
        "target.rotation": {
            deep: true,
            handler() {
                if (!this.target) return;
                this.box.setFromObject(this.target);
            }
        },
        "target.scale": {
            deep: true,
            handler() {
                if (!this.target) return;
                this.box.setFromObject(this.target);
            }
        }
    }
}
