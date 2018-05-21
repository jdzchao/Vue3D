<template>
  <el-collapse-item title="MATERIALS" name="materials">
    <div id="card-materials">
      <el-form label-width="80px">
        <el-form-item label="默认材质:">
          <el-select value="" filterable size="small" v-model="key" placeholder="请选择" :disabled="disabled" style="width: 165px">
            <el-option-group>
              <template v-for="item,index in materials">
                <el-option v-if="item.cstm===true" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-option-group>
          </el-select>
          <el-button size="small" @click="newMtl">添加</el-button>
        </el-form-item>
      </el-form>

      <el-form label-width="80px" v-if="editable">

        <!--<el-form-item label="flatShading">-->
        <!--<el-switch v-model="mtl.flatShading"></el-switch>-->
        <!--</el-form-item>-->

        <el-form-item label="底色">
          <el-col :span="6">
            <el-form-item>
              <el-color-picker color-format="rgb" v-model="color"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="反射光色">
              <el-color-picker color-format="rgb" v-model="specular"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="光泽度">
          <el-slider v-model="mtl.shininess" :min="0" :max="100" :step="1"></el-slider>
        </el-form-item>

        <el-form-item label="透明">
          <el-switch v-model="mtl.transparent"></el-switch>
        </el-form-item>
        <el-form-item label="透明度">
          <div class="block">
            <el-slider v-model="mtl.opacity" :min="0" :max="1" :step="0.01"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="uv贴图">
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="纹理图" placement="top">
              <image-uploader v-model="map_color" :width="60" :height="60"></image-uploader>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="法线图" placement="top">
              <image-uploader v-model="map_normal" :width="60" :height="60"></image-uploader>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            <el-tooltip class="item" effect="dark" content="高光图" placement="top">
              <image-uploader v-model="map_specular" :width="60" :height="60"></image-uploader>
            </el-tooltip>
          </el-col>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
  </el-collapse-item>
</template>

<script>
  import S3 from '../http/API/s3'
  import {mapState} from 'vuex'
  import regexp from '../utils/regexp'
  import * as THREE from 'three'
  import ImageUploader from "../components/ImageUploader";

  export default {
    components: {ImageUploader},
    name: "card-materials",
    data() {
      return {
        disabled: true, // 材质面板下拉菜单是否可选
        editable: false, // 是否可以编辑当前材质
        key: '', // 当前操作的材质标识 id OR name
        object: {}, // 当前操作的对象数据
        material: {}, // 当前材质对象
        mtl: {}, // 当前材质对象的具体材质值
        /* 中间变量 */
        specular: 'rgb(255,255,255)', // 映射值
        color: 'rgb(255,255,255)', // 映射值
        map_color: '',
        map_normal: '',
        map_specular: ''
      }
    },
    computed: {
      ...mapState({
        materials: state => state.tddz.materials,
        selectedObj: state => state.tddz.selected.obj,
      })
    },
    watch: {
      selectedObj(val) {
        if (val && val.handler) {
          this.object = this.$store.state.tddz.object3d[val.handler];
          this.key = this.object.material;
          this.disabled = false;
        } else {
          this.key = '';
          this.disabled = true;
          this.editable = false;
        }
      },
      key(val) {
        if (empty(val)) {
          this.material = {};
        } else if (val === 'new') {
          this.newMtl(val);
        } else {
          this.object.material = val;
          this.material = this.materials[val];
        }
      },
      material(val) {
        if (val) {
          this.mtl = val.mtl;
        } else {
          this.mtl = null;
        }
      },
      mtl: {
        deep: true,
        handler(val) {
          if (val && val.hasOwnProperty('uuid')) {
            this.editable = this.material.cstm;
            this.specular = this.toRGB(val.specular);
            this.color = this.toRGB(val.color);
            this.map_color = this.toSrc(val.map);
            this.map_normal = this.toSrc(val.normalMap);
            this.map_specular = this.toSrc(val.specularMap);
            this.setHandler(val);
            this.$store.commit("tddz/render");
          } else {
            this.editable = false;
          }
        }
      },
      specular(val) {
        this.mtl.specular = new THREE.Color(val);
      },
      color(val) {
        this.mtl.color = new THREE.Color(val);
      },
      map_color(val, oldVal) {
        if (val === oldVal) return;
        new THREE.TextureLoader().load(S3.imagePath(val), (res) => {
          res.name = val;
          this.mtl.map = res;
          this.mtl.needsUpdate = true;
        }, null, (err) => {
          this.mtl.map = null;
          this.mtl.needsUpdate = true;
        });
      },
      map_normal(val, oldVal) {
        if (val === oldVal) return;
        new THREE.TextureLoader().load(S3.imagePath(val), (res) => {
          res.name = val;
          this.mtl.normalMap = res;
          this.mtl.needsUpdate = true;
        }, null, (err) => {
          this.mtl.normalMap = null;
          this.mtl.needsUpdate = true;
        });
      },
      map_specular(val, oldVal) {
        if (val === oldVal) return;
        new THREE.TextureLoader().load(S3.imagePath(val), (res) => {
          res.name = val;
          this.mtl.specularMap = res;
          this.mtl.needsUpdate = true;
        }, null, (err) => {
          this.mtl.specularMap = null;
          this.mtl.needsUpdate = true;
        });
      }
    },
    methods: {
      newMtl() {
        this.$prompt('请输入材质名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: this.matchNewMtlName,
        }).then(({value}) => {
          let m = {id: value, name: value, type: 'phong'};
          this.$store.dispatch('tddz/createMaterial', m);
        })
      },
      matchNewMtlName(name) {
        if (regexp.name.test(name)) {
          if (this.materials.hasOwnProperty(name)) {
            return '当前材质名称已存在';
          } else {
            return true;
          }
        } else {
          return '请输入中文、英文或数字'
        }
      },
      setHandler(val) {
        if (this.material.hasOwnProperty('handler')) {
          this.material.handler['flat_shading'] = val.flatShading;
          this.material.handler['shininess'] = val.shininess;
          this.material.handler['transparent'] = val.transparent;
          this.material.handler['opacity'] = val.opacity;
          this.material.handler['specular'] = this.specular;
          this.material.handler['color'] = this.color;
          this.material.handler['map_color'] = this.map_color;
          this.material.handler['map_normal'] = this.map_normal;
          this.material.handler['map_specular'] = this.map_specular;
        }
      },
      toRGB(obj) {
        return 'rgb(' + obj.r * 255 + ',' + obj.g * 255 + ',' + obj.b * 255 + ')';
      },
      toSrc(texture) {
        if (!texture) return;
        return texture.name;
      }
    }
  }
</script>

<style scoped>
  #card-materials {
    background-color: #F5F7FA;
    padding: 0 10px 0 0;
  }

  .el-select {
    width: 200px;
  }

  .new {
    color: rgba(255, 53, 0, 0.97);
    text-indent: 2em;
  }
</style>
