import CryptoJS from 'crypto-js/crypto-js'
const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(process.env.AESKEY).toString())
const iv = CryptoJS.enc.Utf8.parse(
   CryptoJS.MD5(process.env.AESIV)
      .toString()
      .substr(0, 16)
)
const options = {
   iv: iv,
   mode: CryptoJS.mode.CBC,
   padding: CryptoJS.pad.ZeroPadding
}
export function encryption (obj) {
   try {
      const aesResult = CryptoJS.AES.encrypt(JSON.stringify(obj), key, options).toString()
      return aesResult
   } catch (error) {
      return ''
   }
}
export function decryption (str) {
   try {
      const decryptResult = CryptoJS.AES.decrypt(str, key, options)
      const resData = decryptResult.toString(CryptoJS.enc.Utf8) // 因为解析出来是一个字符串，又转换成为字符串，所以需要反序列化两次
      return JSON.parse(resData)
   } catch (error) {
      return null
   }
}
