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
    group: []
  }
}

export const mutations = {
  setUserInfo (state, params) {
    state.userInfo = { ...state.userInfo, ...params }
  },
  setGroup (state, params) {
    state.group = params
  }
}
