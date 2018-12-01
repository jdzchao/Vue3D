import ControlPanel from '@/views/_layout/ControlPanel'

const member = {
    path: '/member',
    component: ControlPanel,
    redirect: '/member/index',
    meta: {
        title: 'member', icon: 'user',
        roles: ['admin']
    },
    children: [
        {
            path: 'index',
            name: 'member_list',
            component: () => import(/* webpackChunkName: "member" */'@/views/member/index'),
            meta: {
                title: 'member_list', icon: 'list', noCache: true,
                roles: ['admin']
            }
        },
        {
            path: 'role',
            name: 'member_role',
            component: () => import(/* webpackChunkName: "member" */'@/views/member/index'),
            meta: {
                title: 'member_role', icon: 'password', noCache: true,
                roles: ['admin']
            }
        },
    ]
}

export default member