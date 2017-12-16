import request from '../request'
import qs from 'querystring'

let baseURL = '';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://s3.cifuwu.com';
} else {
  baseURL = 'https://s3.cifuwu.com';
}

export function model(name) {
  return baseURL + '/storage/model/' + name;
}

export function image(hash, size) {
  if (!size) size = 'origin';
  return baseURL + '/image/show/' + size + '/' + hash;
}

export function uv(name) {
  return baseURL + '/storage/uvw/' + name;
}

export default {
  model: (...args) => model(...args),
  image: (...args) => image(...args),
  uv: (...args) => uv(...args),
}
