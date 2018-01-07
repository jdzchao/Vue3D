<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import WMixin from '../_mixins/WMixin'

  const THREE = require('three');
  export default {
    name: "w-animation",
    mixins: [WMixin],
    data() {
      return {
        objPosition: null,
        mixer: null,
        clipAction: null,
        clock: new THREE.Clock(),
        loop: null,
        handle: ["Position", "Scale"],
        positionKF: null,
        scaleKF: null
      }
    },
    props: {
      object: {
        type: Object,
      },
      repeat: {
        type: Number,
        default: 1
      },
      timeScale: {
        type: Number,
        default: 1
      },
      toPosition: {
        type: Array,
      },
      toScale: {
        type: Array,
      },
    },
    created() {
      this.root.rendererDelegationAdd(() => {
        if(!this.mixer)
          return;
        let delta = this.clock.getDelta();
        this.mixer.update(delta);
      });
    },
    watch: {
      object(val) {
        if(val)
          this.animation();
      },
    },
    methods: {
      animation() {
        this.setKF();
        this.setMixerClip();
        this.addEvent();
        this.clipAction.play();
      },
      setKF() {
        this.handle.forEach(function (item) {
          if (this["to" + item])
            this.switchKF(item, this["to" + item]);
        }.bind(this))
      },
      switchKF(type, data) {
        let arr1 = [], arr2;
        for (let i = 0; i <= data.length / 3; i++)
          arr1.push(i);
        switch (type) {
          case 'Position': {
            arr2 = [this.object.position.x, this.object.position.y, this.object.position.z];
            for (let i = 0; i < data.length; i++)
              arr2.push(data[i]);
            this.positionKF = new THREE.VectorKeyframeTrack('.position', arr1, arr2);
          }break;
          case 'Scale': {
            arr2 = [this.object.scale.x, this.object.scale.y, this.object.scale.z];
            for (let i = 0; i < data.length; i++)
              arr2.push(data[i]);
            this.scaleKF = new THREE.VectorKeyframeTrack('.scale', arr1, arr2);
          }break;
        }
      },
      setMixerClip() {
        let arr = [];
        this.handle.forEach(function (item) {
          if (this["to" + item])
            arr.push(this[item.toLowerCase() + "KF"]);
        }.bind(this));
        let clip = new THREE.AnimationClip('Action', -1, arr);
        this.mixer = new THREE.AnimationMixer(this.object);
        this.clipAction = this.mixer.clipAction(clip);
        this.loadConfig();
      },
      loadConfig() {
        this.clipAction.clampWhenFinished = true;
        this.clipAction.timeScale = this.timeScale;
        if (this.repeat === -1)
          this.clipAction.setLoop(THREE.LoopOnce);
        else
          this.clipAction.repetitions = this.repeat - 1;
      },
      addEvent() {
        this.mixer.addEventListener("loop", () => {
          this.$emit("loop");
        });
        this.mixer.addEventListener("finished", () => {
          this.$emit("finished");
        })
      }
    }
  }
</script>

<style scoped>

</style>
