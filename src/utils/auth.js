import Cookies from 'js-cookie'
import {Base64} from 'js-base64'

const TokenKey = 'token'

export function getHeader() {
    const header = {
        "typ": "jwt",
        "rap": "r1"
    }
    return Base64.encodeURI(JSON.stringify(header))
}

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    const payload = parseToken(token)
    let exp = new Date(payload.exp * 1000)
    return Cookies.set(TokenKey, token, {expires: exp})
}

export function removeToken() {
    sessionStorage.clear();
    return Cookies.remove(TokenKey)
}

function parseToken(token) {
    let tk = token.split(".");
    if (token && tk.length === 3) {
        let header = JSON.parse(Base64.decode(tk[0]));
        let payload = JSON.parse(Base64.decode(tk[1]));
        for (let h in header) {
            if (!header.hasOwnProperty(h)) continue;
            sessionStorage.setItem(h, header[h])
        }
        for (let p in payload) {
            if (!payload.hasOwnProperty(p)) continue;
            let value = payload[p];
            if (value && typeof value === 'object') {
                value = JSON.stringify(payload[p])
            }
            sessionStorage.setItem(p, value)
        }
        return payload;
    } else {
        return {};
    }
}
