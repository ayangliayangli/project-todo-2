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

/**
 * 下载指定blob, 使用指定的下载名字
 * @param {Blob} blob target blob
 * @param {String} fileName fileName
 */
export function downloadBlob (blob, fileName) {
  const aEl = document.createElement('a')
  if ('download' in aEl) {
    const link = aEl
    link.download = fileName
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)

    document.body.appendChild(aEl)
    link.click()

    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * 把字符串下载为文件
 * @param {String} str 要下载的字符串
 * @param {String} fileName fileName
 */
export function dowloadString (str, fileName = 'untitle.txt') {
  const blob = new Blob([str], { type: 'text/plain' })
  downloadBlob(blob, fileName)
}
