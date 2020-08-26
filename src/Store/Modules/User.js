import { SET_USER_NAME, SET_USER_AVATAR, SET_ROLES, SET_PERMISSIONS } from '../MutationTypes'
import { login, logout, getUserInfo } from '@/Apis/Login'

const user = {
   state: {
      name: '',
      avatar: '',
      roles: [],
      permissions: []
   },

   mutations: {
      [SET_USER_NAME]: (state, name) => {
         state.name = name
      },
      [SET_USER_AVATAR]: (state, avatar) => {
         state.avatar = avatar
      },
      [SET_ROLES]: (state, roles) => {
         state.roles = roles
      },
      [SET_PERMISSIONS]: (state, permissions) => {
         state.permissions = permissions
      }
   },

   actions: {
      // 登录
      Login ({ dispatch }, userInfo) {
         const username = userInfo.username.trim()
         const password = userInfo.password
         const code = userInfo.code
         const uuid = userInfo.uuid

         return new Promise((resolve, reject) => {
            login(username, password, code, uuid).then(res => {
               dispatch('storeToken', res.token)
               resolve()
            }).catch(error => {
               reject(error)
            })
         })
      },

      // 获取用户信息
      GetUserInfo ({ commit, state }) {
         return new Promise((resolve, reject) => {
            getUserInfo(state.token).then(res => {
               const user = res.user
               const avatar = user.avatar === '' ? require('@/Assets/Images/Profile.png') : process.env.VUE_APP_BASE_API + user.avatar

               if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                  commit(SET_ROLES, res.roles)
                  commit(SET_PERMISSIONS, res.permissions)
               } else {
                  commit(SET_ROLES, ['ROLE_DEFAULT'])
               }

               commit(SET_USER_NAME, user.userName)
               commit(SET_USER_AVATAR, avatar)
               resolve(res)
            }).catch(error => {
               reject(error)
            })
         })
      },

      // 退出系统
      LogOut ({ state, commit, dispatch }) {
         return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
               dispatch('storeToken', '')
               commit(SET_ROLES, [])
               commit(SET_PERMISSIONS, [])
               resolve()
            }).catch(error => {
               reject(error)
            })
         })
      },

      // 前端 登出
      FedLogOut ({ dispatch }) {
         return new Promise(resolve => {
            dispatch('storeToken', '')
            resolve()
         })
      }
   },

   getters: {
      avatar: state => state.avatar
   }
}

export { user }
