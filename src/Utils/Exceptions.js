import loadingBar from '@/Plugins/LoadingBar/Index'
import { Message } from 'element-ui'
const errorMsgs = {
   400: {
      msg: '错误的请求',
      firstLevel: true
   },
   403: {
      msg: '服务器拒绝访问，请检查操作是否合法',
      firstLevel: true
   },
   404: {
      msg: '请求地址不存在',
      firstLevel: true
   },
   405: {
      msg: '您没有权限进行此操作',
      firstLevel: true
   },
   406: {
      msg: '请您保证内容完整后提交',
      firstLevel: true
   },
   429: {
      msg: '请求过于频繁，请稍后再试',
      firstLevel: true
   },
   413: {
      msg: '请求实体过大',
      firstLevel: true
   },
   414: {
      msg: '请求URI过长',
      firstLevel: true
   },
   415: {
      msg: '不支持的媒体类型',
      firstLevel: true
   },
   500: {
      msg: '服务器内部错误，请联系管理员',
      firstLevel: true
   },
   502: {
      msg: '网关错误，请检查您的网络',
      firstLevel: true
   },
   503: {
      msg: '服务器维护中,请稍后重试',
      firstLevel: true
   },
   504: {
      msg: '网络连接超时，请检查您的网络',
      firstLevel: true
   },
   '-504': {
      msg: '请求已经正确到达服务器，但是服务器没有响应',
      firstLevel: true
   }
}
const serviceErrorMsgs = {
   '-9999': {
      msg:
      process.env.NODE_ENV === 'development'
         ? '请求参数有问题，检查去吧，闷骚的程序猿！'
         : '操作失败，请稍后尝试'
   },
   0: {
      msg: '操作失败，请稍后尝试',
      firstLevel: false
   },
   9: {
      msg: '您的登陆已经过期，请重新登录',
      firstLevel: true
   },
   '-10003': {
      msg: '服务器异常，请稍后重试',
      firstLevel: false
   },
   403: {
      msg: '服务器拒绝访问，请检查操作是否合法',
      firstLevel: false
   },
   404: {
      msg: '未找到对应内容',
      firstLevel: false
   },
   405: {
      msg: '您没有权限进行此操作',
      firstLevel: false
   },
   406: {
      msg: '请您保证内容完整后提交',
      firstLevel: false
   },
   429: {
      msg: '请求过于频繁，请稍后再试',
      firstLevel: true
   },
   '-10000': {
      msg: '请求参数错误',
      firstLevel: false
   }
}

const exception = function (errorCode, errorMsg, isServiceError = true) {
   loadingBar.error()
   const error = isServiceError ? serviceErrorMsgs[errorCode + ''] : errorMsgs[errorCode + '']

   if (error) {
      /**
     * 如果错误代码存在并且1级优先
     */
      if (error.firstLevel && error.msg) {
         Message.error(error.msg)
      } else if (!error.firstLevel && errorMsg) {
         Message.error(errorMsg || error.msg)
      }
      if (error.callback) {
         error.callback()
      }
   } else {
      if (errorMsg) {
         Message.error(errorMsg)
      } else {
         Message.error('未知错误')
      }
   }
}

export default exception
