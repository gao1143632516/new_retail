import axios from 'axios';
import {
  Message
} from 'element-ui';
import store from '../store';

import * as c from './cookies';
// axios.defaults.withCredentials=true;

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
       console.log(config);

      if(store.getters.loginStatus!=0 ){//登录以后

        if(config.method=='get'){//如果是get请求
          config.params.hasOwnProperty("sessionkey") ? '' : config.params['sessionkey'] = store.getters.sessionkey;
        }else{
          if(config.url.lastIndexOf("?")!=-1){//有传参
            config.url = config.url+"&sessionkey="+store.getters.sessionkey;
          }else{
            config.url = config.url + '?sessionkey='+store.getters.sessionkey;
          }

        }
        //config.url = config.url + "&__zone_offset__="+store.getters.zoneOffset;

        // config.params.sessionkey = store.getters.sessionkey;
        // console.log(store.getters.sessionkey);
        // console.log(config);

      }
  //   if (config.method=="post"){
  //       config.data = qs.stringify(config.data);
  //       config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  //   }
  //
  // var k=c.getSessionkey();
  // if (k) {
  //     config.headers['X-SESSIONKEY'] =k; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject(error);
  //     } else {
  //       return response.data;
  //     }
  response => {
      const res=response.data
      var message='未知错误'+res;
      const status=res.status||{success:false,message:message};
      if(!status.success){
        message=status.message||message;
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(message);
      }else{
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service;
