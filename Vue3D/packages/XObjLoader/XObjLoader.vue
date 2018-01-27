<script>
  const THREE = require('three');
  THREE.OBJLoader = require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!./OBJLoader');
  import XMixin from '../_mixins/XMixin'

  export default {
    name: 'x-obj-loader',
    mixins: [XMixin],
    props: {
      path: {type: String},
      name: {type: String, default: 'vue3d'},
      material: {type: Object},
    },
    data() {
      return {
        manager: new THREE.LoadingManager(),
        _material: {}
      }
    },
    mounted() {
      this.loadObj(this.path);
    },
    watch: {
      path(val) {
        this.loadObj(val);
      },
      object3d(val, oldVal) {
        this.setMaterial();
      },
      material(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          this.setMaterial(val);
        }
      },
      _material(val, oldVal) {
        if (oldVal !== val && oldVal !== null) {
          this.setMaterial(val);
        }
      },
    },
    methods: {
      loadObj(path) {
        if (!path) return;
        const objLoader = new THREE.OBJLoader(this.manager);
        objLoader.load(path, object => {
          object.name = this.name;
          this.object3d = object;
          this.loaded(object);
        }, xhr => {
          this.process(xhr);
        }, err => {
          this.error(err);
        });
      },
      setMaterial(mtl) {
        if (this.object3d && mtl) {
          this.object3d.traverse(function (child) {
            if (child.type === 'Mesh' && (child.parent === this.node || child.parent === this.object3d)) {
              child.material = mtl;
            }
          }.bind(this));
          this.root.render();
        }
      },
      loaded(object) {
        this.$emit('loaded', object);
      },
      process(xhr) {
        this.$emit('process', xhr);
      },
      error(err) {
        this.$emit('error', err);
      }
    }
  }
</script>
