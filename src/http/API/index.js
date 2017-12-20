import request from '../request'
import qs from 'querystring'

if (process.env.NODE_ENV === 'production') {
  request.defaults.baseURL = 'http://dongfy.cifuwu.net';
} else {
  request.defaults.baseURL = 'http://dongfy.cifuwu.net';
}

export function getModel(d3id) {
  return request({
    url: '/api/d3/getModel',
    method: 'get',
    params: {
      d3id
    }
  })
}

export function getPrefab(d3id, prefabid) {
  return request({
    url: '/api/d3/getPreFab',
    method: 'get',
    params: {
      d3id,
      prefabid
    }
  })
}

export default {
  getModel: (...args) => getModel(...args),
  getPrefab: (...args) => getPrefab(...args),
}
