<template>
  <div id="menu">
    <el-menu :default-active="activeMenu" class="el-menu-vertical" router>
      <template v-for="item in menus">
        <template v-if="item.sub">
          <el-submenu :index="item.id">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <template v-for="i in item.sub">
              <el-menu-item :index="i.id" :route="i.route">
                <i class="iconfont" :class="i.icon"></i>
                <span slot="title">{{i.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id" :route="item.route">
            <i class="iconfont" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "PMenu",
    props: {
      menus: {type: Array},
    },
    computed: {
      ...mapState(['activeMenu'])
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
