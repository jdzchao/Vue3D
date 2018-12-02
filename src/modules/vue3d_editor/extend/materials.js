import * as THREE from 'three'
// import {fabric} from 'fabric'

const preset = {
    name: '',
    flat_shading: false,
    shininess: 30,
    specular: null,
    color: null,
    transparent: false,
    opacity: 1,
    map_color: null,
    map_normal: null,
    map_specular: null
};

export function phong(opt) {
    // let opt = Object.assign({}, preset, params);
    let phong = new THREE.MeshPhongMaterial({});
    phong.flatShading = Number(opt.flat_shading) > 0;
    if (opt.shininess) {
        phong.shininess = Number(opt.shininess) || 30;
    }
    if (opt.specular) {
        phong.specular = new THREE.Color(opt.specular);
    }
    if (opt.color) {
        phong.color = new THREE.Color(opt.color);
    }
    phong.transparent = Number(opt.transparent) > 0;
    phong.opacity = Number(opt.opacity) || 1;
    phong.needsUpdate = true;
    return phong;
}
