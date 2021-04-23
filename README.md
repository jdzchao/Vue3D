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

## 引用

### 全局引用
在main.js中
``` javascript
import Vue3D from 'vue3d'
Vue.use(Vue3D);
```

### 按需引用
任意组件中
```
import {Vue3d, V3dScene, V3dCamera, V3dLight, ...} from "vue3d"
```

## 使用
``` vue
<template>
  <vue3d>
    <v3d-scene>
        <v3d-components></vue3d-components>
    </v3d-scene>
  </vue3d>
</template>

<script>
export default {
   components: {
      Vue3d, V3dScene, V3dCamera, V3dLight, ...
   },
}
</script>
```
### javascript
``` bash
import {V3dScene, V3dCamera, V3dLight, ...} from 'vue3d'
import {Materials,Utils} from 'vue3d' // 也可以按需引用模型材质和辅助工具
```

