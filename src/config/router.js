import Vue from 'vue'
import Router from 'vue-router'

import Cloud from '../pages/Cloud.vue'
import Buy from '../pages/Buy.vue'
import Decal from '../pages/Decal.vue'
import Text from '../pages/Text.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/decal',
      name: 'Decal',
      component: Decal
    },
    {
      path: '/text',
      name: 'Text',
      component: Text
    },
    {
      path: '/cloud',
      name: 'Cloud',
      component: Cloud
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }
  ]
})
