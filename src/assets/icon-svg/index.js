import Vue from 'vue'
import IconSvg from '@/components/IconSvg' // svg组件

// register globally
Vue.component('icon-svg', IconSvg)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./', false, /\.svg$/)
requireAll(req)
