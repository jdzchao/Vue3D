import request from '../../http/request'
import qs from 'querystring'

import {data} from '../../../static/demo/json/cup'

let S3URL = 'https://s3.cifuwu.com';
let DATA_URL = 'https://xapi.cifuwu.com';

if (process.env.NODE_ENV === 'development') {
  // S3URL = 'https://s3.cifuwu.com';
  // DATA_URL = 'https://xapi.cifuwu.com';
}

// 模型加载路径
export function modelPath(name) {
  return S3URL + '/storage/model/' + name;
}

// 模型上传路径
export function modelUploadPath() {
  return S3URL + '/api/upload/model';
}

// 模型上传
export function modelUpload() {
}

// 图片加载路径
export function imagePath(name, size) {
  if (!name) return;
  if (!size) size = 'origin';
  return S3URL + '/image/show/' + size + '/' + name;
}

// 图片上路径
export function imageUploadPath(type) {
  if (!type) type = 'file';
  return S3URL + '/api/upload/image/' + type;
}

// 图片文件上传
export function imageUploadWithFile(file, onProgress) {
  let formData = new FormData();
  formData.append('image', file);

  return request({
    url: imageUploadPath('file'),
    method: 'post',
    data: formData,
    onUploadProgress: onProgress,
  })
}

// uv加载路径
export function uvPath(name) {
  return S3URL + '/storage/uvw/' + name;
}

/**
 * 加载场景数据
 * @returns {*}
 */
export function loadScene() {
  return new Promise(function (resolve, reject) {
    resolve(data);
  });
}
