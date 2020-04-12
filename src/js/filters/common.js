import dayjs from 'dayjs'
import { objArrByKey } from '@/js/util'
import { PROJECT_STATUS, TODO_STATUS, TODO_TYPE } from '@/js/enum/todoEnums.js'

export function dateShow (val) {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}

export function projectStatus (status) {
  let ret = ''
  // todo 这里每次都要计算一次， 比较昂贵
  // 回头使用一个通用的 cachedFunc 来解决
  const obj = objArrByKey(PROJECT_STATUS, 'value')
  if (obj[status]) {
    ret = obj[status].label
  }
  return ret
}

export function todoStatus (status) {
  let ret = ''
  // todo 这里每次都要计算一次， 比较昂贵
  // 回头使用一个通用的 cachedFunc 来解决
  const obj = objArrByKey(TODO_STATUS, 'value')
  if (obj[status]) {
    ret = obj[status].label
  }
  return ret
}

export function todoType (type) {
  let ret = ''
  // todo 这里每次都要计算一次， 比较昂贵
  // 回头使用一个通用的 cachedFunc 来解决
  const obj = objArrByKey(TODO_TYPE, 'value')
  if (obj[type]) {
    ret = obj[type].label
  }
  return ret
}
