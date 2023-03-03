import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/record/list',
    method: 'get',
    params
  })
}

export function getDetail(params) {
  return request({
    url: '/vue-admin-template/record/detail',
    method: 'get',
    params
  })
}

export function deleteRecord(data) {
  return request({
    url: '/vue-admin-template/record/delete',
    method: 'post',
    data
  })
}

export function createRecord(data) {
  return request({
    url: '/vue-admin-template/record/create',
    method: 'post',
    data
  })
}

export function updateRecord(data) {
  return request({
    url: '/vue-admin-template/record/update',
    method: 'put',
    data
  })
}
