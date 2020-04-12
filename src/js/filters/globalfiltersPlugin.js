import * as commonFilters from './common.js'

export default {
  install (vm) {
    Object.entries(commonFilters).forEach(([name, func]) => {
      vm.filter(`${name}Filter`, func)
    })
  }
}
