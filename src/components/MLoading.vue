<template>
  <div id="MLoading" v-if="loading">
    <div class="loading-loading-wrap2">
      <div class="loading-wrap">
        <div class="loading-overlay"></div>
        <div class="loading-cogWheel loading-one">
          <div class="loading-cog loading-one"></div>
          <div class="loading-cog loading-two"></div>
          <div class="loading-cog loading-three"></div>
          <div class="loading-cog loading-four"></div>
          <div class="loading-cog loading-five"></div>
          <div class="loading-center"></div>
        </div>
        <div class="loading-cogWheel loading-two">
          <div class="loading-cog loading-one"></div>
          <div class="loading-cog loading-two"></div>
          <div class="loading-cog loading-three"></div>
          <div class="loading-cog loading-four"></div>
          <div class="loading-cog loading-five"></div>
          <div class="loading-center"></div>
        </div>
      </div>
    </div>
    <div class="notice">{{notice}}</div>
  </div>
</template>
<script>
  export default {
    name: 'MLoading',
    data() {
      return {}
    },
    computed: {
      loading() {
        return this.$store.getters.OnLoading;
      },
      notice() {
        return "loading..." + this.$store.state.process + '...';
      }
    }
  }
</script>
<style scoped>
  .notice {
    width: 100%;
    position: absolute;
    bottom: 1rem;
    color: #ffffff;
    font-size: 0.5rem;
    text-align: center;
  }

  .loading-loading-wrap2 {
    width: 356px;
    height: 356px;
    overflow: hidden;
  }

  .loading-wrap {
    position: absolute;
    width: 238px;
    height: 238px;
    left: 50%;
    top: 50%;
    margin-top: -119px;
    margin-left: -119px;
    transform: scale(2);
  }

  .loading-wrap .loading-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    box-shadow: 0 0 59px 90px rgb(0, 0, 0) inset;
  }

  .loading-wrap .loading-cogWheel {
    position: absolute;
    top: 50%;
    margin-top: -59px;
    width: 119px;
    height: 119px;
  }

  .loading-wrap .loading-cogWheel.loading-one {
    left: -15.25px;
    animation: loading-rotLeft 1.15s infinite linear;
  }

  .loading-wrap .loading-cogWheel.loading-one .loading-one:before {
    border: none;
  }

  .loading-wrap .loading-cogWheel.loading-two {
    right: -15.25px;
    margin-top: -57px;
    transform: rotate(196deg);
    animation: loading-rotRight 1.15s infinite linear;
  }

  .loading-wrap .loading-cogWheel.loading-two .loading-one:before {
    border: none;
  }

  .loading-wrap .loading-cogWheel .loading-cog {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
  }

  .loading-wrap .loading-cogWheel .loading-cog:after {
    display: block;
    position: absolute;
    content: ' ';
    border: 5px solid rgb(255, 255, 255);
    border-left: none;
    height: 21px;
    width: 12px;
    right: -21px;
    top: -10px;
  }

  .loading-wrap .loading-cogWheel .loading-cog:before {
    display: block;
    position: absolute;
    content: ' ';
    border-left: 5px solid rgb(255, 255, 255);
    height: 24px;
    width: 10px;
    right: -14px;
    top: -31px;
    transform: rotate(-20deg);
  }

  .loading-wrap .loading-cogWheel .loading-cog.loading-one {
    transform: rotate(-80deg);
  }

  .loading-wrap .loading-cogWheel .loading-cog.loading-two {
    transform: rotate(-40deg);
  }

  .loading-wrap .loading-cogWheel .loading-cog.loading-three {
    transform: rotate(0deg);
  }

  .loading-wrap .loading-cogWheel .loading-cog.loading-four {
    transform: rotate(40deg);
  }

  .loading-wrap .loading-cogWheel .loading-cog.loading-five {
    transform: rotate(80deg);
  }

  @keyframes loading-rotLeft {
    from {
      transform: rotate(-30deg);
    }
    to {
      transform: rotate(10deg);
    }
  }

  @keyframes loading-rotRight {
    from {
      transform: rotate(-174deg);
    }
    to {
      transform: rotate(-214deg);
    }
  }
</style>
<style>
  #MLoading {
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
