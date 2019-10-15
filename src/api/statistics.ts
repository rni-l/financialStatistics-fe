import { STATISTICS } from './types'
import request, { RequestOpts } from '@/utils/request'

// export const apiStatisticsStaffSalryPath = (opts?: RequestOpts) => {
//   return request<any>({
//     url: `${STATISTICS}/staff/salary`,
//     ...opts,
//     method: 'get'
//   })
// }

export const apiStatisticsStaffSalryPath = `${STATISTICS}/staff/salary`
