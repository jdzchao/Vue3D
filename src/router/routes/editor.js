import PageSite from '@/views/_layout/PageSite'

const editor = {
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
            component: () => import('@/views/editor/index'),
            meta: {
                title: 'editor', icon: 'scene', noCache: true,
                roles: ['site', 'editor']
            }
        },
    ]
}

export default editor
