import { JOB } from './types';
import request, { RequestOpts } from '@/utils/request';

export interface JobGetListParams extends ApiCommonPagiation {
}

export interface JobItem {
  id: number
  name: string
  code: string
  commissionRatio: number
  salary: number
}

export interface JobItemList extends ApiCommonPagiationResponse {
  list: JobItem[]
}


export const apiJobGetList = (params: JobGetListParams, opts?: RequestOpts) => {
  return request<JobItemList>({
    url: `${JOB}`,
    ...opts,
    method: 'get',
    params
  })
};

export interface JobAddParams {
  name: JobItem['name']
  code: JobItem['code']
  commissionRatio: JobItem['commissionRatio']
  salary: JobItem['salary']
}

export type JobHandleResult = string

export const apiJobAdd = (params: JobAddParams, opts?: RequestOpts) => {
  return request<JobHandleResult>({
    url: `${JOB}`,
    ...opts,
    method: 'post',
    params
  })
};

export interface JobUpdateParams extends JobAddParams {
  id: JobItem['id']
}

export const apiJobUpdate = (params: JobUpdateParams, opts?: RequestOpts) => {
  return request<JobHandleResult>({
    url: `${JOB}/${params.id}`,
    ...opts,
    method: 'put',
    params
  })
};

export interface JobDeleteParams {
  id: JobItem['id']
}

export const apiJobDeleteById = (params: JobDeleteParams, opts?: RequestOpts) => {
  return request<JobHandleResult>({
    url: `${JOB}/${params.id}`,
    ...opts,
    method: 'delete',
    params
  })
};

export interface JobDetailParams {
  id: JobItem['id']
}

export const apiJobGetDetailById = (params: JobDetailParams, opts?: RequestOpts) => {
  return request<JobItem>({
    url: `${JOB}/${params.id}`,
    ...opts,
    method: 'get',
    params
  })
};
