import ControlPanel from '@/views/_layout/ControlPanel'

const setting = {
    path: '/setting',
    component: ControlPanel,
    redirect: '/setting/index',
    meta: {
        title: 'setting', icon: 'setting'
    },
    children: [
        {
            path: 'index',
            name: 'setting',
            component: () => import('@/views/setting/index'),
            meta: {
                title: 'setting', icon: '', noCache: true,
                roles: ['admin']
            }
        },
    ]
}

export default setting