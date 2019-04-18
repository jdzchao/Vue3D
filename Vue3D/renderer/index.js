import Vue from 'vue'
import * as THREE from 'three'
import debug from './debug'
import delegation from './delegation'
import event from './event'

/**
 * 渲染总线
 */
export default class {
    constructor(opt) {
        return new Vue({
            mixins: [debug, delegation, event,],
            data: {
                // option
                _$auto: false, // 是否自动逐帧渲染
                _$pause: false, // 是否暂停渲染
                _$play: false, // 是否开启运行模式
                // renderer
                _$renderer: null, // 渲染器
                _$rendering: null, // 渲染器正在渲染当前帧
                _$status: 0, // 渲染器状态 0:awake; 1:start; 2:render;
                // scene
                _$canvas: null, // The <canvas> dom
                _$scene: null, // Base scene
                _$cameras: [], // Array Cameras
                _$camera: null, // God's Perspective Camera

                scene: null, // activated Scene
                cameras: [], // Cameras Array
                camIndex: 0, // activated Camera

                width: 0, // renderer width
                height: 0, // renderer height
                ratio: 1, // renderer ratio
                clearColor: "rgb(25,25,25)", // renderer clear color
                clearAlpha: 1, // renderer clear alpha
            },
            watch:{

            },
            methods: {
                init(params, callback) {
                    this.$data._$canvas = params.canvas;
                    this.$data._$scene = new THREE.Scene();
                    this.$data._$cameras = new THREE.ArrayCamera(this.cameras);
                    this.$data._$renderer = new THREE.WebGLRenderer(params);
                    this.$data._$camera = new THREE.PerspectiveCamera(50, this.width / this.height);

                    this.scene = new THREE.Scene();
                    this.$data._$scene.add(this.scene);
                    this.$data._$scene.add(this.$data._$camera);

                    this.render();
                    callback && callback({
                        _$scene: this.$data._$scene,
                        scene: this.scene,
                        cameras: this.cameras,
                        canvas: this.canvas,
                    });
                },
                // 渲染一帧
                render() {
                    if (this.$data._$status === 0) {
                        this.setStatus("start"); // 切换渲染器状态
                        this.on("render", this.render); // 【兼容】监听 render 事件
                    }
                    if (this.$data._$rendering || this.$data._$pause) return;
                    this.$data._$rendering = requestAnimationFrame(() => {
                        this.setStatus('render'); // 切换渲染器状态
                        this.delegationCall(); // 调用委托中的方法
                        // 当 pure 为真时，则仅渲染 standard scene
                        this.$data._$play ?
                            this.$data._$renderer.render(this.scene, this.$data._$cameras) :
                            this.$data._$renderer.render(this.$data._$scene, this.$data._$camera);
                        this.$emit("update"); // 正常来讲只有这里能触发update事件
                        this.$data._$rendering = null; // 当前帧渲染完成，释放掉
                        if (this.$data._$auto) {
                            // 当 auto 为真时，进入死循环 递归渲染
                            this.render();
                        }
                    })
                },
                // 刷新渲染器
                refresh() {
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
                    switch (status) {
                        case  1:
                            this.$data._$status = 1;
                            this.info("ლ(´ڡ`ლ) Vue3D Status: Start");
                            break;
                        case  2:
                            this.$data._$status = 2;
                            this.info("ლ(´ڡ`ლ) Vue3D Status: Render");
                            break;
                        default:
                            return;
                    }
                },
                setAuto() {
                    this.$data._$auto = !this.$data._$auto;
                    this.info("ლ(´ڡ`ლ) Vue3D Auto: " + this.$data._$auto);
                },
                setPause() {
                    this.$data._$pause = !this.$data._$pause;
                    this.info("ლ(´ڡ`ლ) Vue3D Pause: " + this.$data._$pause);
                },
                getPure() {
                    return this.$data._$play;
                },
                setPure() {
                    this.$data._$play = !this.$data._$play;
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
                getGodCamera() {
                    return this.$data._$camera;
                },
                addCamera(camera) {
                    this.$data.cameras.push(camera);
                    this.refresh();
                }
            }
        });
    }
};
