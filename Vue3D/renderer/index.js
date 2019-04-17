import Vue from 'vue'
import debug from './debug'
import delegation from './delegation'
import event from './event'

/**
 * 渲染总线
 */
export default class {
    constructor() {
        this.render=2
        return new Vue({
            mixins: [event, delegation, debug],
            data: {
                _$auto: false, // 是否自动逐帧渲染
                _$pause: false, // 是否暂停渲染
                _$pure: false, // 是否仅渲染 hierarchy scene
                _$rendering: null, // 正在渲染
                _$status: 0, // 渲染状态 0:awake; 1:start; 2:render;
            },
            methods: {
                // 渲染一帧
                render() {
                    if (this.$data._$status === 0) {
                        this.setStatus("start");
                        this.on("render", this.render);
                    }
                    if (this.$data._$rendering || this.$data._$pause) return;
                    this.$data._$rendering = requestAnimationFrame(() => {
                        this.setStatus('render');
                        this.delegationCall();
                        this.$emit("update"); // 正常来讲只有这里能触发update事件
                        this.$data._$rendering = null;
                        if (this.$data._$auto) {
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
                            this.info(" = = Vue3D Start = = ");
                            break;
                        case  2:
                            this.$data._$status = 2;
                            this.info(" = = Vue3D Render = = ");
                            break;
                        default:
                            return;
                    }
                },
                setAuto() {
                    this.$data._$auto = !this.$data._$auto;
                    this.info(" > > Vue3D Auto: " + this.$data._$auto + " < < ");
                },
                setPause() {
                    this.$data._$pause = !this.$data._$pause;
                    this.info(" > > Vue3D Pause: " + this.$data._$pause + " < < ");
                },
                getPure() {
                    return this.$data._$pure;
                },
                setPure() {
                    this.$data._$pure = !this.$data._$pure;
                    this.render();
                },
            }
        });
    }
};
