<template>
  <div id="XNav">
    <template v-for="item in 4">
      <div class="btn" @click="Target(item)">区域{{item}}</div>
    </template>
    <div class="canvas-switch" @click="CloseCanvas">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-done"></use>
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
      CloseCanvas() {
        this.$store.state.isCanvasOpen = false;
      },
      Target(area) {
        console.log(area);
      }
    }
  }
</script>
<style scoped>

  #XNav {
    width: 100%;
    height: 1rem;
    background-color: #666666;
    position: relative;
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
    fill: #ffffff;
    overflow: hidden;
  }
</style>
