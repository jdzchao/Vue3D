export default [
  {
    path: '/example',
    component: () => import(/* webpackChunkName: "example" */'../pages/Example.vue'),
    children: [
      {
        path: '/',
        name: 'example',
        component: () => import(/* webpackChunkName: "example" */'../pages/example/Light.vue'),
        meta: {activeTab: 'example'}
      },
      {
        path: '/light',
        name: 'light',
        component: () => import(/* webpackChunkName: "example" */'../pages/example/Light.vue'),
        meta: {activeTab: 'example'}
      },
    ]
  },
]
