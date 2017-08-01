const S3_DOMAIN = 'http://s3.cifuwu.com';
const THREE_DOMAIN = 'http://3d.cifuwu.com';
const ZJSDETY = "http://taoyi.pasp.cn/";
export default {
  upload_image: S3_DOMAIN + '/api/upload/image',
  upload_model: S3_DOMAIN + '/api/upload/model',
  resource: S3_DOMAIN + '/api/resource/',
  image_show: S3_DOMAIN + '/image/show/',
  model_show: S3_DOMAIN + '/storage/model/',
  unit: THREE_DOMAIN + '/api/unit/index',
  unit_more: THREE_DOMAIN + '/api/unit/more',
  unit_add: THREE_DOMAIN + '/api/unit/add',
  model_get: ZJSDETY + '/storage/model',
  model_res: ZJSDETY + "api/craft",
}
