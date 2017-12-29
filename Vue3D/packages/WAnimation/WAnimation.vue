<template>
  <slot></slot>
</template>

<script>
  /** keyframe convention
   * type: Array,
   * array[0]:  array of keyframe times.
   * array[1]: values for the keyframes at the times specified.
   */
  import WMixin from '../_mixins/WMixin'
  const THREE = require('three');
  export default {
    name: "w-animation",
    mixins: [WMixin],
    data() {
      return {
        object3d: null,
        mixer: null,
        clipAction: null,
        clock: null,
        loop: null,
        handle: ["position", "scale"],
        positionKF: null,
        scaleKF: null
      }
    },
    props: {
      position: {
        type: Array,
      },
      scale: {
        type: Array,
      }
    },
    created() {
      this.setKF();
    },
    methods: {
      setKF() {
        this.handle.forEach(function (item) {
          if (this[item] && this[item].length === 2)
            this.switchKF(item, this[item]);
        }.bind(this))
      },
      switchKF(type, data) {
        switch (type) {
          case 'position': {
            this.positionKF = new THREE.VectorKeyframeTrack('.position', data[0], data[1]);
          }break;
          case 'scale': {
            this.scaleKF = new THREE.VectorKeyframeTrack('.scale', data[0], data[1]);
          }break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
