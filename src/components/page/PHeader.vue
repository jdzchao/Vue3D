<template>
  <div id="header">
    <v-logo class="logo"></v-logo>
    <div class="link">
      <template v-for="item in items">
        <div class="nav" @click="changeTab(item.route)" :class="{active:activeNav===item.id}">{{item.title}}</div>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import VLogo from "../VLogo";

  export default {
    name: "PHeader",
    components: {VLogo},
    props: {
      items: {type: Array}
    },
    computed: {
      ...mapState(['activeNav'])
    },
    methods: {
      changeTab(obj) {
        this.$router.push(obj);
      }
    }
  }
</script>

<style scoped>
  #header {
    position: relative;
    height: 60px;
    background-color: #545c64;
    color: #ffffff;
    line-height: 60px;
    padding: 0 20px;
    overflow: hidden;
  }

  .logo {
    float: left;
    cursor: pointer;
  }

  .link {
    float: right;
    color: #ffffff;
  }

  .nav {
    position: relative;
    float: left;
    padding: 0 20px;
    cursor: pointer;
  }

  .nav.active {
    color: #ffd04b
  }

  .nav.active:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 3px solid #ffd04b;
    color: #ffd04b;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    z-index: 5;
  }
</style>

