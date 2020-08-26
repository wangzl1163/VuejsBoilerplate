import request from '@/Utils/HttpRequest'

function getUserProfile (params) {
   return request.$get('', params)
}

function updateUserProfile (params) {
   return request.$post('', params)
}

function updateUserPwd (params) {
   return request.$post('', params)
}

export {
   getUserProfile,
   updateUserProfile,
   updateUserPwd
}
