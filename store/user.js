import Vue from 'vue'

export const state = () => {
  return {
    userInfo: {
      userId: null,
      userName: '',
      currWeek: null, // 当前周数
      groupId: null,
      groupName: '',
      status: null // 本周是否写周报的状态
    },
    group: [],
    login: {
      email: '',
      password: ''
    },
    title: '午安煎饼计划',
    aside: false, // 控制侧边栏展示
  }
}

export const mutations = {
  setUserInfo (state, params) {
    const data = { ...state.userInfo, ...params }
    state.userInfo = data
    Vue.localStorage.set('userInfo', JSON.stringify(data))
  },
  setGroup (state, params) {
    state.group = params
    Vue.localStorage.set('userInfo', JSON.stringify(params))
  },
  setLogin (state, params) {
    const data = { ...state.login, ...params }
    state.login = data
    Vue.localStorage.set('login', JSON.stringify(data))
  },
  setTitle (state, params) {
    state.title = params
  },
  setAside (state, params) {
    state.aside = params
  },
  clear (state) {
    state.userInfo = {}
    state.group = []
    state.login = {}
    state.aside = false
    Vue.localStorage.remove('userInfo')
    Vue.localStorage.remove('login')
  }
}
