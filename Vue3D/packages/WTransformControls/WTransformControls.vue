<script>
    import THREE from './TransformControls'
    // const THREE = require('three');
    // THREE.TransformControls = require('imports-loader?THREE=three!exports-loader?THREE.TransformControls!./TransformControls');
    import WMixin from '../../mixins/WMixin'

    export default {
        name: "w-transform-controls",
        mixins: [WMixin],
        props: {
            target: {type: Object},
            mode: {type: String, default: 'position'},
            space: {type: String, default: 'world'},
            size: {type: Number, default: 1},
        },
        data() {
            return {
                control: null,
            }
        },
        mounted() {
            this.control = new THREE.TransformControls(this.root.camera, this.root.dom);
            this.control.addEventListener('change', this.renderControl);
            this.root.scene.add(this.control);
        },
        watch: {
            target(val) {
                if (val) {
                    this.setAttach();
                } else {
                    this.control.detach();
                }
            },
            mode(val) {
                if (val === "translate") {
                    this.control.setMode('translate');
                } else if (val === "rotate") {
                    this.control.setMode('rotate');
                } else if (val === "scale") {
                    this.control.setMode('scale');
                }
            },
            space(val) {
                if (val === 'local') {
                    this.control.setSpace('local');
                } else {
                    this.control.setSpace('world');
                }
            },
            size(val) {
                this.control.setSize(val);
            }
        },
        methods: {
            setAttach() {
                try {
                    this.control.attach(this.target);
                } catch (err) {
                    console.error(err);
                }
            },
            renderControl() {
                this.control.update();
                this.render();
            }
        }
    }
</script>
