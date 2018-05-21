<template>
  <div id="main-scene" v-loading="loading">
    <v-scene ref="preview" :width="width" :height="height">
      <w-ray-cast @cast="raycast" :far="2500"></w-ray-cast>
      <w-orbit-controls :enable="orbit" :max="2000"></w-orbit-controls>
      <w-transform-controls :size="0.1" :mode="transform" :target="selectedObj"></w-transform-controls>
      <w-grid-helper></w-grid-helper>
      <w-box-helper :target="selectedObj"></w-box-helper>
      <x-light :type="'Ambient'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      <x-camera :width="width" :height="height" :far="2500">
        <x-light :type="'Directional'" :intensity="0.5" :color="'rgb(255,255,255)'"></x-light>
      </x-camera>
      <template v-if="loaded" v-for="item in bObjects">
        <c-loader :obj="item" :cstm="false"></c-loader>
      </template>
      <template v-if="loaded" v-for="item in sObjects">
        <c-loader :obj="item" :cstm="true"></c-loader>
      </template>
    </v-scene>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import {VScene, XLight, XCamera, WOrbitControls, WTransformControls, WGridHelper, WBoxHelper, WRayCast, XBoxGeometry} from 'vue3d'
  import CLoader from '../module/CLoader'

  export default {
    name: "main-scene",
    components: {
      WBoxHelper,
      VScene,
      XLight,
      XCamera,
      WOrbitControls,
      WTransformControls,
      WGridHelper,
      WRayCast,
      XBoxGeometry,
      CLoader
    },
    props: {
      width: {type: Number, default: 500},
      height: {type: Number, default: 500}
    },
    data() {
      return {
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        axis: {x: 0, y: 0, z: 0},
        scale: {x: 1, y: 1, z: 1},
      }
    },
    mounted() {
      this.$store.state.tddz.dom = this.$refs.preview;
    },
    computed: {
      ...mapState({
        loaded: state => state.tddz.loaded,
        orbit: state => state.tddz.setting.orbit,
        transform: state => state.tddz.setting.transform,
        bObjects: state => state.tddz.data.builtin.objects,
        sObjects: state => state.tddz.data.scene.objects,
        selectedObj: state => state.tddz.selected.obj,
      }),
      ...mapGetters({
        loading: 'tddz/loading'
      })
    },
    watch: {
      selectedObj(val, oldVal) {
        if (val && val !== oldVal) {
          this.position = val.position;
          this.rotation = val.rotation;
          this.scale = val.scale;
        }
      },
      position: {
        deep: true,
        handler(val) {
          if (!this.selectedObj) return;
          this.render();
        }
      },
      rotation: {
        deep: true,
        handler(val) {
          if (!this.selectedObj) return;
          this.render();
        }
      },
      scale: {
        deep: true,
        handler(val) {
          if (!this.selectedObj) return;
          this.render();
        }
      },
    },
    methods: {
      raycast(targets) {
        this.$store.commit('tddz/raycast', targets);
      },
      render() {
        this.$store.commit('tddz/render');
      }
    }
  }
</script>

