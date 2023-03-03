const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@id',
    'type|1-4': 4,
    // 'type|1': ['1', '2', '3', '4'],
    title: '@title(2, 5)',
    content: '@paragraph(1, 5)',
    createtime: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/record/list',
    type: 'get',
    response: config => {
      const { type, title, startTime, endTime, page = 1, limit = 5 } = config.query
      const mockList = List.filter(item => {
        if (type && item.type !== Number(type)) return false
        if (title && item.title.indexOf(title) < 0) return false
        if (startTime && new Date(item.createtime) < new Date(startTime)) return false
        if (endTime && new Date(item.createtime) > new Date(endTime)) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/record/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const record of List) {
        if (record.id === +id) {
          return {
            code: 20000,
            data: record
          }
        }
      }
    }
  },
  {
    url: '/vue-admin-template/record/delete',
    type: 'post',
    response: config => {
      const data = config.body
      for (const id of data) {
        const index = List.findIndex(item => item.id === id)
        List.splice(index, 1)
      }
      return {
        code: 20000,
        data: null,
        message: '操作成功'
      }
    }
  },
  {
    url: '/vue-admin-template/record/create',
    type: 'post',
    response: config => {
      const data = config.body
      List.push({
        id: Mock.mock('@id'),
        createtime: new Date(),
        ...data
      })
      return {
        code: 20000,
        data: 'success',
        message: '操作成功'
      }
    }
  },
  {
    url: '/vue-admin-template/record/update',
    type: 'put',
    response: _ => {
      return {
        code: 20000,
        data: 'success',
        message: '操作成功'
      }
    }
  }
]
