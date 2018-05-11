import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from '../pages/PageNotFound'

import example from './example'
import doc from './doc'
import editor from './editor'

Vue.use(Router);

let routes = [
  {
    path: '/',
    alias: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */'../pages/Index.vue'),
    meta: {activeTab: 'index'}
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound
  }
];

routes.push(...example);
routes.push(...editor);
routes.push(...doc);

export default new Router({routes});
