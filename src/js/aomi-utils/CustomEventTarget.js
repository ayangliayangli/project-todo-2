// 自定义事件
function CustomEventTarget () {
  this.listeners = []
}

CustomEventTarget.prototype.addEventListener = function (type, callabck) {
  if (!this.listeners[type]) {
    this.listeners[type] = [callabck]
  } else {
    this.listeners[type].push(callabck)
  }
}

CustomEventTarget.prototype.removeEventListener = function (type, callabck) {
  const curListeners = this.listeners[type]
  if (!curListeners || !Array.isArray(curListeners)) {
    return
  }

  this.listeners[type] = curListeners.filter(item => item !== callabck)
}

CustomEventTarget.prototype.dispatch = function (type, event) {
  const curListeners = this.listeners[type]
  if (!curListeners || !Array.isArray(curListeners)) {
    return
  }

  // loop execute all listeners
  curListeners.forEach(item => {
    item(event)
  })
}

export default CustomEventTarget
