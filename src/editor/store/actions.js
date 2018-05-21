export default {
  // 从接口读取场景数据
  load(ctx, params) {
    API.load(params.id, params.slot, params.serialize, params.design).then((res) => {
      ctx.state.data.scene = res.scene.data;
      ctx.state.data.design = res.design.data;
      ctx.state.progress.goal = res.scene.data.count; // 加载obj个数
      ctx.commit('initMaterials');
      ctx.commit('initDesign');
      ctx.state.loaded = true;
    });
  },

  // 将场景数据保存到服务器
  save(ctx, callback) {
    API.saveScene(JSON.stringify(ctx.state.data.scene)).then((res) => {
      if (typeof callback === 'function') {
        callback(res);
      }
    }).catch((err) => {
      callback && callback(err);
    });
  },

  // 向场景中添加三维对象
  addObject(ctx, obj) {
    let id = guid();
    let name = obj.name;
    let hash = obj.hash;
    let material = "1";
    let target = ctx.state.dom.scene.getObjectByName(name);
    if (target && target.handler && target.name) {
      name = name + "(" + new Date().getTime().toSystem62() + ")";
    }
    let o = {
      id: id,
      name: name,
      mesh_hash: hash,
      material: material, // 默认材质：白瓷
      objects: []
    };
    if (empty(ctx.state.selected.handler) || empty(ctx.state.selected.name)) {
      ctx.state.data.scene.objects.push(o);
    } else {
      ctx.state.object3d[ctx.state.selected.handler].objects.push(o);
    }
  },
  removeObject(ctx) {
    ctx.commit("removeSelected");
    ctx.commit("freeSelected");
  },
  createMaterial(ctx, m) {
    ctx.commit('addMaterial', m);
  }
}
