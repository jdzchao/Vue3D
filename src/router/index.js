import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/home/index')
    },
    {
        path: '/hologram',
        component: () => import('@/views/hologram/index')
    }
]

const router = new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

export default router
