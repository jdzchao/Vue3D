import Bus from "../bus"

/**
 * 子场景管理器
 */
export default {
    data() {
        return {
            scenes_manager: [],
            scenes_index: 0,
            // activated Scene
            scenes_activate: null,
        }
    },
    methods: {
        // 初始化场景管理器及默认场景
        scenes_init() {
            this.scenes_activate = Bus.scene_init('default');
            // 添加到 Base Scene 中去
            this.getBaseScene().add(this.scenes_activate);
        },
        // 添加场景，添加成功后默认场景将被替换
        scenes_add(name) {
            let scene = Bus.scene_init(name);
            if (this.scenes_manager.length === 0) {
                this.scenes_change(scene);
            }
            this.scenes_manager.push(scene);
            this.render();
            return scene;
        },
        // 切换场景
        scenes_change(scene) {
            if (scene.type !== 'Scene') return;
            this.getBaseScene().remove(this.scenes_activate);
            this.getBaseScene().add(scene);
            this.scenes_activate = scene;
            this.render();
        },
        // 通过索引获取场景
        scenes_getByIndex(index) {
            if (index <= this.scenes_manager.length)
                return this.scenes_manager[index];
        },
    }
}
