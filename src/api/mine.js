import request from '@/utils/request'
import qs from 'querystring'
import SHA from 'crypto-js/sha1'

export function modifyInfo(info) {
    return request({
        url: '/api/mine/modify_info',
        method: 'get',
        params: info
    })
}

export function modifyPassword(oPass, nPass, rPass) {
    nPass = SHA(nPass).toString();
    rPass = SHA(rPass).toString();
    if (nPass !== rPass) return new Error();
    return request({
        url: '/api/mine/modify_password',
        method: 'post',
        data: qs.stringify({
            oPass: SHA(oPass).toString(),
            nPass,
            rPass
        })
    })
}