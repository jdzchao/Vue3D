<template>
    <x-obj-loader :name="name" :path="path" :material="material" @loaded="loaded">
        <template v-for="item in children">
            <slot v-if="slot">
                <c-loader :obj="item" :parent="id"></c-loader>
            </slot>
        </template>
    </x-obj-loader>
</template>

<script>
    import {mapState} from 'vuex'
    import {XObjLoader} from 'vue3d'
    // import {meshPath} from "@/api/s3";
    import {empty, guid} from '@/utils/index'
    import CLoader from './CLoader'

    export default {
        name: "c-loader",
        components: {XObjLoader, CLoader},
        props: {
            obj: {type: Object},
            parent: {type: String},
        },
        data() {
            return {
                id: null,
                name: null,
                hash: null,
                slot: false,
                children: [], // 子节点对象
                object: {}, // 当前节点对象
                material: null, // 材质
                mtl: '',
            }
        },
        computed: {
            ...mapState({
                _objects: state => state.sceneEditor._objects,
                _materials: state => state.sceneEditor._materials,
            }),
            path() {
                if (!this.hash) return;
                return meshPath(this.hash + '.obj');
            }
        },
        watch: {
            "obj.mesh_hash"(val, oldVal) {
                if (val === oldVal) return;
                this.clean();
                this.load();
            },
            "obj.material"(val, oldVal) {
                if (val === oldVal) return;
                this.setMaterial(val);
            },
        },
        methods: {
            // 初始化
            load() {
                if (!this.obj) return;
                this.slot = false;
                this.id = empty(this.obj.id) ? guid() : this.obj.id;
                this.name = this.obj.name;
                this.hash = this.obj.mesh_hash;
                this.children = this.obj.objects;
                this.$store.commit('MOUNT_OBJECT', {uuid: this.id, obj: this.obj});
                let mtl = this.obj.material ? this.obj.material : 'default';
                this.setMaterial(mtl);
            },
            // 清理不用的对象
            clean() {
                this.$store.commit('DISMOUNT_OBJECT', this.id);
            },
            // 模型装载完成后回调
            loaded(object) {
                this.object = object;
                object.handler = this.id;
                object.hash = this.hash;
                this.setObject();
                this.slot = true;
                this.$store.state.sceneEditor.progress.current++;
            },
            // 初始化当前object3d数据
            setObject() {
                if (!this._objects.hasOwnProperty(this.id)) return;
                this.setPosition();
                this.setRotation();
                this.setScale();
            },
            setPosition() {
                if (!this._objects[this.id].hasOwnProperty('position')) return;
                if (typeof this._objects[this.id].position === 'string') {
                    try {
                        this._objects[this.id].position = JSON.parse(this.obj.position);
                    } catch (err) {
                        console.debug(err);
                    }
                }
                this.object.position.x = this._objects[this.id].position.x;
                this.object.position.y = this._objects[this.id].position.y;
                this.object.position.z = this._objects[this.id].position.z;
            },
            setRotation() {
                if (!this._objects[this.id].hasOwnProperty('rotation')) return;
                if (typeof this._objects[this.id].rotation === 'string') {
                    try {
                        this._objects[this.id].rotation = JSON.parse(this.obj.rotation);
                    } catch (err) {
                        console.debug(err);
                    }
                }
                this.object.rotation.x = this._objects[this.id].rotation.x;
                this.object.rotation.y = this._objects[this.id].rotation.y;
                this.object.rotation.z = this._objects[this.id].rotation.z;
            },
            setScale() {
                if (!this._objects[this.id].hasOwnProperty('scale')) return;
                if (typeof this._objects[this.id].scale === 'string') {
                    try {
                        this._objects[this.id].scale = JSON.parse(this.obj.scale);
                    } catch (err) {
                        console.debug(err);
                    }
                }
                this.object.scale.set(this._objects[this.id].scale.x, this._objects[this.id].scale.y, this._objects[this.id].scale.z);
            },
            setMaterial(val) {
                if (this._materials.hasOwnProperty(val) && this._materials[val].hasOwnProperty('mtl')) {
                    this.material = this._materials[val].mtl;
                }
                this.$store.commit('SCENE_RENDER');
            }
        },
        mounted() {
            this.load()
        },
        beforeDestroy() {
            this.clean();
        },
    }
</script>
