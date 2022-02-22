import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { encryption, decryption } from '../Utils/AES'

import { app } from './Modules/App'
import { token } from './Modules/Token'
import { user } from './Modules/User'
import { permission } from './Modules/Permission'
import { tagsView } from './Modules/TagsView'
import { settings } from './Modules/Settings'

Vue.use(Vuex)

const isDevelopment = process.env.NODE_ENV !== 'production'
const enc = isDevelopment ? (val) => val : encryption
const dec = isDevelopment ? (val) => val : decryption

export default new Vuex.Store({
   strict: isDevelopment,
   plugins: [
      createPersistedState({
         key: 'VueBP',
         storage: {
            setItem: (key, value) => window.sessionStorage.setItem(key, enc(value)),
            getItem: (key) => dec(window.sessionStorage.getItem(key)),
            removeItem: (key) => window.sessionStorage.removeItem(key)
         }
      })
   ],
   modules: {
      app,
      token,
      user,
      permission,
      tagsView,
      settings
   }
})
