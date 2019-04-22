import *as THREE from "three"
import Plugin from "./index"

/**
 * 场景网格线
 */
export default {
    name: "GridHelper",
    mixins: [Plugin],
    props: {
        size: {type: Number, default: 1000},
        divisions: {type: Number, default: 10},
        colorCenterLine: {type: String, default: 'rgb(136,136,136)'},
        colorGrid: {type: String, default: 'rgb(68,68,68)'},
    },
    data() {
        return {
            grid: null
        }
    },
    created() {
        this.grid = new THREE.GridHelper(this.size, this.divisions, this.colorCenterLine, this.colorGrid);
        this.plugin = this.grid;
    }
}
