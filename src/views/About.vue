<template>
  <div class="about">
    <el-button @click="handleClickOpenDb">open idb</el-button>
    <el-button @click="handleClickAddData">add</el-button>
    <el-button @click="handleClickGetAll">getAll</el-button>
    <el-button @click="handleClickGetFromIndex">getFromIndex</el-button>
    <el-button @click="handleClickDelete">delete</el-button>
    <el-button @click="handleClickClear">clear</el-button>
    <h1>This is an about page</h1>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="version" label="版本" width="180"></el-table-column>
        <el-table-column prop="name" label="工程" width="180"></el-table-column>
        <el-table-column prop="subName" label="子工程"></el-table-column>
        <el-table-column prop="bugCount" label="缺陷数量"></el-table-column>
        <el-table-column prop="featCount" label="特性数量"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import dbUtil from '@/js/db/index'

export default {
  data () {
    return {
      db: null,
      tableData: [{
        name: 'ifin-ppm',
        subName: 'ppm-jt-web',
        version: '1.1.50',
        bugCount: 10,
        featCount: 10,
        status: 1
      }]
    }
  },
  methods: {
    async handleClickOpenDb () {
      this.db = await dbUtil.openSingle()
    },
    async handleClickAddData () {
      await this.$db.add('projectBaseInfo', {
        name: 'ifin-ppm',
        subName: 'ppm-jt-web',
        version: '1.1.50',
        bugCount: 10,
        featCount: 10,
        status: 1
      })
    },
    async handleClickGetAll () {
      const data = await this.$db.getAll('projectBaseInfo')
      this.tableData = data
      console.log(data)
    },
    async handleClickDelete () {
      console.log('do nothing')
      console.log(this.db, this.$db, this.db === this.$db)
    },
    async handleClickClear () {
      await this.$db.clear('projectBaseInfo')
    },
    async handleClickGetFromIndex () {
      const val = await this.$db.getFromIndex(
        'projectBaseInfo',
        'name',
        'ifin-ppm'
      )
      console.log(val)
    }
  }
}
</script>
