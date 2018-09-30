import Axios from 'axios'

// 创建axios实例
const service = Axios.create({
  timeout: 15000,                  // 请求超时时间，
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// request 拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  //TODO: Do something with request error
  console.error(error); // for debug
  return Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

export default service
