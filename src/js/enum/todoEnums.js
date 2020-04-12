export const TODO_STATUS_ENUM = Object.freeze({
  new: 1, // 新建
  develop: 2, // 开发
  test: 3, // 测试
  check: 4, // 验收
  legacy: 5 // 遗留
})

/**
 * todo 的状态映射表
 */
export const TODO_STATUS = [
  {
    literal: 'new',
    value: 1,
    label: 'new',
    desc: '新建'
  },
  {
    literal: 'develop',
    value: 2,
    label: 'develop',
    desc: '开发'
  },
  {
    literal: 'test',
    value: 3,
    label: 'test',
    desc: '测试'
  },
  {
    literal: 'check',
    value: 4,
    label: 'check',
    desc: '验收'
  },
  {
    literal: 'legacy',
    value: 5,
    label: 'legacy',
    desc: '遗留'
  }
]

export const TODO_TYPE_ENUM = Object.freeze({
  feat: 1, // 特性
  bug: 2, // 缺陷
  style: 3, // 风格
  opt: 4, // 优化
  rebuild: 5 // 重构
})

export const TODO_TYPE = [
  {
    value: 1,
    label: 'feat',
    desc: '特性'
  },
  {
    value: 2,
    label: 'bug',
    desc: '缺陷'
  },
  {
    value: 3,
    label: 'style',
    desc: '风格'
  },
  {
    value: 4,
    label: 'opt',
    desc: '优化'
  },
  {
    value: 5,
    label: 'rebuild',
    desc: '重构'
  }
]

export const PROJECT_STATUS_ENUM = Object.freeze({
  new: 1,
  handling: 2,
  checked: 3,
  legacy: 4
})

/**
 * project 的状态映射表
 */
export const PROJECT_STATUS = [
  {
    value: 1,
    label: 'new'
  },
  {
    value: 2,
    label: 'handling'
  },
  {
    value: 3,
    label: 'checked'
  },
  {
    value: 4,
    label: 'legacy'
  }
]
