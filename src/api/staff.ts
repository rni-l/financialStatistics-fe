import { STAFF } from './types';
import request, { RequestOpts } from '@/utils/request';
import { StoreItem } from './store';
import { JobItem } from './job';

export interface StaffGetListParams extends ApiCommonPagiation {
}

export interface StaffItem {
  id: number
  name: string
  storeCode: string
  jobId: number[]
  bonusRatio: number
  isIgnorePlatform: number
}

export interface StaffItemList extends ApiCommonPagiationResponse {
  list: StaffItem[]
}


export const apiStaffGetList = (params: StaffGetListParams, opts?: RequestOpts) => {
  return request<StaffItemList>({
    url: `${STAFF}`,
    ...opts,
    method: 'get',
    params
  })
};

export interface StaffAddParams {
  name: StaffItem['name']
  storeCode: StaffItem['storeCode']
  jobId: StaffItem['jobId']
  bonusRatio: StaffItem['bonusRatio']
  isIgnorePlatform: StaffItem['isIgnorePlatform']
}

export type StaffHandleResult = string

export const apiStaffAdd = (params: StaffAddParams, opts?: RequestOpts) => {
  return request<StaffHandleResult>({
    url: `${STAFF}`,
    ...opts,
    method: 'post',
    params
  })
};

export interface StaffUpdateParams extends StaffAddParams {
  id: StaffItem['id']
}

export const apiStaffUpdate = (params: StaffUpdateParams, opts?: RequestOpts) => {
  return request<StaffHandleResult>({
    url: `${STAFF}/${params.id}`,
    ...opts,
    method: 'put',
    params
  })
};

export interface StaffDeleteParams {
  id: StaffItem['id']
}

export const apiStaffDeleteById = (params: StaffDeleteParams, opts?: RequestOpts) => {
  return request<StaffHandleResult>({
    url: `${STAFF}/${params.id}`,
    ...opts,
    method: 'delete',
    params
  })
};

export interface StaffDetailParams {
  id: StaffItem['id']
}

export interface StaffDetail extends StaffItem {
  sotreId: StoreItem['id']
  address: StoreItem['address']
  jobs: JobItem[]
}

export const apiStaffGetDetailById = (params: StaffDetailParams, opts?: RequestOpts) => {
  return request<StaffDetail>({
    url: `${STAFF}/${params.id}`,
    ...opts,
    method: 'get',
    params
  })
};
