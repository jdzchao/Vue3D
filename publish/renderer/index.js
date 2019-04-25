import Vue from 'vue'
import * as THREE from 'three'
import Bus from '../bus'
import capture from './capture'
import event from './event'
import scenes from './scenes'
import orbit from './orbit'

/**
 * Vue3D 渲染总线
 */
export default class {
    constructor() {
        return new Vue({
            mixins: [capture, event, scenes, orbit],
            data: {
                // option
                _$auto: false, // 是否自动逐帧渲染
                _$pause: false, // 是否暂停渲染
                _$play: false, // 是否开启运行模式
                // renderer
                _$renderer: null, // Three renderer
                _$rendering: null, // 渲染器正在渲染当前帧
                _$status: 0, // 渲染器状态 0:awake; 1:start; 2:render;
                // scene
                _$canvas: null, // The <canvas> dom
                _$scene: null, // Base Scene
                _$camera: null, // God's Perspective Camera

                width: 100, // renderer width
                height: 100, // renderer height
                ratio: 1, // renderer ratio
                clearColor: "rgb(25,25,25)", // renderer clear color
                clearAlpha: 1, // renderer clear alpha
            },
            watch: {},
            methods: {
                init(canvas, scene, camera, renderer_params, callback) {
                    this.setStatus(0);
                    renderer_params['canvas'] = canvas;
                    this.$data._$canvas = canvas;
                    this.$data._$scene = scene;
                    this.$data._$camera = camera;
                    this.$data._$renderer = new THREE.WebGLRenderer(renderer_params);

                    this.$data._$scene.add(this.$data._$camera);

                    this.scenes_init();
                    this.orbit_init();
                    this.capture_init();

                    this.render();

                    callback && callback({
                        scene: this.scenes_activate,
                        cameras: this.cameras,
                    });

                    return this;
                },
                // 渲染一帧
                render() {
                    if (this.$data._$status === 0) {
                        this.setStatus(1); // 切换渲染器状态
                        this.on("render", this.render); // 【兼容】监听 render 事件
                    }
                    if (this.$data._$rendering || this.$data._$pause) return;
                    this.$data._$rendering = requestAnimationFrame(() => {
                        this.setStatus(2); // 切换渲染器状态
                        Bus.delegationCall(this); // 调用委托中的方法

                        this.emit("update"); // 触发组件更新事件

                        // 当 pure 为真时，则仅渲染 standard scene
                        this.$data._$play ?
                            this.$data._$renderer.render(this.scene, this.cameras) :
                            this.$data._$renderer.render(this.$data._$scene, this.$data._$camera);

                        this.$data._$rendering = null; // 当前帧渲染完成，释放掉

                        if (this.$data._$auto) {
                            // 当 auto 为真时，进入递归循环 渲染
                            this.render();
                        }
                    })
                },
                // 刷新渲染器
                refresh() {
                    this.$data._$camera.aspect = this.width / this.height;
                    this.$data._$camera.updateProjectionMatrix();// 摄像机参数改变后必须执行生效
                    this.$data._$renderer.setSize(this.width, this.height);
                    this.$data._$renderer.setPixelRatio(this.ratio);
                    this.$data._$renderer.setClearColor(new THREE.Color(this.clearColor).getHex(), this.clearAlpha);
                    this.render();
                },
                // 设置渲染状态
                setStatus(status) {
                    const status_enum = ['awake', 'start', 'render'];
                    if (status_enum.indexOf(status) >= 0) {
                        status = status_enum.indexOf(status);
                    }
                    if (status <= this.$data._$status) return; // 不允许小于当前状态
                    this.$data._$status = status;
                    this.emit("status", status_enum[status]);
                },
                setAuto() {
                    this.$data._$auto = !this.$data._$auto;
                    this.emit("auto", this.$data._$auto);
                    Bus.info("ლ(´ڡ`ლ) Vue3D Auto => " + this.$data._$auto);
                },
                setPause() {
                    this.$data._$pause = !this.$data._$pause;
                    this.emit("pause", this.$data._$pause);
                    Bus.info("ლ(´ڡ`ლ) Vue3D Pause => " + this.$data._$pause);
                },
                setPlay() {
                    this.$data._$play = !this.$data._$play;
                    this.emit("play", this.$data._$play);
                    this.render();
                },
                setSize(width, height, refresh) {
                    this.width = width;
                    this.height = height;
                    if (refresh) this.refresh();
                    // this.$data._$renderer.setSize(width, height);
                },
                setPixelRatio(ratio, refresh) {
                    this.ratio = ratio;
                    if (refresh) this.refresh();
                    // this.$data._$renderer.setPixelRatio(ratio);
                },
                setClearColor(clearColor, clearAlpha, refresh) {
                    this.clearColor = clearColor;
                    this.clearAlpha = clearAlpha;
                    if (refresh) this.refresh();
                    // this.$data._$renderer.setClearColor(new THREE.Color(clearColor).getHex(), clearAlpha);
                },
                getRenderer() {
                    return this.$data._$renderer;
                },
                getBaseScene() {
                    return this.$data._$scene;
                },
                getBaseCamera() {
                    return this.$data._$camera;
                },
            }
        });
    }
}
