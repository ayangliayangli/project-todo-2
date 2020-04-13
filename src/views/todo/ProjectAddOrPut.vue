<template>
  <div>
    <div class="g--margin-5">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">我的项目</el-breadcrumb-item>
        <el-breadcrumb-item>{{ projectBaseInfo }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1>{{ pageTitle }}</h1>
    <!-- 顶部按钮 -->
    <div class="g--display-flex">
      <div class="g--flex-1"></div>
      <el-button type="text" @click="handleClickCancel">返回</el-button>
    </div>
    <!-- add and put -->
    <el-card v-if="isAddOrPut" shadow="always">
      <div slot="header">工程信息</div>
      <div>
        <el-form ref="formModel" :model="formModel" label-width="100px">
          <el-divider content-position="left">基本信息</el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item label="版本">
                <el-input v-model="formModel.version" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工程名称">
                <el-input v-model="formModel.name" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="子工程名称">
                <el-input v-model="formModel.subName" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker style="width: 100%" v-model="formModel.pressTime" placeholder="" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工程状态">
                <el-select v-model="formModel.status">
                  <el-option v-for="(status, index) of projectStatusOptions" :key="index" :value="status.value" :label="status.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="formModel.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider content-position="left">测试信息</el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item label="stg">
                <el-input v-model="formModel.env.stg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号">
                <el-input v-model="formModel.env.testAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="密码">
                <el-input v-model="formModel.env.testAccountPwd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="urls">
                <el-button type="text" @click="handleClickAddUrl">add</el-button>
                <div v-for="(url, index) of formModel.urls" :key="index">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="formModel.urls[index].url" placeholder="url">
                        <el-input slot="prepend" v-model="formModel.urls[index].desc" placeholder="url描述" style="width: 200px"></el-input>
                      </el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-button type="text" @click="handleClickDelUrl(index)">del</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div>
          <el-button v-if="isAddOrPut" type="primary" @click="handleClickSave">保存</el-button>
          <el-button type="text" @click="handleClickCancel">取消</el-button>
        </div>
      </div>
    </el-card>

    <!-- get mode,  详情模式 -->
    <div v-if="mode === 'get'">
      <!-- project base info -->
      <el-card v-if="mode === 'get'">
        <div slot="header">工程信息</div>
        <!-- toggle visibility icon -->
        <div class="g--text-align--left">
          <i :class="{
            'g--cursor-pointer': true,
            'el-icon-caret-right': !isShowProjectBasic,
            'el-icon-caret-bottom': isShowProjectBasic
          }"
          @click="handleClickShowBasicCardToogle"
          ></i>
          <span v-for="([name, value], index) of Object.entries(todoStatistics)" :key="index" class="g--margin-0-5">{{ `${name}:${value[0]}/${value[1]}` }}</span>
        </div>
        <!-- project base info -->
        <div v-if="isShowProjectBasic">
          <el-form ref="formModel" :model="formModel" label-width="100px">
            <el-divider content-position="left">基本信息</el-divider>
            <el-row>
              <el-col :span="8">
                <el-form-item label="版本">
                  <div class="g--text-align--left">{{ formModel.version }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工程名称">
                  <div class="g--text-align--left">{{ formModel.name }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="子工程名称">
                  <div class="g--text-align--left">{{ formModel.subName }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发布时间">
                  <div class="g--text-align--left">{{ formModel.pressTime | dateShowFilter }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述">
                  <div class="g--text-align--left">{{ formModel.desc }}</div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-divider content-position="left">测试信息</el-divider>
            <el-row>
              <el-col :span="8">
                <el-form-item label="stg">
                  <div class="g--text-align--left">{{ formModel.env.stg }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账号">
                  <div class="g--text-align--left">{{ formModel.env.testAccount }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="密码">
                  <div class="g--text-align--left">{{ formModel.env.testAccountPwd }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="urls">
                  <div v-for="(url, index) of formModel.urls" :key="index" class="g--text-align--left">
                    <span>{{ formModel.urls[index].desc }}</span>
                    <span>:</span>
                    <span>{{ formModel.urls[index].url }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </el-card>

      <!-- todo list -->
      <el-card v-if="formModel.id" shadow="always">
        <div slot="header">
          <div class="g--display-flex">
            <div class="g--flex-1">todos</div>
            <div>
              <el-button type="text" @click="handleClickAddTodo">新增</el-button>
            </div>
          </div>

        </div>
        <!-- card body -->
        <div>
          <TodoList :projectId="formModel.id" ref="todoList" @saveSuccess="handleSaveSuccess"></TodoList>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import TodoList from '@/views/todo/TodoList.vue'
import { PROJECT_STATUS, TODO_STATUS_ENUM, TODO_TYPE_ENUM } from '@/js/enum/todoEnums.js'

export default {
  name: 'ProjectAddOrPut',
  components: {
    TodoList
  },
  props: {
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
      handlingTodoArr: [TODO_STATUS_ENUM.new, TODO_STATUS_ENUM.develop],
      projectStatusOptions: PROJECT_STATUS,
      isShowProjectBasic: false,
      todoStatistics: {},
      formModel: {
        status: 1,
        version: '',
        name: '',
        subName: '',
        pressTime: '',
        desc: '',
        env: {
          stg: '',
          testAccount: '',
          testAccountPwd: ''
        },
        urls: [
          {
            url: '',
            desc: ''
          }
        ],
        createdTime: '',
        updatedTime: ''
      }
    }
  },
  computed: {
    projectBaseInfo () {
      return `${this.formModel.subName}@${this.formModel.version}`
    },
    isAddOrPut () {
      return this.mode === 'add' || this.mode === 'put'
    },
    pageTitle () {
      let ret = ''
      if (this.mode === 'add') {
        ret = '新增项目'
      } else if (this.mode === 'put') {
        ret = '编辑项目'
      } else if (this.mode === 'get') {
        ret = '项目详情'
      }

      return ret
    }
  },
  watch: {},
  methods: {
    handleClickAddUrl () {
      this.formModel.urls.push({
        url: '',
        desc: ''
      })
    },
    handleClickDelUrl (index) {
      const urls = this.formModel.urls
      this.formModel.urls = urls.filter((url, _index) => _index !== index)
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

        if (this.handlingTodoArr.indexOf(+todo.status) === -1) {
          ret[todoTypeLiteral][0]++
        }

        ret[todoTypeLiteral][1]++
      })

      return ret
    },
    handleSaveSuccess () {
      this.flushTodoStatistic()
    },
    handleClickAddTodo () {
      this.$refs.todoList.addTodo()
    },
    handleClickShowBasicCardToogle () {
      this.isShowProjectBasic = !this.isShowProjectBasic
    },
    async handleClickSave () {
      if (this.mode === 'add') {
        console.log('===before add:', this.formModel)
        await this.$db.add('projectBaseInfo', this.formModel)
      } else if (this.mode === 'put') {
        console.log('===before put:', this.formModel)
        await this.$db.put('projectBaseInfo', this.formModel)
      }

      this.$router.go(-1)
    },
    handleClickCancel () {
      this.$router.go(-1)
    },
    async flushTodoStatistic () {
      const todos = await this.$db.getAllFromIndex('todo', 'projectId', this.$route.query.id)
      this.todoStatistics = this.getTodoStatistics(todos)
    },
    async loadProjectData () {
      const data = await this.$db.get('projectBaseInfo', this.$route.query.id)
      this.formModel = data
      this.flushTodoStatistic()
    },
    init () {
      if (this.mode === 'get' || this.mode === 'put') {
        this.loadProjectData()
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
