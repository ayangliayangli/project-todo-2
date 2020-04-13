<template>
  <div>
    <el-select
      clearable
      multiple
      collapse-tags
      placeholder="选择过滤状态"
      v-model="formModel.todoStatus"
      @change="handleChangeFilter"
    >
      <el-option v-for="status of todoStatusOptions" :key="status.value" :label="status.label" :value="status.value"></el-option>
    </el-select>
    <el-table :data="tableData" stripe style="width: 100%" @row-dblclick="handleRowDbClickTodoList">
      <el-table-column label="类型" prop="type" width="100">
        <template slot-scope="scope">
          {{ scope.row.type | todoTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="100">
        <div slot="header">状态</div>
        <template slot-scope="scope">
          {{ scope.row.status | todoStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClickTodoDetailBtn(scope.row)">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建世间" prop="createdTime"></el-table-column>
      <el-table-column label="更新时间" prop="updatedTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClickDeleteTodo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 抽屉: todo detail -->
    <el-drawer
      title="TODO 详情"
      direction="rtl"
      :size="'50%'"
      :append-to-body="true"
      :modal-append-to-body="true"
      :destroy-on-close="true"
      :show-close="false"
      :visible.sync="isShowTodoDetail"
    >
      <TodoAddOrPut :mode="mode" :projectId="projectId" :todo="activeTodo" @saveSuccess="handleSaveSuccess"></TodoAddOrPut>
    </el-drawer>
  </div>
</template>

<script>
import TodoAddOrPut from '@/views/todo/TodoAddOrPut.vue'
import { TODO_STATUS } from '@/js/enum/todoEnums.js'
import dayjs from 'dayjs'

export default {
  name: 'TodoList',
  components: {
    TodoAddOrPut
  },
  props: {
    projectId: {
      type: Number || String,
      required: true
    }
  },
  data () {
    return {
      todoStatusOptions: TODO_STATUS,
      activeTodo: {}, // 当前活跃的todo
      mode: 'add',
      isShowTodoDetail: false,
      formModel: {
        todoStatus: []
      },
      tableDataDeepCopy: '',
      tableData: [
        {
          id: 1,
          projectId: 58,
          type: 1,
          title: '创造一个灭霸',
          desc: '创造一个灭霸，消灭一半的数据',
          status: 2,
          createdTime: '2020-02-02 15:00:00',
          updatedTime: '2020-02-03 16:00:00',
          logs: [
            {
              title: 'init log title',
              desc: 'init log description',
              createdTime: '2020-02-03 16:00:00',
              updatedTime: '2020-02-03 16:00:00'
            }
          ]
        }
      ]
    }
  },
  computed: {
    isAddOrPut () {
      return this.mode === 'add' || this.mode === 'put'
    }
  },
  watch: {
    mode: {
      handler (val, oldVal) {
        this.mode = val
      },
      immediate: true
    }
  },
  methods: {
    handleChangeFilter (action) {
      this.filterTodo()
    },
    filterTodo () {
      let ret
      const filters = this.formModel
      const tableData = JSON.parse(this.tableDataDeepCopy)
      if (filters.todoStatus.length === 0) {
        ret = tableData
      } else {
        ret = tableData.filter(todo => {
          return filters.todoStatus.indexOf(todo.status) !== -1
        })
      }

      this.tableData = ret
    },
    getDefaultTodo () {
      return {
        projectId: this.projectId,
        type: 1,
        title: '创造一个灭霸的父亲',
        desc: '创造一个灭霸的父亲，消灭一半的数据',
        status: 1,
        createdTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updatedTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        logs: []
      }
    },
    handleSaveSuccess () {
      this.isShowTodoDetail = false
      this.flushTodo()
      this.$emit('saveSuccess')
    },
    addTodo () {
      this.mode = 'add'
      this.activeTodo = this.getDefaultTodo()
      this.isShowTodoDetail = true
    },
    handleClickTodoDetailBtn (row) {
      this.mode = 'put'
      this.activeTodo = row
      this.isShowTodoDetail = true
    },
    handleClickDeleteTodo (row) {
      this.$confirm('are you sure delete ?', 'tip', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(async () => {
        await this.$db.delete('todo', row.id)
        this.flushTodo()
      }).catch(() => {})
    },
    handleRowDbClickTodoList (val, oldVal) {
      this.mode = 'put'
      this.activeTodo = val
      this.isShowTodoDetail = true
    },
    async flushTodo () {
      const todos = await this.$db.getAllFromIndex('todo', 'projectId', this.projectId)
      console.log('===todos:', todos)
      this.tableData = todos
      this.tableDataDeepCopy = JSON.stringify(todos)
    },
    init () {
      this.flushTodo()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
</style>
