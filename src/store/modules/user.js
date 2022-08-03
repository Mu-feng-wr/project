
const state = {
  sex: undefined,
  type: undefined,
  user: undefined,
  userName: undefined
}
const mutations = {
  SET_SEX(state, sex) {
    state.sex = sex
  },
  SET_TYPE(state, type) {
    state.type = type
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_USERNAME(state, userName) {
    state.userName = userName
  }
}

export default {
  state,
  mutations
}
