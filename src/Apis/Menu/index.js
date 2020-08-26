import request from '@/Utils/HttpRequest'

export default function getRouters (params) {
   return request.$post('', params)
}
