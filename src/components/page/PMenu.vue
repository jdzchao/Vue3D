<template>
  <div id="menu">
    <el-menu :default-active="activeMenu" class="el-menu-vertical">
      <template v-for="item in obj">
        <template v-if="item.sub">
          <el-submenu :index="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <template v-for="i in item.sub">
              <el-menu-item :index="i.id">
                <i :class="i.icon"></i>
                <span slot="title">{{i.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "PMenu",
    props: {
      obj: {type: Array},
      default: {type: String}
    },
    data() {
      return {
        activeMenu: this.default,
      }
    },
    watch: {
      activeMenu(val) {
        this.$store.state.activeMenu = val;
      }
    }
  }
</script>

<style scoped>
  #menu {
    float: left;
    width: 200px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #menu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  #menu::-webkit-scrollbar {
    width: 3px;
    background-color: #F5F5F5;
  }

  #menu::-webkit-scrollbar-thumb {
    background-color: #545c64;
  }
</style>
