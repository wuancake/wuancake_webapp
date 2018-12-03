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
    state.userInfo = { ...state.userInfo, ...params }
  },
  setGroup (state, params) {
    state.group = params
  },
  setLogin (state, params) {
    state.login = { ...state.login, ...params }
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

  }
}
