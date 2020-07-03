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

export const login = (data) => request.post(`/login`, data)
export const sysMenu = (data) => request.post(`/sys/menu`, data)
export const addMenu = (data) => request.post(`/sys/addMenu`, data)
export const updateMenu = (data) => request.post(`/sys/updateMenu`, data)
export const remoteMenu = (data) => request.post(`/sys/remoteMenu`, data)


