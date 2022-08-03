export function getToken() {
  return window.localStorage.getItem('token')
}

export function setToken(token) {
  window.localStorage.setItem('token', token)
}

export function removeToken() {
  window.localStorage.setItem('token', '')
}

export function setUserId(userId) {
  window.localStorage.setItem('userId', userId)
}

export function getUserId() {
  return window.localStorage.getItem('userId')
}
export function removeUserId() {
  return window.localStorage.setItem('userId', '')
}
