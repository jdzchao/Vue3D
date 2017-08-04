<template>
  <div id="MScene">
    <div id="scene"></div>
    <div id="nav">
      <!--<div class="btn" @click="OpenCloud"><i class="iconfont icon-cloud"></i>{{$t('nav.cloud')}}</div>-->
      <div class="btn" @click="ToBuy"><i class="iconfont icon-buy"></i>{{$t('nav.buy')}}</div>
      <div class="canvas-switch" @click="OpenCanvas">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-doit"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MScene',
    data() {
      return {}
    },
    mounted() {
    },
    computed: {},
    methods: {
      OpenCanvas() {
        this.$store.state.isCanvasOpen = true;
      },
      OpenCloud() {
        this.$router.push({name: 'Cloud'});
        this.$store.state.isPanelOpen = true;
      },
      ToBuy() {
        this.$router.push({name: 'Buy'});
        this.$store.state.isPanelOpen = true;
      }
    }
  }
</script>
<style scoped>
  #scene {
    width: 100%;
    height: 94%;
  }

  #nav {
    width: 100%;
    height: 6%;
    background-color: #666666;
    position: relative;
  }

  #nav:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #979797;
    color: #979797;
    transform-origin: 0 0;
    transform: scaleY(.5)
  }

  #nav .btn {
    float: left;
    padding: 0 0.2rem;
    height: 1rem;
    line-height: 1rem;
    color: #ffffff;
    text-align: center;
    font-size: 0.4rem;
    border-right: 2px solid #ffffff;
    cursor: pointer;
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }

  #nav .btn i {
    font-size: 0.5rem;
    margin: 0 5px 0 0;
  }

  #nav .canvas-switch {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    border: 3px solid #666666;
    border-radius: 50%;
    text-align: center;
    line-height: 0.9rem;
    background-color: #ffffff;
    cursor: pointer;
  }

  #nav .canvas-switch .icon {
    width: 0.8rem;
    height: 0.8rem;
    vertical-align: -0.1rem;
    fill: currentColor;
    overflow: hidden;
  }
</style>
<style>
  #MScene {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
  }
</style>
