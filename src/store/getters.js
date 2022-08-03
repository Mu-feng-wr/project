const getters = {
  sex: state => state.user.sex,
  type: state => state.user.type,
  user: state => state.user.user,
  userName: state => state.user.userName,
  userId: state => state.system.userId,
  token: state => state.system.token
}
export default getters
