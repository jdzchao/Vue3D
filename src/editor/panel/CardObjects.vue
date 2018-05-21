<template>
  <el-collapse-item title="OBJECTS" name="objects">
    <div id="card-objects">
      <el-form label-width="80px">
        <el-form-item label="定制编组:">
          <el-radio-group v-model="customizable" size="medium" :disabled="disabled">
            <el-tooltip class="item" effect="dark" content="不可定制" placement="top">
              <el-radio-button label="0">X</el-radio-button>
            </el-tooltip>
            <el-radio-button label="1">1</el-radio-button>
            <el-radio-button label="2">2</el-radio-button>
            <el-radio-button label="3">3</el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="customizable" size="medium" :disabled="disabled">
            <el-radio-button label="4"></el-radio-button>
            <el-radio-button label="5"></el-radio-button>
            <el-radio-button label="6"></el-radio-button>
            <el-radio-button label="7"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </el-collapse-item>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "card-objects",
    data() {
      return {
        object: null,
        customizable: "0",
        disabled: true
      }
    },
    computed: {
      ...mapState({
        selectedObj: state => state.tddz.selected.obj
      })
    },
    watch: {
      selectedObj(val) {
        if (val && val.handler) {
          this.object = this.$store.state.tddz.object3d[val.handler];
          this.customizable = this.object.customizable ? this.object.customizable : "0";
          this.key = this.object.material;
          this.disabled = false;
        } else {
          this.key = '';
          this.disabled = true;
          this.editable = false;
        }
      },
      customizable(val) {
        this.object.customizable = val;
      }
    }
  }
</script>

<style>
  .el-collapse-item__content {
    padding-bottom: 0;
  }
</style>
