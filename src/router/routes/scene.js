import ControlPanel from '@/views/_layout/ControlPanel'

const scene = {
    path: '/scene',
    component: ControlPanel,
    redirect: '/scene/index',
    meta: {
        title: 'scene', icon: 'scene'
    },
    children: [
        {
            path: 'index',
            name: 'Index',
            component: () => import('@/views/member/index'),
            meta: {
                title: 'scene', icon: '', noCache: true,
                roles: ['admin', 'editor']
            }
        },
    ]
}

export default scene