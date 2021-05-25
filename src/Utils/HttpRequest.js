import axios from 'axios'
import store from '@/Store'
import exception from '@/Utils/Exceptions'
import loadingBar from '@/Plugins/LoadingBar/Index'

let hideError = false

// 创建axios实例
const http = axios.create({
   baseURL: process.env.VUE_APP_BASE_API, // api的base_url
   timeout: 60000 // 请求超时时间
})

// 请求拦截器
http.interceptors.request.use(config => {
   if (!config.headers.noLoading) {
      loadingBar.start()
   }

   if (store.state.token.token) {
      config.headers.Authorization = 'BasicAuth ' + store.state.token.token
   }

   if (config.data && config.data.hideError) {
      hideError = true
   } else {
      hideError = false
   }

   return config
}, err => {
   if (hideError) {
      loadingBar.error()
   } else {
      exception(-9999)
   }
   return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(response => {
   // 过滤文件流格式
   if (
      response.headers['content-type'] === 'application/octet-stream' ||
      response.headers['content-type'] === 'image/Jpeg'
   ) {
      loadingBar.finish()
      return Promise.resolve(response.data)
   }

   if (response.data.Code === 1) {
      loadingBar.finish()
      return Promise.resolve(response.data)
   } else {
      if (hideError) {
         loadingBar.error()
      } else {
         exception(response.data.Code, response.data.Message)
      }

      const errorData = {
         ...response.data,
         errorUrl: response.request.responseURL
      }

      return Promise.reject(errorData)
   }
}, err => {
   if (hideError) {
      loadingBar.error()
   } else {
      if (err.response) {
         exception(err.response.status, '', false)
      } else {
         exception(-504, '', false)
      }
   }

   const errorData = {
      ...err,
      errorUrl: err.config ? err.config.url : ''
   }

   return Promise.reject(errorData)
})

/**
 * http请求
 * @param {url} 请求地址
 * @param {data} 请求数据
 * @param {type} 请求类型 GET POST,默认值：GET
 * @param {options} 请求配置
 */
class Request {
   $ajax (url, data = {}, { type = 'GET', options = {} } = {}) {
      this.url = url
      this.type = type.toLocaleUpperCase().trim()
      this.data = this.type === 'GET' ? { params: data } : data
      this.options = options

      switch (this.type) {
      case 'GET': {
         return new Promise((resolve, reject) => {
            const config = Object.assign(this.data, this.options)
            http.get(this.url, config)
               .then(response => {
                  // 图片
                  if (response instanceof Blob) {
                     return resolve(response)
                  }

                  return resolve(response.Data)
               })
               .catch(err => {
                  log(err)
                  return reject(err)
               })
         })
      }
      case 'POST': {
         return new Promise((resolve, reject) => {
            http.post(this.url, this.data, this.options)
               .then(response => {
                  // blob类型
                  if (response instanceof Blob) {
                     return resolve(response)
                  }

                  return resolve(response.Data)
               })
               .catch(err => {
                  log(err)
                  return reject(err)
               })
         })
      }
      case 'PUT': {
         return new Promise((resolve, reject) => {
            http.put(this.url, this.data, this.options).then(response => {
               return resolve(response)
            }).catch(err => {
               log(err)
               return reject(err)
            })
         })
      }
      case 'DELETE': {
         return new Promise((resolve, reject) => {
            http.delete(this.url, this.options).then(response => {
               return resolve(response)
            }).catch(err => {
               log(err)
               return reject(err)
            })
         })
      }
      }

      function log (err) {
         console.group('%c错误信息：', 'color:red;')
         const keys = Object.keys(err)
         if (keys.length) {
            keys.forEach(key => console.log(`%c ${key}:`, 'font-size:16px;', err[key]))
         } else {
            console.log(`%c error:`, 'font-size:16px;', err)
         }
         console.groupEnd()
      }
   }

   $http () {
      return http
   }

   $get (url, data = {}, options = {}) {
      return this.$ajax(url, data, { options: options })
   }

   $post (url, data = {}, options = {}) {
      return this.$ajax(url, data, { type: 'POST', options: options })
   }

   $put (url, data = {}, options = {}) {
      return this.$ajax(url, data, { type: 'PUT', options: options })
   }

   $delete (url, options = {}) {
      return this.$ajax(url, {}, { type: 'DELETE', options: options })
   }
}

export default new Request()
