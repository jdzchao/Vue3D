<template>
  <div id="MCanvas">
    <div id="tools">
      <div id="decal" class="tab" @click="OpenDecal">
        <i class="iconfont icon-decal"></i>
      </div>
      <div id="text" class="tab" @click="OpenText">
        <i class="iconfont icon-text"></i>
      </div>
    </div>
    <div id="canvas"></div>
    <div id="nav">
      <template v-for="item in 4">
        <div class="btn" @click="Target(item)">区域{{item}}</div>
      </template>
      <div class="canvas-switch" @click="CloseCanvas">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-done"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MCanvas',
    data() {
      return {}
    },
    methods: {
      CloseCanvas() {
        this.$store.state.isCanvasOpen = false;
      },
      OpenDecal() {
        this.$router.push({name: 'Decal'});
        this.$store.state.isPanelOpen = true;
      },
      OpenText() {
        this.$router.push({name: 'Text'});
        this.$store.state.isPanelOpen = true;
      },
      Target(area) {
        console.log(area);
      }
    }
  }
</script>
<style scoped>
  #tools {
    width: 100%;
    height: 1rem;
    position: relative;
    z-index: -1;
    bottom: 0;
  }

  #tools:after {
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

  #tools .tab {
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

  #tools .tab i {
    font-size: 0.8rem;
    color: #666666
  }

  #canvas {
    width: 100%;
    min-height: 50px;
    max-height: 100%;
    background: url("../../static/images/bg_canvas.jpg");
  }

  #nav {
    width: 100%;
    height: 1rem;
    background-color: #666666;
    position: relative;
    bottom: 0;
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
    min-width: 1.5rem;
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
    fill: #ffffff;
    overflow: hidden;
  }
</style>
<style>
  #MCanvas {
    width: 100%;
    position: absolute;
    z-index: 20;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
