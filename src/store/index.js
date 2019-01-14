import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// store modules
import app from './modules/app'
import errorLog from './modules/errorLog'
import member from './modules/member'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import vue3d from '@/modules/vue3d_editor/store'

Vue.use(Vuex)

let store = new Vuex.Store({
    modules: {
        app,
        errorLog,
        member,
        permission,
        tagsView,
        vue3d,
    },
    getters
})

export default store
