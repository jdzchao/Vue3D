<template>
  <canvas id="canvas" class="canvas" :process="process"></canvas>
</template>
<script>
  const THREE = require('three');
  THREE.OrbitControls = require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!../../node_modules/three/examples/js/controls/OrbitControls');

  import ThreeUtils from '../utils/three'
  import scene from '../config/scene'

  export default {
    name: 'XScene',
    props: {
      height: Number,
      width: Number,
      controllable: {type: Boolean, default: true}
    },
    data() {
      return {
        aspect: this.width / this.height,
        handler: null,
        renderer: null,
        scene: new THREE.Scene(),
        camera: null,
        box: null,
        ray: new THREE.Raycaster(),
        mouse: new THREE.Vector2(),
        controls: null,
        backgroundColor: scene.backgroundColor,
        backgroundAlpha: scene.backgroundAlpha,
      }
    },
    mounted() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$el
      });
      this.camera = new THREE.PerspectiveCamera(this.fov(), this.width / this.height, scene.near, scene.far);
      this.camera.position.z = scene.dis + scene.size * 2;
      this.camera.target = new THREE.Vector3();

//      // 测试方块
//      let geometry = new THREE.BoxGeometry(scene.size, scene.size, scene.size);
//      let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//      let cube = new THREE.Mesh(geometry, material);
//      this.scene.add(cube);

      this.Resize();

      // 绑定事件
      this.$el.addEventListener('mousedown', this.onMouseDown, false);
      this.$el.addEventListener('mousemove', this.onMouseMove, false);
      this.$el.addEventListener('mouseup', this.onMouseUp, false);
      this.$el.addEventListener('click', this.onClick, false);
    },
    computed: {
      // 主进程装载
      process() {
        if (this.$store.state.lifecycle.step === 'update') {
          this.$store.state.scene = this.scene;
          this.$store.state.camera = this.camera;
          this.$store.commit('UpdateSceneDelegation', this.updateRenderer);
          this.$store.commit('UpdateSceneDelegation', this.updateControls);
          this.$store.commit('LoadingNext');
          this.$emit('Rendered', true);
          return true;
        }
        return false;
      },
      hasListener() {
        const events = this._events;
        let result = {};
        ['on-mousemove', 'on-mouseup', 'on-mousedown', 'on-click'].forEach(name => {
          result[name] = !!events[name] && events[name].length > 0;
        });
        return result;
      },
    },
    watch: {
      width() {
        this.Resize();
      },
      height() {
        this.Resize();
      }
    },
    methods: {
      fov() {
        return ThreeUtils.calcFov(scene.dis, scene.size, this.width / this.height);
      },
      updateCamera() {
        let camera = this.camera;
        camera.fov = this.fov();
        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();
      },
      updateRenderer() {
        let renderer = this.renderer;
        renderer.setSize(this.width, this.height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setClearColor(new THREE.Color(this.backgroundColor).getHex());
        renderer.setClearAlpha(this.backgroundAlpha);
      },
      updateControls() {
        if (this.controllable && this.controls) return;
        if (this.controllable) {
          if (this.controls) return;
          this.controls = new THREE.OrbitControls(this.camera, this.$el);
          this.controls.addEventListener('change', this.render, false);
          this.controls.type = 'orbit';
          this.controls.minDistance = scene.near;
          this.controls.maxDistance = scene.far - 100;
        } else {
          if (this.controls) {
            this.controls.dispose();
            this.controls = null;
          }
        }
      },
      // 渲染帧
      render() {
        if (this.handler) return;
        this.handler = requestAnimationFrame(() => {
          this.handler = null;
          this.$store.commit('UpdateScene');
          this.renderer.render(this.scene, this.camera);
        })
      },
      Resize() {
        this.$store.state.aspect = this.width / this.height;
        this.render();
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
        this.Intersected(intersected);
//        this.$emit('on-click', intersected);
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
      Intersected(intersected) {
        let object = !empty(intersected) ? intersected.object : null;
        this.SetMaterialTarget(object);             //设置贴图的目标模型
      },
      SetMaterialTarget(object) {
//        //设置uv操作的目标和相关操作
//        if (object === this.materialTarget) return;
//        this.SetJson();                                 //保存当前json
//        this.materialTarget = object;                 //设置纹理目标
//        this.LoadJson();                                //加载json
//        this.LoadUv();                                 //加载当前uv  config
//        if (empty(object)) {
//          this.box.traverse(function (child) {
//            child.material ? child.material.color.set(0xffffff) : null;
//          });
//        } else {
//          this.box.traverse(function (child) {
//            child !== object && child.material ? child.material.color.set(0x009393) : null;
//          });
//          object.material.color.set(0xffffff);
//        }
//        this.render();
      },
    },
    beforeDestroy() {
      this.$el.removeEventListener('mousedown', this.onMouseDown, false);
      this.$el.removeEventListener('mousemove', this.onMouseMove, false);
      this.$el.removeEventListener('mouseup', this.onMouseUp, false);
      this.$el.removeEventListener('click', this.onClick, false);
    },
  }
</script>
