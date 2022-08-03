import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }

export function getUserInfo(params) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params
  })
}
export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'get',
    params
  })
}

export function saveUserInfo(data) {
  return request({
    url: '/user/saveUserInfo',
    method: 'post',
    data
  })
}

export function deleteUserInfo(data) {
  return request({
    url: '/user/deleteUserInfo',
    method: 'post',
    data
  })
}
