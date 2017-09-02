<template>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        ready: false,
      }
    },
    created() {
      console.debug('VC:created')
    },
    mounted() {
    },
    updated() {
      console.debug('VC:update');
    },
    computed: {
      ...mapState({
        scene: state => state.three.scene,
      })
    },
    methods: {
      render() {
        this.$store.commit('three/render');
      }
    }
  }
</script>
<style scoped>

</style>
