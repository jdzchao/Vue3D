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
    },
    mounted() {
    },
    updated() {
    },
    computed: {
      ...mapState({
        scene: state => state.vue3d.scene,
        camera: state => state.vue3d.camera
      })
    },
    methods: {
      render() {
        this.$store.commit('vue3d/render');
      }
    }
  }
</script>
<style scoped>

</style>
