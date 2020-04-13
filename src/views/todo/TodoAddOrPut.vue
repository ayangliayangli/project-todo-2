<template>
  <div class="g--mg-10 g--overflow-auto g--height--100vh">
    <div class="g--display-flex">
      <div class="g--flex-1"></div>
      <div>
        <el-button type="primary" @click="handleClickSave">保存</el-button>
      </div>
    </div>

    <!-- form -->
    <el-form :model="formModel" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-select v-model="formModel.type" >
              <el-option v-for="option of todoTypeOptions" :key="option.value" :value="option.value" :label="option.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="formModel.status" >
              <el-option v-for="option of todoStatusOptions" :key="option.value" :value="option.value" :label="option.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="标题">
            <el-input v-model="formModel.title" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="描述">
            <el-input
              v-model="formModel.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="创建时间">
            <span>{{ formModel.createdTime | dateShowFilter }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新时间">
            <span>{{ formModel.updatedTime | dateShowFilter }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">更新记录</el-divider>
      <el-button type="text" @click="handleClickAddLog">新增记录</el-button>

      <el-row>
        <el-col :span="24">
          <el-form-item label="日志">
            <div>
              <div v-for="(log, index) of formModel.logs" :key="log.id" class="g--normal-border-shadow g--mg-10">
                <template>
                  <el-input v-if="log.isNew" v-model="log.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
                  <div v-else>{{ log.desc }}</div>
                </template>
                <span>更新时间： {{ log.updatedTime | dateShowFilter }}</span>
                <span> </span>
                <el-button type="text" @click="handleClickDeleteLog(index)">删除</el-button>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import { TODO_TYPE, TODO_STATUS } from '@/js/enum/todoEnums.js'
import dayjs from 'dayjs'

export default {
  props: {
    todo: {
      type: Object,
      default () {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'add',
      validator (val) {
        return ['add', 'put', 'get', 'delete'].indexOf(val) !== -1
      }
    }
  },
  data () {
    return {
      todoTypeOptions: TODO_TYPE,
      todoStatusOptions: TODO_STATUS,
      formModel: {
        projectId: '',
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
    }
  },
  computed: {
    isAddOrPut () {
      return this.mode === 'add' || this.mode === 'put'
    }
  },
  watch: {
    todo: {
      handler (val, oldVal) {
        this.formModel = val
      },
      immediate: true
    }
  },
  methods: {
    async handleClickSave () {
      const formModel = this.formModel
      const logsNew = formModel.logs.map(({ isNew, ...rest }) => {
        return rest
      })
      formModel.logs = logsNew

      try {
        if (this.mode === 'add') {
          await this.$db.add('todo', formModel)
        } else if (this.mode === 'put') {
          await this.$db.put('todo', formModel)
        }

        this.$message({
          message: `${this.mode} success`,
          type: 'success'
        })

        this.$emit('saveSuccess')
      } catch (err) {
        this.$message({
          message: `${this.mode} error`,
          type: 'error'
        })
      }
    },
    getDefaultLog () {
      return {
        isNew: true,
        title: '',
        desc: '',
        createdTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updatedTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    handleClickDeleteLog (index) {
      this.formModel.logs.splice(index, 1)
    },
    handleClickAddLog () {
      this.formModel.logs.push(this.getDefaultLog())
    },
    init () {
      if (this.mode === 'get' || this.mode === 'put') {
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
</style>
