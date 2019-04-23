import * as THREE from "three"
import {PMREMGenerator} from 'three/examples/jsm/pmrem/PMREMGenerator'
export default {
    name: "Scene_SkyBox",
    props: {
        skybox: {
            type: Object
        }
    },
    data() {
        return {
            background: null,
            envMap: null
        }
    },
    methods: {
        hdrCubeMap() {
            // let loader = new THREE.HDRCubeTextureLoader();
            // loader.crossOrigin = 'anonymous';
            // loader.setPath(this.path);
            // loader.load(this.texture, (texture) => {
            //     this.root.scene.background = texture;
            //     this.root.render();
            // });
        },
        ldrCubeMap() {

        },
        cubeTexture() {
            let loader = new THREE.CubeTextureLoader();
            loader.crossOrigin = 'anonymous';
            loader.setPath(this.skybox.path);
            loader.load(this.skybox.texture, (texture) => {
                // this.background = texture;
                loader.encoding = THREE.GammaEncoding;
                let pmremGenerator = new PMREMGenerator( loader );
                pmremGenerator.update( renderer );
                var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
                pmremCubeUVPacker.update( renderer );
                ldrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
                pmremGenerator.dispose();
                pmremCubeUVPacker.dispose();
            });
        },
    },
    mounted() {
        this.$nextTick(function () {
            if (!this.skybox || !this.skybox.texture) return;
            if (!this.skybox.path) {
                this.skybox.path = '/public/skybox/';
            }
            console.log(this.skybox.path)
        })

    }
}
