<template>
  <div id="XNav">
    <!--<div class="btn" @click="OpenCloud"><i class="iconfont icon-cloud"></i>{{$t('nav.cloud')}}</div>-->
    <div class="btn" @click="ToBuy"><i class="iconfont icon-buy"></i>{{$t('nav.buy')}}</div>
    <div class="canvas-switch" @click="OpenCanvas">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-doit"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'XNav',
    data() {
      return {}
    },
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
  #XNav {
    width: 100%;
    height: 6%;
    background-color: #666666;
    position: absolute;
    bottom: 0;
  }

  #XNav:before {
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

  #XNav .btn {
    float: left;
    padding: 0 0.2rem;
    height: 1rem;
    line-height: 1rem;
    color: #ffffff;
    text-align: center;
    font-size: 0.4rem;
    cursor: pointer;
  }

  #XNav .btn i {
    font-size: 0.5rem;
    margin: 0 5px 0 0;
  }

  #XNav .canvas-switch {
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

  #XNav .canvas-switch .icon {
    width: 0.8rem;
    height: 0.8rem;
    vertical-align: -0.1rem;
    fill: currentColor;
    overflow: hidden;
  }
</style>
