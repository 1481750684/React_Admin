import axios from 'axios'
import Store from '../store/store'
import ActionCreator from '../store/actionCreator'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('请求拦截器',config)
    let {method} = config
    let token = localStorage.getItem('token')
    if(method === 'get'){
      config.url += `&token=${token}`
    }
    if(method === 'post'){
      config.data += `&token=${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.status === 200) {
      if(response.data.err === -8){
        Store.dispatch(ActionCreator.changeModelState())
      }
      return response.data
    }else{
      return Promise.reject('请求失败，请检查后重试');  // 也是链式调用的catch处理
    }
   
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default axios


// function test(){
//   new Promise((resolve,reject)=>{
//     resolve()
//     reject()
//   })
// }