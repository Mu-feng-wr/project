import request from '@/utils/request'

export function getBaseData(params) {
  return request({
    url: '/baseData/baseData',
    method: 'get',
    params
  })
}
export function getBaseDataList(params) {
  return request({
    url: '/baseData/baseDataList',
    method: 'get',
    params
  })
}

export function saveBaseData(data) {
  return request({
    url: '/baseData/saveBaseData',
    method: 'post',
    data
  })
}

export function deleteBaseData(data) {
  return request({
    url: '/baseData/deleteBaseData',
    method: 'post',
    data
  })
}
