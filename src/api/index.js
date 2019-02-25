import Vue from 'vue'

import vueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import { Loading, MessageBox } from 'element-ui'
import Utils from '../utils/index'

import Router from 'vue-router'

import vueInstance from '../main'

import Cookies from 'js-cookie'
const CancelToken = axios.CancelToken
Vue.use(vueResource)

Vue.use(Router)
 
export const config = {
  signKey: '',
}

export const keys = {
  ACCESS: 'A0',
  LONGIN: 'A1'
}
 

export const request = (url, params,method, loadingTargetId) => {
  let loadingService
  let  _params;
  /* 是否提示加载 */
  if (loadingTargetId) loadingService = Utils.openLoading(loadingTargetId)

  /* 必须参数 */
  params = packageParams(params)
  
  if(!method)  method='get';
	// 兼容get
  _params = method.toLowerCase() === 'get'? { params: params}:params;

  /* 开始请求 */
  const promise = new Promise((resolve, reject) => {
    Vue.http.options.emulateJSON = true
 
   Vue.http[method](url,_params).then(res => {
      if (loadingService) {
        const delay = typeof loadingTargetId === 'string' ? 500 : 2000
        setTimeout(() => loadingService.close(), delay)
      }

      packageRes(res, resolve, reject)
    }, err => {
      packageError(err)
       if (loadingService) loadingService.close()
      reject(err)
    })
  })

  promise.catch(err => err)

  return promise
}

function packageRes(res, resolve, reject) {
  if (res.body.errcode === 0 || res.body.status===0) {
      resolve(res.body)
  }else if (res.body.errcode === 10002 || res.body.errcode === 1004) {
      Utils.saveLocal(keys.ACCESS, '')
      Utils.saveLocal(keys.LONGIN, false)
      Cookies.remove('UCOA_TICKET')
      vueInstance.$router.push({
        path: '/login'
      })
    }
    else{
       Utils.errorToast(null, res.body.msg)
    }
     
  }


function packageError(err) {
  if (!err.ok) {
    switch (err.status) {
      case 408:
        Utils.errorToast(null, '访问超时')
        break
      default:
        Utils.errorToast(null, '访问失败')
        break
    }
  }
}

/* 必须参数 */
function packageParams(paramsData) {
  let params = Object.assign({}, paramsData)
  if (params.cellpack) {
    delete params.cellpack
  }
  params = Utils.filterNull(params)
  params.access_token = Utils.loadLocal(keys.ACCESS) || 'abc'
  Utils.getCookie('UCOA_TICKET') ? params.ticket = Utils.getCookie('UCOA_TICKET') : null
  return params
}

   //拦截响应response，并做一些错误处理
axios.interceptors.request.use(config => {
	config.data = qs.stringify(packageParams(config.data))
	return Object.assign({}, config, {});
	}, error => {
	return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  if (response.data.errcode === 0 ||response.data.status===0) {
    return response.data;
  }
  if (response.data.errcode != 2003) { // 权限错误
    Utils.errorToast(null, res.msg)
  }
  if (response.data.errcode === 10002 || response.data.errcode === 1004) {
    Utils.saveLocal(keys.ACCESS, '')
    Utils.saveLocal(keys.LONGIN, false)
    Cookies.remove('UCOA_TICKET')
    vueInstance.$router.push({
      path: '/login'
    })
  }
  return Promise.reject(response.data);
}, error => {
  if (!error.config.silentError) {
    Message.error(`请求失败(${error.message})！`);
  }
  return Promise.reject(error);
});

const axiometer = (f) => {
  return (url, params = {}, options = {}) => {
    const { withoutToken, ...restOptions } = options;
    return f(url, params, restOptions);
  };
};

export const get = axiometer((url, params, options) => {
  return axios.get(url, {
    params,
    ...options
  });
});

export const post = axiometer((url, params, options) => {
  return axios.post(url, params, { ...options });
});
