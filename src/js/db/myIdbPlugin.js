import dbUtil from './index'

export default {
  async install (vue) {
    const db = await dbUtil.openSingle()
    vue.prototype.$db = db
  }
}
