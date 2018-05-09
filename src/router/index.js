import Vue from 'vue'
import Router from 'vue-router'
import PageNotFound from '../pages/PageNotFound'
import editor from './editor'
import example from './example'

Vue.use(Router);

// import admin from './admin'
let routes = [
  {
    path: '/',
    alias: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */'../pages/Index.vue'),
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound
  }
];

routes.push(...editor);
routes.push(...example);

export default new Router({routes});
