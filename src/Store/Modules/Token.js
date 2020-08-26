import { SET_TOKEN } from '../MutationTypes'

export const token = {
   state: {
      token: ''
   },
   mutations: {
      [SET_TOKEN] (state, token) {
         state.token = token
      }
   },
   actions: {
      storeToken ({ commit }, token) {
         commit(SET_TOKEN, token)
      }
   },
   getters: {
      token: (state) => {
         return state.token
      }
   }
}
