export default [
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "d3" */'../pages/Editor'),
    meta: {activeNav: 'editor'}
  },
]
