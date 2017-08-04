const S3_DOMAIN = 'http://s3.cifuwu.com';
const M3d_DOMAIN = 'https://3d.cifuwu.com';
export default {
  upload_image: S3_DOMAIN + '/api/upload/image',
  upload_model: S3_DOMAIN + '/api/upload/model',
  resource: S3_DOMAIN + '/api/resource/',
  image_show: S3_DOMAIN + '/image/show/',
  model_show: S3_DOMAIN + '/storage/model/',
  unit: M3d_DOMAIN + '/api/unit/index',
  unit_more: M3d_DOMAIN + '/api/unit/more',
  unit_add: M3d_DOMAIN + '/api/unit/add',
}
