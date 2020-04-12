export function objArrByKey (arr, key = 'value') {
  const ret = {}
  arr.forEach(item => {
    const keyValue = item[key]
    if (!ret[keyValue]) {
      ret[keyValue] = item
    }
  })

  return ret
}

/**
 * let callback execute weith cached
 * @param {function} callback callback function
 * @param {object} context callback execute context
 */
export function cachedFunc (callback, context = this) {
  const cacheData = {}

  return function (...args) {
    const argsId = args.map(item => item.toString()).join()
    if (!cacheData[argsId]) {
      cacheData[argsId] = callback.apply(context, args)
    }

    return cacheData[argsId]
  }
}
