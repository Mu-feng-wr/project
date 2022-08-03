import request from '@/utils/request'

export function getBookData(params) {
  return request({
    url: '/bookKeeping/bookData',
    method: 'get',
    params
  })
}
export function getBookList(params) {
  return request({
    url: '/bookKeeping/bookList',
    method: 'get',
    params
  })
}

export function saveBookData(data) {
  return request({
    url: '/bookKeeping/saveBookData',
    method: 'post',
    data
  })
}

export function deleteBookData(data) {
  return request({
    url: '/bookKeeping/deleteBookData',
    method: 'post',
    data
  })
}
export function getBookStatistics(params) {
  return request({
    url: '/bookKeeping/statistics',
    method: 'get',
    params
  })
}
