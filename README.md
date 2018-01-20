# Vue3D

> 将Three.js 封装成vue.js 2.x 组件   
> Vue.js & Three.js   

## Install

### npm   

``` bash
npm install --save vue3d 
```

## yarn 

``` bash
yarn add vue3d
```

## Usage

### 全局引用
main.js
``` javascript
import Vue3D from 'vue3d'
Vue.use(Vue3D);
```
任意组件中
``` vue
<template>
  <v-scene>
    <vue3d-components></vue3d-components>
  </v-scene>
</template>

<script>
export default {
   components: {
      VScene,
      ... // Vue3dComponents
   },
}
</script>

// this.$vue3d.Materials; // 注册的全局材质
// this.$vue3d.Utils; // 注册的全局工具
```
### 按需引用
``` bash
import {VScene, XCamera, XLight, ...} from 'vue3d'
import {Materials,Utils} from 'vue3d' // 也可以按需引用模型材质和辅助工具
```


