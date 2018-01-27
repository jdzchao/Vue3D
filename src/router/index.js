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
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */'../pages/Home.vue'),
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
