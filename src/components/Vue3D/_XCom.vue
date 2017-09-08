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
        scene: state => state.vue3d.scene,
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
