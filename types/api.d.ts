/**
 * 空定义
 */
declare type ApiEmpty = undefined | null;

declare interface ApiCommonPagiation {
  curPage?: number
  pageSize?: number
  order?: string
  orderType?: 'ASC' | 'DESC'
}

declare interface ApiCommonPagiationResponse {
  count: number
  curPage: number
  pageSize: number
}
