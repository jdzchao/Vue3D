export default [
  {
    path: '/doc',
    component: () => import(/* webpackChunkName: "doc" */'../pages/Doc.vue'),
    children: [
      {
        path: '/',
        alias: 'start',
        name: 'start',
        component: () => import(/* webpackChunkName: "example" */'../pages/doc/Start.vue'),
        meta: {activeNav: 'doc', activeMenu: 'start'}
      }
    ]
  },
]
