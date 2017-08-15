<template>
  <div id="XTools">
    <div id="decal" class="tab" @click="OpenDecal">
      <i class="iconfont icon-decal"></i>
    </div>
    <div id="text" class="tab" @click="OpenText">
      <i class="iconfont icon-text"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'XTools',
    data() {
      return {}
    },
    methods: {
      OpenDecal() {
        this.$router.push({name: 'Decal'});
        this.$store.state.isPanelOpen = true;
      },
      OpenText() {
        this.$router.push({name: 'Text'});
        this.$store.state.isPanelOpen = true;
      },
    }
  }
</script>
<style scoped>
  #XTools {
    width: 100%;
    height: 1rem;
    position: relative;
    z-index: -1;
    bottom: 0;
  }

  #XTools:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 2px solid #666666;
    color: #979797;
    transform-origin: 0 0;
    transform: scaleY(1)
  }

  #XTools .tab {
    width: 1rem;
    height: 1rem;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    background-color: #fdfdfd;
    border: 2px solid #666666;
    border-bottom: 0;
    float: left;
    text-align: center;
    line-height: 0.9rem;
    cursor: pointer;
  }

  #XTools .tab i {
    font-size: 0.8rem;
    color: #666666
  }

</style>
