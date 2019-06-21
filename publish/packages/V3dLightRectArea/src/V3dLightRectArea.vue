<template>
    <object :name="$options.name" style="display:none;">
        <slot v-if="slot"></slot>
    </object>
</template>

<script>
    import * as THREE from "three"
    import rectAreaLightUniforms from "./RectAreaLightUniformsLib"
    import Object3d_Light from "../../../mixins/Object3d_Light"

    export default {
        name: "V3dLightRectArea",
        mixins: [Object3d_Light],
        props: {
            width: {type: Number, default: 10},
            height: {type: Number, default: 10},
        },
        methods: {
            setHelper() {
                this.light.add(this.lightHelper);
            }
        },
        created() {
            rectAreaLightUniforms(THREE);
            this.light = new THREE.RectAreaLight(this.color, this.intensity, this.width, this.height);
            if (this.helper) {
                this.lightHelper = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial({side: THREE.BackSide}));
                this.lightHelper.scale.x = this.light.width;
                this.lightHelper.scale.y = this.light.height;
                this.light.add(this.lightHelper);

                // let rectLightMeshBack = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial({color: 0x080808}));
                // this.lightHelper.add(rectLightMeshBack);
            }
        }
    }
</script>
