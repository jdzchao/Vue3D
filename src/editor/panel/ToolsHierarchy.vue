<template>
  <div id="tools-hierarchy">
    <div class="tools">
      <el-button-group class="btns">
        <el-tooltip class="item" effect="dark" content="在选中节点上添加对象" placement="top">
          <el-button @click="appendSelected"><i class="vue3d-icon vue3d-add"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除选中节点内的对象" placement="top">
          <el-button @click="removeSelected"><i class="vue3d-icon vue3d-subtract"></i></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="取消选中状态" placement="top">
          <el-button @click="freeSelected"><i class="vue3d-icon vue3d-free"></i></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div class="tree">
      <el-tree ref="tree" show-checkbox check-strictly :data="objects" @current-change="changeTarget" :props="defaultProps" node-key="name" default-expand-all :expand-on-click-node="false"></el-tree>
    </div>
    <!--<dialog-add-mesh :visible="addMesh" @add="" @close="appendSelectedCancel" @success="appendSelectedAccept"></dialog-add-mesh>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  // import DialogAddMesh from "../components/d3/DialogAddMesh";

  export default {
    name: "ToolsHierarchy",
    data() {
      return {
        popover: false,
        defaultProps: {
          children: 'objects',
          label: 'name'
        },
        addMesh: false
      }
    },
    computed: {
      ...mapState({
        objects: state => state.editor.data.scene.objects,
        selectedName: state => state.editor.selected.name,
      })
    },
    watch: {
      selectedName(val, oldVal) {
        if (val === oldVal) return;
        this.$refs.tree.setCurrentKey(val);
        this.$refs.tree.setCheckedKeys([val]);
      },
    },
    methods: {
      changeTarget(data) {
        this.$store.commit('editor/setSelectedByName', data.name);
      },
      appendSelected() {
        this.addMesh = true;
      },
      appendSelectedAccept(obj) {
        this.addMesh = false;
        if (obj.hasOwnProperty('name') && obj.hasOwnProperty('hash')) {
          this.$store.dispatch('editor/addObject', obj);
        }
      },
      appendSelectedCancel() {
        this.addMesh = false;
      },
      removeSelected() {
        this.$confirm('是否删除当前选中的对象，其子对象也将一并删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('editor/removeObject');
          this.$notify({
            title: '成功',
            message: '成功删除对象',
            type: 'success'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      freeSelected() {
        this.$store.commit('editor/freeSelected');
      }
    }
  }
</script>

<style scoped>
  .tools {
    width: 100%;
    margin: 0 0 10px 0;
    overflow: hidden;
  }

  .tree {
    width: 100%;
  }

  .el-checkbox {
    pointer-events: none;
  }
</style>
<style>
  /*生效版本*/
  .el-checkbox {
    pointer-events: none;
  }
</style>
