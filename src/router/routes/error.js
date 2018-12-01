import Simple from '@/views/_layout/Simple'

const error = {
    path: '/error',
    component: Simple,
    redirect: '/error/404',
    name: 'error',
    hidden: true,
    children: [
        {
            path: '401',
            name: 'error_401',
            component: () => import(/* webpackChunkName: "error" */ '@/views/error_page/index.vue'),
            props: {code: 401, message: 'Illegal Access'},
        },
        {
            path: '404',
            name: 'error_404',
            component: () => import(/* webpackChunkName: "error" */ '@/views/error_page/index.vue'),
            props: {code: 404, message: 'Page Not Found'},
        },
        {
            path: '500',
            name: 'error_500',
            component: () => import(/* webpackChunkName: "error" */ '@/views/error_page/index.vue'),
            props: {code: 500, message: 'Internal Error'},
        },
    ]
}

export default error