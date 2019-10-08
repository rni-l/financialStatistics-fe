import { MenuItem } from '../../types/common'

export const checkMatchIndex = (children: MenuItem[], activeIndex: string): boolean => {
  return children.some(item => !!(item.index === activeIndex || (item.children && checkMatchIndex(item.children, activeIndex))))
}

export const formatNumber = (val: any, fixNum = 2) => {
  if (Object.prototype.toString.call(val) !== '[object Number]') return val
  return parseFloat(val.toFixed(fixNum))
}
