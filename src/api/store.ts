import { STORE } from './types';
import request, { RequestOpts } from '@/utils/request';

export interface StoreGetListParams extends ApiCommonPagiation {
}

export interface StoreItem {
  id: number
  name: string
  code: string
  address?: string
  remark?: string
}

export interface StoreItemList extends ApiCommonPagiationResponse {
  list: StoreItem[]
}


export const apiStoreGetList = (params: StoreGetListParams, opts?: RequestOpts) => {
  return request<StoreItemList>({
    url: `${STORE}`,
    ...opts,
    method: 'get',
    params
  })
};

export interface StoreAddParams {
  name: StoreItem['name']
  code: StoreItem['code']
  address?: StoreItem['address']
  remark?: StoreItem['remark']
}

export type StoreHandleResult = string

export const apiStoreAdd = (params: StoreAddParams, opts?: RequestOpts) => {
  return request<StoreHandleResult>({
    url: `${STORE}`,
    ...opts,
    method: 'post',
    params
  })
};

export interface StoreUpdateParams extends StoreAddParams {
  id: StoreItem['id']
}

export const apiStoreUpdate = (params: StoreUpdateParams, opts?: RequestOpts) => {
  return request<StoreHandleResult>({
    url: `${STORE}/${params.id}`,
    ...opts,
    method: 'put',
    params
  })
};

export interface StoreDeleteParams {
  id: StoreItem['id']
}

export const apiStoreDeleteById = (params: StoreDeleteParams, opts?: RequestOpts) => {
  return request<StoreHandleResult>({
    url: `${STORE}/${params.id}`,
    ...opts,
    method: 'delete',
    params
  })
};

export interface StoreDetailParams {
  id: StoreItem['id']
}

export const apiStoreGetDetailById = (params: StoreDetailParams, opts?: RequestOpts) => {
  return request<StoreItem>({
    url: `${STORE}/${params.id}`,
    ...opts,
    method: 'get',
    params
  })
};
