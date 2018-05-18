export default [
  {
    id: 'scene',
    title: '场景',
    icon: 'vue3d-scene',
    route: '/example/scene'
  },
  {
    id: 'geometry',
    title: '三维对象',
    icon: 'vue3d-geometry',
    sub: [
      {
        id: 'cube',
        title: 'Cube',
        route: '/example/cube'
      }
    ]
  },
]
