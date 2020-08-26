import request from '@/Utils/HttpRequest'

function login (params) {
   return request.$post('', params)
}

function logout (params) {

}

function getUserInfo (params) {
   return request.$post('', params)
}

function getCodeImg (params) {
   return request.$get('')
}

export {
   login,
   logout,
   getUserInfo,
   getCodeImg
}
