<template>
  <div class="about">
    <el-button @click="handleClickOpenDb">open idb</el-button>
    <el-button @click="handleClickAddData">add</el-button>
    <el-button>put</el-button>
    <el-button>get</el-button>
    <el-button>delete</el-button>
    <el-button @click="handleClickGetAll">getAll</el-button>
    <el-button @click="handleClickGetFromIndex">getFromIndex</el-button>
    <el-button @click="handleClickClear">Thanos-enhance</el-button>
    <div>
      <el-table :data="tableData" stripe style="width: 100%" @row-dbclick="handleClickDesc">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="name" label="工程" width="180"></el-table-column>
        <el-table-column prop="version" label="版本" width="180"></el-table-column>
        <el-table-column prop="subName" label="子工程"></el-table-column>
        <el-table-column prop="pressTime" label="发布时间">
          <template slot-scope="scope">
            {{ scope.row.pressTime |  dateShowFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="bugCount" label="缺陷数量">
          <template slot-scope="scope">
            {{ scope.row.statistics.bug[0] }} / {{ scope.row.statistics.bug[1] }}
          </template>
        </el-table-column>
        <el-table-column prop="featCount" label="特性数量">
          <template slot-scope="scope">
            {{ scope.row.statistics.feat[0] }} / {{ scope.row.statistics.feat[1] }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | projectStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickDesc(scope.row)">详情</el-button>
            <el-button type="text" @click="handleClickPut(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleClickDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import dbUtil from '@/js/db/index'
import { objArrByKey } from '@/js/util/index.js'
import { PROJECT_STATUS, TODO_STATUS_ENUM, TODO_TYPE_ENUM } from '@/js/enum/todoEnums.js'

export default {
  name: 'ProjectList',
  data () {
    return {
      handlingTodoArr: [TODO_STATUS_ENUM.new, TODO_STATUS_ENUM.develop],
      projectStatusObj: objArrByKey(PROJECT_STATUS),
      db: null,
      tableData: []
    }
  },
  filters: {
  },
  methods: {
    handleClickPut (projectInfo) {
      this.$router.push({
        name: 'projectAddOrEdit',
        params: {
          mode: 'put'
        },
        query: {
          id: projectInfo.id
        }
      })
    },
    handleClickDesc (projectInfo) {
      this.$router.push({
        name: 'projectAddOrEdit',
        params: {
          mode: 'get'
        },
        query: {
          id: projectInfo.id
        }
      })
    },
    async handleClickOpenDb () {
      this.db = await dbUtil.openSingle()
    },
    handleClickAddData () {
      this.$router.push({
        name: 'projectAddOrEdit'
      })
    },
    getTodoStatistics (todos) {
      const ret = {
        feat: [0, 0],
        bug: [0, 0],
        default: [0, 0]
      }

      todos.forEach(todo => {
        let todoTypeLiteral = 'default'
        if (+todo.type === +TODO_TYPE_ENUM.feat) {
          todoTypeLiteral = 'feat'
        } else if (+todo.type === +TODO_TYPE_ENUM.bug) {
          todoTypeLiteral = 'bug'
        }

        if (this.handlingTodoArr.indexOf(todo.status) !== -1) {
          ret[todoTypeLiteral][0]++
          ret[todoTypeLiteral][1]++
        } else {
          ret[todoTypeLiteral][1]++
        }
      })

      return ret
    },
    async handleClickGetAll () {
      const data = await this.$db.getAll('projectBaseInfo')
      const dataFinalPromise = data.map(async project => {
        const todo = await this.$db.getAllFromIndex('todo', 'projectId', project.id)
        const statistics = this.getTodoStatistics(todo)
        return {
          ...project,
          statistics
        }
      })

      await Promise.all(dataFinalPromise)

      this.tableData = await Promise.all(dataFinalPromise)
      console.log(data)
    },
    async handleClickDelete (row) {
      await this.$db.delete('projectBaseInfo', row.id)
      this.handleClickGetAll()
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
  },
  created () {
    this.handleClickGetAll()
  }
}
</script>
