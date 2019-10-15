import { BILL } from './types'
import request, { RequestOpts } from '@/utils/request'
import { StaffItem } from './staff'

export interface BillGetListParams extends ApiCommonPagiation {}

export interface BillStaffInfo {
  staffId: StaffItem['id']
  ratio: number
  name: string
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
}

export interface BillAddStffInfoParams {
  ratio: number
  staffId: StaffItem['id']
}

export interface BillAddParams {
  name: BillItem['name']
  price: BillItem['price']
  staffInfo: BillAddStffInfoParams[]
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
}

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
}

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
}

export interface BillDetailParams {
  id: BillItem['id']
}

export interface BillDetailStaff {
  id: StaffItem['id']
  ratio: number
  name: string
}
export interface BillDetail extends BillItem {
  staffs: BillDetailStaff[]
}

export const apiBillGetDetailById = (params: BillDetailParams, opts?: RequestOpts) => {
  return request<BillDetail>({
    url: `${BILL}/${params.id}`,
    ...opts,
    method: 'get',
    params
  })
}

export interface BillUpdateStatusParams {
  id: BillItem['id']
}

export const apiBillUpdateStautsById = (params: BillUpdateStatusParams, opts?: RequestOpts) => {
  return request<BillHandleResult>({
    url: `${BILL}/updateStatus/${params.id}`,
    ...opts,
    method: 'get'
  })
}
