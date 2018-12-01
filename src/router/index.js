import Vue from 'vue'
import Router from 'vue-router'
import PageSite from '@/views/_layout/PageSite'
import error from './routes/error'
import member from './routes/member'
import setting from './routes/setting'

Vue.use(Router);

// 自定义路由
export const asyncRouterMap = [
    member,
    setting,
    error,
    {path: '*', redirect: '/error', hidden: true},
]

// 核心路由，通常不做修改
export const coreRouterMap = [
    {
        path: '/',
        component: PageSite,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName: "core" */'@/views/home/index'),
                meta: {
                    title: 'home', icon: 'dashboard', noCache: true,
                }
            }
        ]
    },
    {
        path: '/mine',
        component: PageSite,
        redirect: '/mine/index',
        hidden: true,
        children: [
            {
                path: 'index',
                name: 'mine',
                component: () => import(/* webpackChunkName: "core" */'@/views/mine/index'),
                meta: {
                    title: 'mine', icon: '', noCache: true,
                }
            },
        ]
    },
    {
        path: '/redirect',
        component: PageSite,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import(/* webpackChunkName: "core" */'@/views/redirect/index')
            }
        ]
    },
    {path: '/login', component: () => import(/* webpackChunkName: "core" */'@/views/login/index'), hidden: true},
];

export default new Router({
    // mode: 'history', //后端重写支持可开
    // scrollBehavior: () => ({y: 0}),
    routes: coreRouterMap
})

