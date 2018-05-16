export default [
  {
    path: '/doc',
    name: 'doc',
    component: () => import(/* webpackChunkName: "doc" */'../pages/Doc.vue'),
    meta: {activeNav: 'doc'}
  },
]
