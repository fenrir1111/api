import axios from 'axios'
/* eslint-disable */

const baseURL = 'http://blueapidir.tpaas.youedata.com/'

axios.defaults.baseURL = baseURL
// 获取分类列表
export const getGroupList = params => {
  return axios.get('group/list').then(res => res.data)
}
// 获取分类列表
export const getApiListbygId = params => {
  return axios.get(`group/api/list?groupId=${params}`,params).then(res => res.data)
}
// 添加接口
export const addApi = params => {
  return axios.post('api/add',params,{headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }}).then(res => res.data)
}
// 编辑接口
export const editApi = params => {
  return axios.post('api/modify', params,{headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }}).then(res => res.data)
}
// 删除接口
export const deleteApi = params => {
  return axios.post('api/delete/',params,{headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }}).then(res => res.data)
}
// 编辑id获取接口信息
export const getApiById = params => {
  return axios.post('api/get', params,{headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }}).then(res => res.data)
}
// 获取接口列表
export const getApiList = params => {
  return axios.get('group/api/list').then(res => res.data)
}