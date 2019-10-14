import { ADMIN_USER } from './types';
import request, { RequestOpts } from '@/utils/request';
import store from '@/store'

export interface AdminUserLoginParams {
  name: string
  password: string
}

export interface AdminUserInfo {
  id: number
  name: string
  createdTime: string
  status: number
}

export const apiAdminUserLogin = (params: AdminUserLoginParams, opts?: RequestOpts) => {
  return request<AdminUserInfo>({
    url: `${ADMIN_USER}/login`,
    ...opts,
    params
  }).then(res => {
    if (res.isSuccess) {
      store.commit('updateUserInfo', res.data)
    }
    return res
  })
};