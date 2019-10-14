import { BILL } from './types';
import request, { RequestOpts } from '@/utils/request';
import { StaffItem } from './staff';

export interface BillGetListParams extends ApiCommonPagiation {
}

export interface BillStaffInfo {
  staffId: StaffItem['id']
  ratio: number
}

export interface BillItem {
  id: number
  name: string
  price: number
  staffInfo: BillStaffInfo[]
  openDate: number
}

export interface BillItemList extends ApiCommonPagiationResponse {
  list: BillItem[]
}


export const apiBillGetList = (params: BillGetListParams, opts?: RequestOpts) => {
  return request<BillItemList>({
    url: `${BILL}`,
    ...opts,
    method: 'get',
    params
  })
};

export interface BillAddParams {
  name: BillItem['name']
  price: BillItem['price']
  staffInfo: BillItem['staffInfo']
  openDate: BillItem['openDate']
}

export type BillHandleResult = string

export const apiBillAdd = (params: BillAddParams, opts?: RequestOpts) => {
  return request<BillHandleResult>({
    url: `${BILL}`,
    ...opts,
    method: 'post',
    params
  })
};

export interface BillUpdateParams extends BillAddParams {
  id: BillItem['id']
}

export const apiBillUpdate = (params: BillUpdateParams, opts?: RequestOpts) => {
  return request<BillHandleResult>({
    url: `${BILL}/${params.id}`,
    ...opts,
    method: 'put',
    params
  })
};

export interface BillDeleteParams {
  id: BillItem['id']
}

export const apiBillDeleteById = (params: BillDeleteParams, opts?: RequestOpts) => {
  return request<BillHandleResult>({
    url: `${BILL}/${params.id}`,
    ...opts,
    method: 'delete',
    params
  })
};

export interface BillDetailParams {
  id: BillItem['id']
}

export const apiBillGetDetailById = (params: BillDetailParams, opts?: RequestOpts) => {
  return request<BillItem>({
    url: `${BILL}/${params.id}`,
    ...opts,
    method: 'get',
    params
  })
};
