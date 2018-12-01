import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// store modules
import app from './modules/app'
import errorLog from './modules/errorLog'
import member from './modules/member'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

let store = new Vuex.Store({
    modules: {
        app,
        errorLog,
        member,
        permission,
        tagsView,

    },
    getters
})

export default store
