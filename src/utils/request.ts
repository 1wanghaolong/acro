import axios from 'axios'
import type { types } from '@/types/api'
console.log('import.meta.env',import.meta);

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    // 'Admin-Scene':import.meta.env.VITE_ADMIN_SCENE
  },
  timeout: 50000, // 请求超时时间
})
service.interceptors.request.use(
  (config: any) => {
    // const local = JSON.parse(String(localStorage.getItem('local')))
    // const local = useLocal()
    // const temp = useTemp()
    // @ts-ignore
    config.headers['Authorization'] = `Bearer ${temp?.token}`;//每次请求实时获取token
    // @ts-ignore
    config.headers['Accept-Language'] = local?.lang || 'zh-CN';//每次请求实时获取语言
    return config
  },
  error => {
    return error(error.response.status)
  }
)
// 响应拦截器
service.interceptors.response.use(
  // @ts-ignore
  (response) => {
    if(response?.data?.code != 1) {
      Message.clear()
      Message.warning({ content: response.data.msg || '系统异常' })
    }
    return {
      code:response?.data?.code || 0,
      msg:response?.data?.msg || '请求成功',
      data:response?.data?.data
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          window.location.hash = 'login'
          break;
      }
    }
    Message.clear()
    Message.warning({ content: error?.response?.data?.msg || '系统异常' })
    return {
      code:0,
      msg:error.message,
      data:{}
    }
  }
)




// get请求
export function get<T>(url:string, params?: object, _object = {}):Promise<types.IResponseData<T>> {
  // return service.get(url, {params})
  return service.get(url, {params, ..._object})
}
// post请求
export function post<T>(url:string, params?: object, _object = {}):Promise<types.IResponseData<T>> {
  // return service.post(url, params)
  return service.post(url, params, _object)
}
// put请求
export function put<T>(url:string, params?: object, _object = {}):Promise<types.IResponseData<T>> {
  return service.put(url, params, _object)
}
// delete请求
export function del<T>(url:string, params?: object, _object = {}):Promise<types.IResponseData<T>> {
  return service.delete(url, {params, ..._object})
}