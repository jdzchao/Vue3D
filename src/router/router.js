import Home from '../modules/Home'
import Panorama from '../modules/Panorama'
export default {
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/panorama',
      name: 'Panorama',
      component: Panorama
    },
  ]
}
