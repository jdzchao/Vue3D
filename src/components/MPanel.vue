<template>
  <transition name="panel" enterActiveClass="animated zoomIn" leaveActiveClass="animated zoomOut">
    <div id="MPanel" v-show="this.$store.state.isPanelOpen">
      <div id="panel">
        <div id="close" @click="ClosePanel"><i>x</i></div>
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'MPanel',
    data() {
      return {}
    },
    methods: {
      ClosePanel() {
        this.$store.state.isPanelOpen = false;
        this.$router.push({name: 'Home'});
      }
    }
  }
</script>
<style scoped>
  #close {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-bottom: 1rem solid red;
    border-left: 1rem solid transparent;
  }

  #close i {
    position: absolute;
    bottom: -1rem;
    left: -0.5rem;
    line-height: 0.6rem;
    font-size: 0.5rem;
    color: #ffffff;
  }

  #panel {
    width: 90%;
    height: 90%;
    position: absolute;
    top: 2%;
    right: 0;
    bottom: 0;
    left: 5%;
    border: 2px solid #d6d6d6;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
  }
</style>
<style>
  #MPanel {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 30;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
