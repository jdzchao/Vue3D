# 当前版本为极度不稳定状态，可以issues

# Vue3D

> 将Three.js 封装成vue.js 2.x 组件   
> Vue.js & Three.js   

## 安装 

### 使用npm   

``` bash
npm install --save vue3d 
```

## 使用yarn 

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
        <v3d-components></v3d-components>
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
