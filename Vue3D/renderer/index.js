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
            mixins: [event, delegation, debug],
            data: {
                // option
                _$auto: false, // 是否自动逐帧渲染
                _$pause: false, // 是否暂停渲染
                _$pure: false, // 是否仅渲染 hierarchy scene
                // renderer
                _$renderer: null, // 渲染器
                _$rendering: null, // 渲染器正在渲染当前帧
                _$status: 0, // 渲染器状态 0:awake; 1:start; 2:render;
                // scene
                _$scene: null, // Base scene
                _$cameras: [], // Array Cameras

                id: "", // Scene ID
                dom: null, // The <canvas> dom
                scene: null, // Standard scene
                cameras: [], // Cameras Array
            },
            methods: {
                init(opt, callback) {
                    this.$data._$scene = new THREE.Scene();
                    this.$data._$cameras = new THREE.ArrayCamera(this.cameras);
                    this.scene = new THREE.Scene();

                    this.$data._$scene.add(this.scene);
                    this.$data._$renderer = new THREE.WebGLRenderer({
                        canvas: opt.dom,
                        antialias: opt.antialias, // 抗锯齿
                        alpha: opt.alpha, //
                        preserveDrawingBuffer: opt.buffer, //绘图缓冲
                    });

                    this.id = opt.id || this.$data._$scene.uuid;
                    this.dom = opt.dom;

                    this.render();
                    callback && callback({
                        _$scene: this.$data._$scene,
                        scene: this.scene,
                        cameras: this.cameras,
                        dom: this.dom,
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
                        this.$data._$pure ?
                            this.$data._$renderer.render(this.scene, this.$data._$cameras) :
                            this.$data._$renderer.render(this.$data._$scene, this.$data._$cameras);
                        this.$emit("update"); // 正常来讲只有这里能触发update事件
                        this.$data._$rendering = null; // 当前帧渲染完成，释放掉
                        if (this.$data._$auto) {
                            // 当 auto 为真时，进入死循环 递归渲染
                            this.render();
                        }
                    })
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
                            this.info("ლ(´ڡ`ლ) Vue3D Start: " + this.id);
                            break;
                        case  2:
                            this.$data._$status = 2;
                            this.info("ლ(´ڡ`ლ) Vue3D Render: " + this.id);
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
                    return this.$data._$pure;
                },
                setPure() {
                    this.$data._$pure = !this.$data._$pure;
                    this.render();
                },
                setSize(width, height) {
                    this.$data._$renderer.setSize(width, height);
                },
                setPixelRatio(ratio) {
                    this.$data._$renderer.setPixelRatio(ratio);
                },
                setClearColor(bgColor) {
                    this.$data._$renderer.setClearColor(new THREE.Color(bgColor).getHex());
                },
                setClearAlpha(alpha) {
                    this.$data._$renderer.setClearAlpha(alpha);
                },
                addCamera(camera) {
                    this.$data.cameras.push(camera);
                    this.$emit("reset-renderer");
                }
            }
        });
    }
};
