import request from '@/utils/request'
import qs from 'querystring'
import SHA from 'crypto-js/sha1'

export function login(account, password, header) {
    return request({
        url: '/api/cp/login',
        method: 'post',
        data: qs.stringify({
            account,
            password: SHA(password).toString(),
            header
        })
    })
}

export function getInfo(token) {
    return new Promise((resolve, reject) => {
        resolve({data: {roles: ['site']}})
    })
    // return request({
    //     url: '/api/cp/info',
    //     method: 'post',
    //     data: qs.stringify({token})
    // })
}

export function logout() {
    return request({
        url: '/api/cp/logout',
        method: 'get'
    })
}
