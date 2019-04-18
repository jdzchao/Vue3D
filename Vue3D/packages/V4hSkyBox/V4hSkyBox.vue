<script>
    import * as THREE from 'three'
    import ObjectHelper from "../Vue3d/tools/Helper"

    /** Texture naming convention
     *       [3]py
     * [2]nx [5]pz [1]px [6]nz
     *       [4]ny
     */
    export default {
        name: "V4hSkyBox",
        mixins: [ObjectHelper],
        props: {
            path: {type: String},
            texture: {
                type: [Array, String],
                default() {
                    return ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']
                }
            }
        },
        mounted() {
            if (Array.isArray(this.texture) && this.texture.length === 6) {
                this.cubeTexture();
            } else if (typeof this.texture === "string") {
                // this.simpleTexture();
            }
        },
        methods: {
            cubeTexture() {
                let loader = new THREE.CubeTextureLoader();
                loader.crossOrigin = 'anonymous';
                loader.setPath(this.path);
                loader.load(this.texture, (texture) => {
                    this.root.scene.background = texture;
                    this.root.render();
                });
            },
            simpleTexture() {
                // let loader = new THREE.TextureLoader();
                // loader.crossOrigin = 'anonymous';
                // loader.setPath(this.path);
                // loader.load(this.texture, (texture) => {
                //     this.root.scene.background = texture;
                //     this.root.render();
                // });
            }
        }
    }
</script>
