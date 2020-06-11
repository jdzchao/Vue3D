import * as THREE from "three"
import {PMREMGenerator} from 'three/examples/jsm/pmrem/PMREMGenerator'
import {PMREMCubeUVPacker} from 'three/examples/jsm/pmrem/PMREMCubeUVPacker'
import Bus from '../bus'

export default {
    name: "Scene_SkyBox",
    props: {
        /**
         * skybox
         * @key:path String
         * @key:texture Array
         * Texture naming convention
         *            [3]py
         *      [2]nx [5]pz [1]px [6]nz
         *            [4]ny
         */
        skybox: {
            type: Object, default() {
                return {
                    path: '',
                    texture: []
                }
            }
        }
    },
    data() {
        return {
            background: null,
            envMap: null
        }
    },
    methods: {
        ldrCubeMap() {
            let loader = new THREE.CubeTextureLoader();
            loader.crossOrigin = 'anonymous';
            loader.setPath(this.skybox.path);
            loader.load(this.skybox.texture, (texture) => {
                loader.encoding = THREE.GammaEncoding;
                let pmremGenerator = new PMREMGenerator(loader);
                console.log(this.renderer.getRenderer())
                // pmremGenerator.update(this.renderer.getRenderer());
                let pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
                // pmremCubeUVPacker.update(this.renderer.getRenderer());

                // texture.minFilter = THREE.NearestFilter;
                this.background = texture;
                this.envMap = pmremCubeUVPacker.CubeUVRenderTarget;
                pmremGenerator.dispose();
                pmremCubeUVPacker.dispose();
            }, null, err => {
                Bus.error(err)
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.skybox || !this.skybox.path) return;
            if (!Array.isArray(this.skybox.texture) || this.skybox.texture.length !== 6) {
                this.skybox.texture = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];
            }
            this.ldrCubeMap();
        })

    }
}
