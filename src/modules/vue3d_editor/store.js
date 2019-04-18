// import {loadScene, saveScene} from "@/api/xapi";
import {empty, guid} from '@/utils'

const vue3d = {
    state: {
        canvas: {}, // editor DOM
        sWidth: 200, // scene width
        sHeight: 200, // scene height
        status: 'ready', // 数据加载状态 [ ready | loaded | rendered ]
        dialog: '', // 对话框状态
        data: {
            raw: {}, // 原始数据,通常为API中读取的原始JSON数据

            id: 0,
            name: null,
            tags: '',
            objects: [], // 三维对象
            materials: [], // 三维材质
            uvs: [], // 定制uv坐标
            design: [], //用户定制数据
        },
        // 当前选中对象
        selected: {
            handler: '',
            name: '',
            obj: {},
        },
        // 编辑器设置
        setting: {
            orbit: true, // 摄像机随鼠标盘旋转动
            transform: 'translate',// transform模式: translate || rotation || scale
        },
        // 加载状态
        progress: {
            goal: 0, // 目标
            current: 0 // 当前进度
        },

        /* region <<< 场景中的动态对象 >>> */

        _objects: {},
        _materials: {},

        /* endregion */
    },
    getters: {
        // 场景加载完毕
        sceneLoaded(state) {
            return state.status === 'loaded' || state.status === 'rendered'
        },
        // 场景渲染完毕
        sceneRendered(state) {
            if (state.status !== 'rendered') {
                if (state.progress.goal > 0 && state.progress.goal === state.progress.current) {
                    state.status = 'rendered'
                }
            }
            return state.status === 'rendered'
        },
        sceneSelected(state) {
            return (state.selected.obj && state.selected.obj.handler === state.selected.handler);
        },
        // 当前选中三维对象材质对象
        sceneSelectedMaterial(state) {
            if (state.selected.handler && state._objects.hasOwnProperty(state.selected.handler)) {
                let obj = state._objects[state.selected.handler];
                return state._materials[obj.material];
            } else {
                return null;
            }
        },
        // 当前选中三维对象材质名称
        sceneSelectedMaterialName(state) {
            if (state.selected.handler && state._objects.hasOwnProperty(state.selected.handler)) {
                let obj = state._objects[state.selected.handler];
                return obj.material;
            } else {
                return '';
            }
        }
    },
    mutations: {
        // 更改场景数据加载状态
        CHANGE_SCENE_STATUS(state, status) {
            state.status = status;
        },
        // 渲染场景
        SCENE_RENDER(state) {
            state.canvas.render();
        },
        // 设置场景数据
        SET_SCENE_DATA(state, data) {
            state.data.raw = data;
            state.data.id = data.id;
            state.data.name = data.name;
            state.data.tags = data.tags;
            state.data.objects = data.objects;
            state.data.materials = data.materials;
            state.data.uvs = data.uvs;
            state.progress.goal = data.count;
        },
        // 设置被选中的三维对象
        SET_SELECTED(state, obj) {
            state.setting.orbit = false;
            state.selected.obj = obj;
            state.selected.handler = obj.handler;
            state.selected.name = obj.name;
        },
        // 释放当前选中对象
        FREE_SELECTED(state) {
            state.selected.obj = null;
            state.selected.handler = '';
            state.selected.name = '';
            state.setting.orbit = true;
        },
        // 挂载三维对象到场景中
        MOUNT_OBJECT(state, obj) {
            if (!state._objects.hasOwnProperty(obj.uuid)) {
                state._objects[obj.uuid] = obj.obj;
            }
        },
        // 从三维场景中移除对象
        DISMOUNT_OBJECT(state, uuid) {
            delete state._objects[uuid];
        },
        // 移除对象数据
        REMOVE_OBJECT(state, id) {
            removeChild(state.data.objects, 'id', id);

            function removeChild(arr, key, value) {
                if (!arr instanceof Array) return;
                arr.forEach((item) => {
                    if (item[key] === value) {
                        arr.splice(arr.indexOf(item), 1);
                        return true;
                    } else {
                        removeChild(item.objects, key, value);
                    }
                });
            }
        },
        // 向场景中添加材质
        ADD_MATERIAL(state, mtl) {
            state.data.materials.push(mtl); // 数据对象
        },
        // 打开对话框
        OPEN_DIALOG(state, active) {
            state.dialog = active;
        },
        // 关闭对话框
        CLOSE_DIALOG(state) {
            state.dialog = "";
        }
    },
    actions: {
        // 读取场景数据
        LoadSceneData({commit, dispatch}, params) {
            if (!params.hasOwnProperty('id')) return;
            // return new Promise((resolve, reject) => {
            //     loadScene(
            //         params.id,
            //         params.hasOwnProperty('slot') ? params.slot : null,
            //         params.hasOwnProperty('serialize') ? params.serialize : null
            //     ).then(res => {
            //         commit('SET_SCENE_DATA', res.data)
            //         commit('CHANGE_SCENE_STATUS', 'loaded')
            //         dispatch('AddDefaultMaterial')
            //         resolve(res.data)
            //     }).catch(err => {
            //         reject(err)
            //     })
            // })
        },
        // 保存场景数据
        SaveSceneData({state}) {
            return new Promise((resolve, reject) => {
                saveScene(
                    state.data.id,
                    state.data.name,
                    state.data.tags,
                    JSON.stringify(state.data.objects),
                    JSON.stringify(state.data.materials),
                    JSON.stringify(state.data.uvs)
                ).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 场景渲染
        SceneRender({commit}) {
            return new Promise(resolve => {
                commit('SCENE_RENDER');
                resolve()
            })
        },
        // 通过射线(ray target)选取三维对象
        GetSelectedByRay({state, commit}, targets) {
            return new Promise(resolve => {
                if (targets && targets.length > 0) {
                    for (let i in targets) {
                        if (!targets.hasOwnProperty(i)) continue;
                        let item = targets[i].object;
                        if (state._objects.hasOwnProperty(item.handler)) {
                            commit('SET_SELECTED', item);
                            resolve(item)
                            return;
                        } else if (state._objects.hasOwnProperty(item.parent.handler)) {
                            commit('SET_SELECTED', item.parent);
                            resolve(item.parent)
                            return;
                        }
                    }
                }
                commit('FREE_SELECTED');
            })
        },
        // 通过名称(name)选取三维对象
        GetSelectedByName({state, commit}, name) {
            return new Promise(resolve => {
                if (state.selected.name === name) return;
                let target = state.canvas.scene.getObjectByName(name);
                if (target.handler && target.name) {
                    commit('SET_SELECTED', target);
                    resolve(target)
                }
            })
        },
        // 添加对象数据
        AddObject({state, commit}, obj) {
            return new Promise(resolve => {
                let id = guid();
                let name = obj.name;
                let hash = obj.hash;
                let material = "default";
                let target = state.canvas.scene.getObjectByName(name);
                if (target && target.handler && target.name) {
                    name = name + "(" + new Date().getTime().toSystem62() + ")";
                }
                let o = {
                    id: id,
                    name: name,
                    mesh_hash: hash,
                    material: material,
                    objects: []
                };
                if (empty(state.selected.handler) || empty(state.selected.name)) {
                    state.data.objects.push(o); // 向对象根节点添加数据
                } else {
                    state._objects[state.selected.handler].objects.push(o); // 若当时有选中对象，则向选中对象子节点添加对象
                }
                resolve(o)
            })
        },
        // 移除当前选中的数据对象
        RemoveObject({commit, state}) {
            return new Promise(resolve => {
                let handler = state.selected.obj.handler;
                let id = state._objects[handler].id;
                commit('REMOVE_OBJECT', id);
                commit('FREE_SELECTED');
                resolve(id)
            })
        },
        AddMaterial({commit}, mtl) {
            return new Promise(resolve => {
                commit('ADD_MATERIAL', mtl)
                resolve()
            })
        },
        // 添加默认材质
        AddDefaultMaterial({state, dispatch}) {
            if (!state._materials.hasOwnProperty('default')) {
                dispatch('AddMaterial', {id: 'default', name: 'default', type: 'phong'});
                state.progress.current--;
            }
        },
        SceneClear({state, commit}) {
            commit("FREE_SELECTED");
            state.status = 'ready';
            state.dialog = "";
            state._objects = {};
            state._materials = {};
            state._uvs = {};
            state.progress.goal = 0;
            state.progress.current = 0;
        }
    }
}
export default vue3d
