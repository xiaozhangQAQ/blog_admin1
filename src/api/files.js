import request from '@/utils/request'

export const upload = (data) => request.post(`/files/upload`, data ,{"Content-Type":"multipart/form-data"});