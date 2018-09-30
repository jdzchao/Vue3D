<template>
  <x-obj-loader :name="name" :path="path" @loaded="loaded" :material="material">
    <c-material :name="mtl" :canvas_color="true" :customizable="customizable" @loaded="setMaterial"></c-material>
    <template v-for="item in objects">
      <slot v-if="slot">
        <c-loader :obj="item" :parent="id"></c-loader>
      </slot>
    </template>
  </x-obj-loader>
</template>

<script>
  import API from '../config/api'

  import {mapState} from 'vuex'
  import {XObjLoader} from 'vue3d'
  import CLoader from './CLoader'
  import CMaterial from './CMaterial'

  export default {
    name: "c-loader",
    components: {XObjLoader, CLoader, CMaterial},
    props: {
      obj: {type: Object},
      parent: {type: String},
      cstm: {type: Boolean}
    },
    data() {
      return {
        id: null,
        name: null,
        hash: null,
        slot: false,
        objects: [], // 子节点对象
        object: {}, // 当前节点对象
        material: null, // 材质
        mtl: '',
        customizable: Number(this.obj.customizable),
      }
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.clean();
    },
    computed: {
      ...mapState({
        object3d: state => state.tddz.object3d,
        materials: state => state.tddz.materials,
      }),
      path() {
        if (!this.hash) return;
        return S3.modelPath(this.hash + '.obj');
      }
    },
    watch: {
      obj: {
        deep: true,
        handler(val, oldVal) {
          if (val.id === oldVal.id && val.hash === oldVal.hash) {
            this.objects = val.objects;
            this.mtl = val.material;// 修改选中obj上的material属性的时候可以同步更新预览
          } else {
            this.reload();
          }
        }
      }
    },
    methods: {
      // 初始化
      init() {
        if (!this.obj) return;
        this.slot = false;
        this.id = empty(this.obj.id) ? guid() : this.obj.id;
        this.name = this.obj.name;
        this.hash = this.obj.mesh_hash;
        this.objects = this.obj.objects;
        this.$store.commit('tddz/mountObject', {uuid: this.id, obj: this.obj});
        this.mtl = this.obj.material ? this.obj.material : '';
      },
      // 清理不用的对象
      clean() {
        this.$store.commit('tddz/removeObject', this.id);
      },
      // 重新加载
      reload() {
        this.clean();
        this.init();
      },
      // 模型装载完成后回调
      loaded(object) {
        this.object = object;
        object.handler = this.id;
        object.hash = this.hash;
        object.cstm = this.cstm;
        this.setObject();
        this.slot = true;
      },
      // 初始化当前object3d数据
      setObject() {
        if (!this.object3d.hasOwnProperty(this.id)) return;
        this.setPosition();
        this.setRotation();
        this.setScale();
      },
      setPosition() {
        if (!this.object3d[this.id].hasOwnProperty('position')) return;
        if (typeof this.object3d[this.id].position === 'string') {
          try {
            this.object3d[this.id].position = JSON.parse(this.obj.position);
          } catch (err) {
            console.debug(err);
          }
        }
        this.object.position.x = this.object3d[this.id].position.x;
        this.object.position.y = this.object3d[this.id].position.y;
        this.object.position.z = this.object3d[this.id].position.z;
      },
      setRotation() {
        if (!this.object3d[this.id].hasOwnProperty('rotation')) return;
        if (typeof this.object3d[this.id].rotation === 'string') {
          try {
            this.object3d[this.id].rotation = JSON.parse(this.obj.rotation);
          } catch (err) {
            console.debug(err);
          }
        }
        this.object.rotation.x = this.object3d[this.id].rotation.x;
        this.object.rotation.y = this.object3d[this.id].rotation.y;
        this.object.rotation.z = this.object3d[this.id].rotation.z;
      },
      setScale() {
        if (!this.object3d[this.id].hasOwnProperty('scale')) return;
        if (typeof this.object3d[this.id].scale === 'string') {
          try {
            this.object3d[this.id].scale = JSON.parse(this.obj.scale);
          } catch (err) {
            console.debug(err);
          }
        }
        this.object.scale.set(this.object3d[this.id].scale.x, this.object3d[this.id].scale.y, this.object3d[this.id].scale.z);
      },
      setMaterial(material) {
        this.material = material;
        this.$store.state.tddz.progress.current++;
        this.$store.commit('tddz/render');
      }
    }
  }
</script>
