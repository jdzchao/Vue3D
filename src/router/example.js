export default [
  {
    path: '/example',
    component: () => import(/* webpackChunkName: "example" */'../pages/Example.vue'),
    children: [
      {
        path: '/',
        alias: 'scene',
        name: 'scene',
        component: () => import(/* webpackChunkName: "example" */'../pages/example/Scene.vue'),
        meta: {activeNav: 'example', activeMenu: 'scene'}
      },
      {
        path: 'light',
        name: 'light',
        component: () => import(/* webpackChunkName: "example" */'../pages/example/Light.vue'),
        meta: {activeNav: 'example'}
      },
    ]
  },
]
