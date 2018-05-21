export default [
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */'../pages/Editor'),
    meta: {activeNav: 'editor'}
  },
  {
    path: '/editor/:id',
    name: 'editor-id',
    component: () => import(/* webpackChunkName: "editor" */'../pages/Editor'),
    meta: {activeNav: 'editor'}
  },
]
