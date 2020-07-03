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

export const total = (data) => request.post(`/home/total`, data)

export const articles = (data) => request.post(`/articles`, data)
export const addArticle = (data) => request.post(`/addArticle`, data)
export const deleteArticle = (data) => request.post(`/deleteArticle`, data)
export const updateArticle = (data) => request.post(`/updateArticle`, data)
export const changeStatus = (data) => request.post(`/articleChangeStatus`, data)

export const articleCate = (data) => request.post(`/articleCate`, data)
export const articleCateAdd = (data) => request.post(`/articleCateAdd`, data)
export const articleCateUpdate = (data) => request.post(`/articleCateUpdate`, data)
export const articleCateDelete = (data) => request.post(`/articleCateDelete`, data)

export const articleLabel = (data) => request.post(`/articleLabel`, data)
export const articleLabelAdd = (data) => request.post(`/articleLabelAdd`, data)
export const articleLabelUpdate = (data) => request.post(`/articleLabelUpdate`, data)
export const articleLabelDelete = (data) => request.post(`/articleLabelDelete`, data)
