export default {
  // 渲染一帧
  render(state) {
    state.dom.render();
  },

  // 挂载object3d对象
  mountObject(state, val) {
    if (!state.object3d.hasOwnProperty(val.uuid)) {
      state.object3d[val.uuid] = val.obj;
    }
  },

  // 移除object3d对象
  removeObject(state, uuid) {
    delete state.object3d[uuid];
  },

  // 筛选射线对象
  raycast(state, targets) {
    if (targets && targets.length > 0) {
      for (let i in targets) {
        let item = targets[i].object;
        if (state.object3d.hasOwnProperty(item.handler)) {
          state.setting.orbit = false;
          state.selected.obj = item.object;
          state.selected.handler = item.handler;
          state.selected.name = item.name;
          return;
        } else if (state.object3d.hasOwnProperty(item.parent.handler)) {
          state.setting.orbit = false;
          state.selected.obj = item.parent;
          state.selected.handler = item.parent.handler;
          state.selected.name = item.parent.name;
          return;
        }
      }
    }
    state.selected.obj = null;
    state.selected.handler = '';
    state.selected.name = '';
    state.setting.orbit = true;
  },

  // 选取三维对象
  setSelected(state, obj) {
    state.setting.orbit = false;
    state.selected.obj = obj.object;
    state.selected.handler = obj.handler;
    state.selected.name = obj.name;
  },

  // 通过name选取三维对象
  setSelectedByName(state, name) {
    if (state.selected.name === name) return;
    let target = state.dom.scene.getObjectByName(name);
    if (target.handler && target.name) {
      state.setting.orbit = false;
      state.selected.obj = target;
      state.selected.handler = target.handler;
      state.selected.name = target.name;
    }
  },

  // 移除目标选中对象
  removeSelected(state) {
    let handler = state.selected.obj.handler;
    let id = state.object3d[handler].id;
    removeSelectedChild(state.data.scene.objects, 'id', id);
    state.target = null;

    function removeSelectedChild(arr, key, value) {
      if (!arr instanceof Array) return;
      arr.forEach((item) => {
        if (item[key] === value) {
          arr.splice(arr.indexOf(item), 1);
          return true;
        } else {
          removeSelectedChild(item.objects, key, value);
        }
      });
    }
  },

  // 释放当前选中对象
  freeSelected(state) {
    state.selected.obj = null;
    state.selected.handler = '';
    state.selected.name = '';
    state.setting.orbit = true;
  },

  // 初始化材质
  initMaterials(state) {
    let sm = state.data.scene.materials; // 场景自定义材质
    if (sm && sm.length > 0) {
      sm.forEach((item) => {
        let mtl = {};
        Object.assign(mtl, item);
        state.materials[item.name] = mtl;
        state.materials[item.name].cstm = true;
        state.materials[item.name].handler = item;
        state.materials[item.name].mtl = null;
      });
    }
  },

  // 添加材质
  addMaterial(state, obj) {
    let sm = {};
    Object.assign(sm, obj);
    obj.cstm = true;
    obj.handler = sm;
    state.data.scene.materials.push(sm); // 数据对象
    state.materials[obj.name] = obj;
  },

  // 初始化定制数据
  initDesign(state) {
    // 构造canvas子对象保存当前画布信息
    if (state.data.design.uv.length > 0) {
      state.data.design.uv.forEach((item) => {
        item.canvas = {};
        state.uv[item.id] = item;
      })
    }
    // 构造design子对象缓存数据库中读取的定制信息
    if (state.data.design.data.length > 0) {
      state.data.design.data.forEach((item) => {
        state.uv[item.design_uv_id].design = item;
      })
    }
  }
}

