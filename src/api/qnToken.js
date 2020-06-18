import request from '@/utils/request'

export function qntoken(params) {
  return request({
    url: '/a/common/qntoken',
    method: 'get',
    params
  })
}

export function uploadToQiniu(data) {
  return request({
    url: 'https://upload-z2.qiniup.com',
    method: 'post',
    ContentType: 'multipart/form-data',
    data
  })
}
