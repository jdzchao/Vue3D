import request from '@/utils/request'
import qs from 'querystring'
import {validateURL} from "@/utils/validate";

let baseURL = process.env.VUE_APP_CPRAP;

export function storage(name) {
    return baseURL + '/storage/' + name;
}

export function uploadAvatarPath() {
    return baseURL + '/api/upload/avatar'
}