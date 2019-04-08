<script>
    const THREE = require('three');
    import WMixin from '../../mixins/WMixin'

    /** Texture naming convention
     *       [3]py
     * [2]nx [5]pz [1]px [6]nz
     *       [4]ny
     */
    export default {
        name: "w-sky-box",
        mixins: [WMixin],
        props: {
            path: {type: String},
            texture: {
                type: Array,
                default() {
                    return ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
                }
            }
        },
        mounted() {
            this.paintSky();
        },
        methods: {
            paintSky() {
                if (!this.texture && this.texture.length !== 6) return;
                let loader = new THREE.CubeTextureLoader();
                loader.crossOrigin = 'anonymous';
                loader.setPath(this.path);
                loader.load(this.texture, function (texture) {
                    this.root.scene.background = texture;
                    this.render();
                }.bind(this));
            }
        }
    }
</script>

<style scoped>

</style>
