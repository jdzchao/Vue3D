import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import Object3d_Loader from '../../../mixins/Object3d_Loader'

export default {
    name: "V3dLoaderObj",
    mixins: [Object3d_Loader],
    props: {
        material: {type: Object},
    },
    data() {
        return {
            object3d: null
        }
    },
    created() {
        this.loader = new OBJLoader(this.manager);
        this.loader.load(this.path, object => {
            object.name = this.name;
            this.object3d = object;
            console.log(object)
            this.init();
            this.setMaterial(this.material);
            this.loaded(object);
        }, xhr => {
            this.process(xhr);
        }, err => {
            this.error(err);
        });
    },
    watch: {
        material(val, oldVal) {
            if (val && oldVal !== val) {
                this.setMaterial(val);
            }
        }
    },
    methods: {
        setMaterial(mtl) {
            if (this.object3d && mtl) {
                this.object3d.traverse(function (child) {
                    if (child.type === 'Mesh' && (child.parent === this.node || child.parent === this.object3d)) {
                        child.material = mtl;
                    }
                }.bind(this));
                this.render();
            }
        },
    }

}
