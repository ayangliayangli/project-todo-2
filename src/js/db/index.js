import { openDB } from 'idb'

const DB_CONFIG = {
  name: 'todoDb',
  version: '1.3',
  stores: [
    {
      name: 'projectBaseInfo',
      indexNames: ['name', 'version']
    },
    {
      name: 'todo',
      indexNames: ['projectId']
    }
  ]
}

async function open () {
  return openDB(DB_CONFIG.name, DB_CONFIG.version, {
    async upgrade (db) {
      console.log('首次打开， 初始化表格')
      // 初始化表格
      DB_CONFIG.stores.forEach(({ name, indexNames }) => {
        const storeInstance = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
        indexNames.forEach(name => {
          storeInstance.createIndex(name, name)
        })
      })
    },
    blocked (db) {
      console.log('别人已经打开了')
      db.close()
    },
    blocking (db) {
      console.log('有人尝试打开哦')
      db.close()
    },
    terminated (db) {
      console.log('非正常关闭')
      db.close()
    }
  })
}

const openSingle = (function () {
  let db = null
  return async function () {
    if (!db) {
      db = await open()
    }

    return db
  }
})()

export default {
  open,
  openSingle
}
