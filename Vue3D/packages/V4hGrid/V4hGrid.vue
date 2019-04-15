<script>
    import *as THREE from "three"
    import ObjectHelper from "../../mixins/Helper"

    export default {
        name: "V4hGrid",
        mixins: [ObjectHelper],
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
        mounted() {
            this.grid = new THREE.GridHelper(this.size, this.divisions, this.colorCenterLine, this.colorGrid);
            this.scene.add(this.grid);
        }
    }
</script>

