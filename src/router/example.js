export default [
  {
    path: '/example',
    redirect: '/example/dev'
  },
  {
    path: '/example/dev',
    name: 'example/dev',
    component: () => import(/* webpackChunkName: "example" */'../pages/example/Dev.vue'),
  }
]
