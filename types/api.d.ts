/**
 * 空定义
 */
declare type ApiEmpty = undefined | null;

/**
 * 客户唯一标识
 */
declare type RefId = string;

declare interface ApiCommonPagiation {
  currentPage: number
  pageSize: number
  orderBy: string
  xsc: 'ASC' | 'DESC'
}

interface ApiCommonPagiationResponseSort {
  sorted: boolean
  unsorted: boolean
}

interface ApiCommonPagiationResponsePageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: ApiCommonPagiationResponseSort
  unpaged: boolean
}

declare interface ApiCommonPagiationResponse {
  first: boolean | ApiEmpty
  last: boolean | ApiEmpty
  number: number | ApiEmpty
  numberOfElements: number | ApiEmpty
  pageable: ApiCommonPagiationResponsePageable | ApiEmpty
  size: number | ApiEmpty
  sort: ApiCommonPagiationResponseSort | ApiEmpty
  totalElements: number | ApiEmpty
  totalPages: number | ApiEmpty
}
