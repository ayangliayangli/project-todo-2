/**
 * 返回目标的原始类型
 * @param {any} target 要获取类型的目标
 */
export const getOriginType = function (target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

/**
 * 防抖函数 throwtle
 */
export function throwtleWrapper () {
  let timerId = 0
  return function (callback, ctx, delay = 300) {
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId)
      }
      setTimeout(() => {
        timerId = 0
        callback.apply(ctx, args)
      }, delay)
    }
  }
}
