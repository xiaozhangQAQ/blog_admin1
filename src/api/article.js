import request from '@/utils/request'

// export function fetchList(query) {
//   return request({
//     url: '/vue-element-admin/article/list',
//     method: 'get',
//     params: query
//   })
// }

// export function fetchArticle(id) {
//   return request({
//     url: '/vue-element-admin/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/vue-element-admin/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/vue-element-admin/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/vue-element-admin/article/update',
//     method: 'post',
//     data
//   })
// }

export const total = (data) => request.post(`http://127.0.0.1:7002/api/home/total`, data)

export const articles = (data) => request.post(`http://127.0.0.1:7002/api/articles`, data)
export const addArticle = (data) => request.post(`http://127.0.0.1:7002/api/addArticle`, data)
export const deleteArticle = (data) => request.post(`http://127.0.0.1:7002/api/deleteArticle`, data)
export const updateArticle = (data) => request.post(`http://127.0.0.1:7002/api/updateArticle`, data)
export const changeStatus = (data) => request.post(`http://127.0.0.1:7002/api/articleChangeStatus`, data)

export const articleCate = (data) => request.post(`http://127.0.0.1:7002/api/articleCate`, data)
export const articleCateAdd = (data) => request.post(`http://127.0.0.1:7002/api/articleCateAdd`, data)
export const articleCateUpdate = (data) => request.post(`http://127.0.0.1:7002/api/articleCateUpdate`, data)
export const articleCateDelete = (data) => request.post(`http://127.0.0.1:7002/api/articleCateDelete`, data)

export const articleLabel = (data) => request.post(`http://127.0.0.1:7002/api/articleLabel`, data)
export const articleLabelAdd = (data) => request.post(`http://127.0.0.1:7002/api/articleLabelAdd`, data)
export const articleLabelUpdate = (data) => request.post(`http://127.0.0.1:7002/api/articleLabelUpdate`, data)
export const articleLabelDelete = (data) => request.post(`http://127.0.0.1:7002/api/articleLabelDelete`, data)
