import Axios from 'axios'
import token from './token'

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
  if (token.get()) {
    config.headers[token.key] = token.get() // 让每个请求携带自定义token
  }
  return config
}, error => {
  //TODO: Do something with request error
  console.error(error); // for debug
  Promise.reject(error)
});

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 20000) {
      //TODO：抛出异常可以统一处理
      console.error(res.message);
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.error(error); // for debug
    return Promise.reject(error)
  }
);

export default service
