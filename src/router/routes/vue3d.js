import PageSite from '@/views/_layout/PageSite'

const vue3d = {
    path: '/vue3d',
    component: PageSite,
    redirect: '/vue3d/index',
    meta: {
        title: 'editor', icon: 'scene'
    },
    children: [
        {
            path: 'index',
            name: 'Index',
            component: () => import('@/views/vue3d/index'),
            meta: {
                title: 'editor', icon: 'scene', noCache: true,
                roles: ['site', 'vue3d']
            }
        },
    ]
}

export default vue3d
