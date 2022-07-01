
import { login } from '@/api/system.js'
import { setToken, setUserId } from '@/utils/auth.js'
const state = {
  token: '',
  userId: ''
}

const actions = {
  loginHandler({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        commit('SET_USERID', res.data.userId)
        commit('SET_TOKEN', res.data.token)
        setToken(res.data.token)
        setUserId(res.data.userId)
        resolve()
      }).catch(() => {
        reject()
      })
    })
  }
}
const mutations = {
  SET_USERID(state, userId) {
    state.userId = userId
  },
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export default {
  state,
  mutations,
  actions
}
