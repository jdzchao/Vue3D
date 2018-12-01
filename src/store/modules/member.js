import {getInfo, login, logout} from '@/api/cp'
import {getHeader, getToken, removeToken, setToken} from '@/utils/auth'

const member = {
    state: {
        token: getToken(),
        name: '', // 昵称
        avatar: '', // 头像
        sex: 2, // 性别
        introduction: '', // 简介
        area: '', // 地区
        city: '', // 辖市
        province: '', // 省份
        country: '', // 国家
        roles: [], // 角色
        setting: { // 设定
            articlePlatform: []
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_SEX: (state, sex) => {
            state.sex = sex
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_AREA: (state, area) => {
            state.area = area
        },
        SET_CITY: (state, city) => {
            state.city = city
        },
        SET_PROVINCE: (state, province) => {
            state.province = province
        },
        SET_COUNTRY: (state, country) => {
            state.country = country
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        // 登录
        Login({commit}, member) {
            return new Promise((resolve, reject) => {
                login(member.account, member.password, getHeader()).then(response => {
                    const data = response.data
                    setToken(data.token)
                    commit('SET_TOKEN', data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_SEX', data.sex)
                    commit('SET_INTRODUCTION', data.introduction)
                    commit('SET_AREA', data.area)
                    commit('SET_CITY', data.city)
                    commit('SET_PROVINCE', data.province)
                    commit('SET_COUNTRY', data.country)
                    commit('SET_SETTING', data.setting)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({commit, dispatch}, token) {
            return new Promise(resolve => {
                commit('SET_TOKEN', token)
                setToken(token)
                getInfo(token).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_SEX', data.sex)
                    commit('SET_INTRODUCTION', data.introduction)
                    commit('SET_AREA', data.area)
                    commit('SET_CITY', data.city)
                    commit('SET_PROVINCE', data.province)
                    commit('SET_COUNTRY', data.country)
                    commit('SET_SETTING', data.setting)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        }
    }
}

export default member
