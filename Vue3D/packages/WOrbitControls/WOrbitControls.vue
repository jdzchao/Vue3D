<script>
    import THREE from './OrbitControls'
    // const THREE = require('three');
    // THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!./OrbitControls');
    import WMixin from '../_mixins/WMixin'

    export default {
        name: 'w-orbit-controls',
        mixins: [WMixin],
        props: {
            min: {type: Number, default: 10},
            max: {type: Number, default: 500},
            enable: {type: Boolean, default: true},
            enableKeys: {type: Boolean, default: false},
            autoRotate: {type: Boolean, default: false},
        },
        data() {
            return {
                control: null
            }
        },
        mounted() {
            this.control = new THREE.OrbitControls(this.root.camera, this.root.dom);
            this.control.addEventListener('change', this.root.render, false);
            this.control.type = 'orbit';
            this.control.minDistance = this.min;
            this.control.maxDistance = this.max;
            this.control.enabled = this.enable;
            this.control.enableKeys = this.enableKeys;
            this.control.autoRotate = this.autoRotate;
            this.root.rendererDelegationAdd(this.updateControls);
        },
        watch: {
            enable(val) {
                this.control.enabled = this.enable;
            },
            enableKeys(val) {
                this.control.enableKeys = this.enableKeys;
            },
            autoRotate(val) {
                this.control.autoRotate = this.autoRotate;
            }
        },
        methods: {
            updateControls() {
                this.control.update();
            },
        }
    }
</script>
