import variables from '@/Assets/Style/ElementVariables.less'

const state = {
   theme: variables.theme
}

const mutations = {
   CHANGE_SETTING: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
         state[key] = value
      }
   }
}

const actions = {
   changeSetting ({ commit }, data) {
      commit('CHANGE_SETTING', data)
   }
}

const getters = {
   theme: state => state.theme
}

export const settings = {
   state,
   mutations,
   actions,
   getters
}
