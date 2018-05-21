<template>
  <div id="editor-menu">
    <el-menu mode="horizontal" @select="menuSelect" unique-opened>
      <el-submenu index="file">
        <template slot="title">File</template>
        <!--<el-menu-item index="new">新建</el-menu-item>-->
        <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
      </el-submenu>
      <el-submenu index="edit">
        <template slot="title">Edit</template>
        <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
      </el-submenu>
      <!--<el-menu-item index="1"><i class="icon iconfont cifuwu-translate"></i></el-menu-item>-->
      <!--<el-menu-item index="3"><i class="icon iconfont cifuwu-translate"></i></el-menu-item>-->
      <el-button-group class="btn">
        <el-button type="primary" @click="preview">预览</el-button>
        <el-button type="primary" @click="save" :disabled="save_keep">保存</el-button>
      </el-button-group>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "EditorMenu",
    components: {},
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        save_text: '保存', // 保存 OR 保存中
        save_keep: false
      };
    },
    methods: {
      menuSelect(key, keyPath) {

      },

      // 保存
      save() {
        this.save_text = "wait...";
        this.save_keep = true;
        this.$store.dispatch('tddz/save', (res) => {
          if (res.code === 20000) {
            this.$notify({
              title: '成功',
              message: "保存成功",
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: '保存失败',
              message: res.message
            });
          }
          this.save_text = "保存";
          this.save_keep = false;
        })
      },

      // 预览
      preview() {
      }
    }
  }
</script>

<style scoped>
  #editor-menu {
    position: relative;
    width: 100%;
    height: 61px;
    overflow: hidden;
  }

  .btn {
    float: right;
    margin: 10px;
  }
</style>
