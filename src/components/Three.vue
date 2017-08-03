<template>
  <div class="three" ref="three">
    <canvas ref="canvas" class="three_canvas">
      Your browser does not support WebGL
    </canvas>
  </div>
</template>

<script>
  let _this;
  //  import {ThreeUtils, empty} from '../utils/index'

  const THREE = require('src/components/Three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../node_modules/three/examples/js/controls/OrbitControls');
  THREE.OBJLoader = require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!../../node_modules/three/examples/js/loaders/OBJLoader');

  export default {
    props: {
      //字符串绝对路径
      path: {
        type: String,
      },
      //dom宽度
      width: {
        type: Number,
        default: 400
      },
      //dom高度
      height: {
        type: Number,
        default: 400
      },
      //模型位置
      position: {
        type: Object,
        default() {
          return {x: 0, y: 0, z: 0}
        }
      },
      //模型偏转
      rotation: {
        type: Object,
        default() {
          return {x: 0, y: 0, z: 0}
        }
      },
      //模型缩放大小
      scale: {
        type: Object,
        default() {
          return {x: 1, y: 1, z: 1}
        }
      },
      //模型材质
      material: {
        type: Object,
        default() {
          return new THREE.MeshPhongMaterial({
            shading: THREE.SmoothShading,
            shininess: 30,
            color: 0xffffff,
          });
        }
      },
      //场景灯光
      lights: {
        type: Array,
        default() {
          return [
            {
              type: 'AmbientLight',
              color: 0xffffff,
              intensity: 0.6
            },
            {
              type: 'DirectionalLight',
              position: {x: 20, y: 15, z: 50},
              color: 0xffffff,
              intensity: 0.4
            }
          ]
        }
      },
      //相机位置
      cameraPosition: {
        type: Object
      },
      //相机偏转
      cameraRotation: {
        type: Object
      },
      //未知
      cameraUp: {
        type: Object
      },
      //相机目标点
      cameraLookAt: {
        type: Object
      },
      //场景背景
      backgroundColor: {
        default: 0x000000
      },
      //背景透明
      backgroundAlpha: {
        type: Number,
        default: 1
      },

      //是否需要控制器（默认是）
      controllable: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        handler: null,
        //判断是否支持WebGL
        manager: new THREE.LoadingManager(),             //加载器管理
        //obj加载器
        loader: new THREE.OBJLoader(),
        //render大小
        size: {
          width: this.width,
          height: this.height
        },
        //场景盒子
        box: new THREE.Group(),
        //模型
        object: null,

        //纹理目标
        materialTarget: null,
        //射线
        raycaster: new THREE.Raycaster(),
        //鼠标点
        mouse: new THREE.Vector2(),
        //相机
        camera: new THREE.PerspectiveCamera(57, 1, 1, 1000),
        //场景
        scene: new THREE.Scene(),
        //渲染器
        renderer: null,
        //控制器
        controls: null,
        //所有灯光
        allLights: [],
        src: this.path,
        //未知
        clock: typeof performance === 'undefined' ? Date : performance
      }
    },
    computed: {
      //判断是否需要点击事件
      hasListener() {
        const events = this._events;

        let result = {};

        ['on-mousemove', 'on-mouseup', 'on-mousedown', 'on-click'].forEach(name => {
          result[name] = !!events[name] && events[name].length > 0;
        });

        return result;
      },
      tempScale() {
        return this.scale;
      },
    },
    created() {
      //窗口大小改变调整大小
      //window.addEventListener( 'resize', this.onResize, false );
      console.log(this.hasListener);
      _this = this;
      this.scene.add(this.box);
      this.manager.onProgress = this.Progress;
      this.loader = new THREE.OBJLoader(this.manager);
    },
    mounted() {
      //重定义size
      if (this.width === undefined || this.height === undefined) {
        this.size = {
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        }
      }
      this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: this.$refs.canvas})
      //this.renderer.shadowMap.enabled = true;

      this.load();              //加载模型
      this.update();            //更新

      this.$el.addEventListener('mousedown', this.onMouseDown, false);
      this.$el.addEventListener('mousemove', this.onMouseMove, false);
      this.$el.addEventListener('mouseup', this.onMouseUp, false);
      this.$el.addEventListener('click', this.onClick, false);
    },
    //未知
    beforeDestroy() {

      this.$el.removeEventListener('mousedown', this.onMouseDown, false);
      this.$el.removeEventListener('mousemove', this.onMouseMove, false);
      this.$el.removeEventListener('mouseup', this.onMouseUp, false);
      this.$el.removeEventListener('click', this.onClick, false);

    },
    watch: {
      materialTarget(val) {

        if (!this.materialTarget) return;
        let id = this.materialTarget.parent.id;
        this.materialTarget.material.map = this.objConfig[id].map;
        this.materialTarget.material.needsUpdate = true;
        this.UpdateMap();

      },
      src() {
        this.load();
      },
      width(val) {
        this.$nextTick(() => {
          this.size.width = val;
        })
      },
      height(val) {
        this.$nextTick(() => {
          this.size.height = val;
        })
      },
      material(val) {
        if (this.materialTarget) {
          this.materialTarget.traverse(function (child) {
            if (!empty(child.material)) {
              child.material = val;
              _this.map = val.map;
            }
          });
        }
        this.render();
      },
      map: {
        deep: true,
        handler(val) {
          this.render();
        }
      },
      rotation: {
        deep: true,
        handler(val) {
          if (!this.box) return;
          this.box.rotation.set(val.x, val.y, val.z);
          this.render();
        }
      },
      position: {
        deep: true,
        handler(val) {
          if (!this.box) return;
          this.box.position.set(val.x, val.y, val.z);
          this.render();
        }
      },
      tempScale: {
        deep: true,
        handler(val) {
          console.log(val);
          if (!this.box) return;
          this.box.scale.set(val.x, val.y, val.z);
          this.render();
        }
      },
      lights: {
        deep: true,
        handler(val, oldVal) {
          this.updateLights();
        }
      },
      size: {
        deep: true,
        handler(val) {
          this.camera.aspect = val.width / val.height;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(val.width, val.height);
          this.render();
        }
      },
      controllable() {
        this.updateControls();
      },
      backgroundAlpha() {
        this.updateRenderer();
        this.render();
      },
      backgroundColor() {
        this.updateRenderer();
        this.render();
      }
    },
    methods: {
      Progress() {
        console.log("undefined objLoaderProgress!!!");
      },
      SetPosition(object, val) {
        object.position.add(val);
      },
      UpdateMap() {
        if (this.materialTarget) {
          this.materialTarget.material.map.needsUpdate = true;
          this.render();
        }
      },

      onResize() {

        this.$nextTick(() => {
          this.size = {
            width: this.$el.offsetWidth,
            height: this.$el.offsetHeight
          }
        })

      },

      onMouseDown(event) {

        if (!this.hasListener['on-mousedown']) return;

        const intersected = this.pick(event.clientX, event.clientY);
        this.$emit('on-mousedown', intersected);

      },
      onMouseMove(event) {

        if (!this.hasListener['on-mousemove']) return;

        const intersected = this.pick(event.clientX, event.clientY);
        this.$emit('on-mousemove', intersected);

      },
      onMouseUp(event) {

        if (!this.hasListener['on-mouseup']) return;

        const intersected = this.pick(event.clientX, event.clientY);
        this.$emit('on-mouseup', intersected);

      },
      onClick(event) {

        if (!this.hasListener['on-click']) return;

        const intersected = this.pick(event.clientX, event.clientY);
        this.$emit('on-click', intersected);

      },
      pick(x, y) {

        if (!this.box) return;

        const rect = this.$el.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        this.mouse.x = ( x / this.size.width ) * 2 - 1;
        this.mouse.y = -( y / this.size.height ) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObject(this.box, true);

        return ( intersects && intersects.length ) > 0 ? intersects[0] : null;

      },
      update() {

        this.updateRenderer();
        this.updateModel();
        this.updateCamera();
        this.updateLights();
        this.updateControls();

      },
      updateScale(variable) {
        this.tempScale.x = this.tempScale.y = this.tempScale.z = ThreeUtils.computeScale(this.initSize, variable);
      },
      updateFov() {
        let scale = 100 / ThreeUtils.getSize(this.box).y;
        this.box.scale.multiplyScalar(scale);
        ThreeUtils.setCenter(this.box);
//        let box = new THREE.BoxHelper( this.box, 0xffff00 );
//        this.scene.add( box );
        let boxWH = ThreeUtils.getSize(this.box);
        let f, vertical;
        let r = this.size.width / this.size.height;

        if (r < boxWH.x / boxWH.y) {
          vertical = boxWH.x / r;
        } else {
          vertical = boxWH.y
        }

        f = Math.atan(vertical / 2 / (200 - boxWH.z / 2 )) * 2 * ( 180 / Math.PI );
        this.camera.fov = f;
        this.camera.aspect = this.size.width / this.size.height;
        this.camera.updateProjectionMatrix();
        console.log("updatefov");
        this.render();

      },
      updateModel() {

        let box = this.box;

        box.position.copy(this.position);
        box.rotation.copy(this.rotation);
        box.scale.copy(this.scale);

      },
      updateRenderer() {

        let renderer = this.renderer;

        renderer.setSize(this.size.width, this.size.height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        renderer.setClearAlpha(this.backgroundAlpha);

      },
      updateCamera() {
        if (!this.box) return;

        let camera = this.camera;

        camera.position.set(0, 0, 200);
        camera.aspect = this.size.width / this.size.height;
        camera.updateProjectionMatrix();

      },
      updateLights() {

        this.scene.remove.apply(this.scene, this.allLights);

        this.allLights = [];

        this.lights.forEach(item => {

          if (!item.type) return;

          const type = item.type.toLowerCase();

          let light = null;

          if (type === 'ambient' || type === 'ambientlight') {

            const color = item.color || 0xffffff;
            const intensity = item.intensity || 1;

            light = new THREE.AmbientLight(color, intensity);

          } else if (type === 'point' || type === 'pointlight') {

            const color = item.color || 0xffffff;
            const intensity = item.intensity || 1;
            const distance = item.distance || 0;
            const decay = item.decay || 1;

            light = new THREE.PointLight(color, intensity, distance, decay);

            if (item.position) {
              light.position.copy(item.position);
            }

          } else if (type === 'directional' || type === 'directionallight') {

            const color = item.color || 0xffffff;
            const intensity = item.intensity || 1;

            light = this.light = new THREE.DirectionalLight(color, intensity);

            if (item.position) {
              light.position.copy(item.position);
            }

            if (item.target) {
              light.target.copy(item.target);
            }

          } else if (type === 'hemisphere' || type === 'hemispherelight') {

            const skyColor = item.skyColor || 0xffffff;
            const groundColor = item.groundColor || 0xffffff;
            const intensity = item.intensity || 1;

            light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

            if (item.position) {
              light.position.copy(item.position);
            }

          }

          this.allLights.push(light);
          this.scene.add(light);

        })

      },
      LoadCallback() {
        console.log("undefend LoadCallback!!!");
      },
      updateControls() {

        if (this.controllable && this.controls) return;

        if (this.controllable) {

          if (this.controls) return;
          this.controls = new THREE.OrbitControls(this.camera, this.$el);
          this.controls.addEventListener('change', this.render, false);
          this.controls.type = 'orbit';

        } else {

          if (this.controls) {

            this.controls.dispose();
            this.controls = null;

          }

        }

      },
      updateBox() {
        this.scene.remove(this.box);
        this.box = new THREE.Group();
        this.scene.add(this.box);
      },
      load(path, option, uv) {

        if (!this.src && !path) return;

        let src = path || this.src;

        this.loader.load(src, object => {

          //this.updateBox();

          object.traverse(function (child) {
            if (!empty(child.material)) {
              child.material = new THREE.MeshPhongMaterial({
                shading: THREE.SmoothShading,
                shininess: 30,
                color: 0xffffff,
              });
            }
          });
          //ThreeUtils.setCenter(object);
          if (!empty(option)) {
            this.SetPosition(object, option.position);
          }
          //this.SetMaterialTarget(object);

          this.box.add(object);

          this.render();

          this.LoadCallback(object, uv);


          this.$emit('on-load');

        }, err => {

          this.$emit('on-error', err);

        });

      },
      immediateRender() {
        this.renderer.render(this.scene, this.camera);
      },
      render() {
        // throttle
        if (this.handler) return;
        this.handler = requestAnimationFrame(() => {
          this.light.position.copy(this.camera.position);
          this.handler = null;
          this.immediateRender();
        })
      }
    }
  }

</script>
