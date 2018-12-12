import Vue from 'vue'

const synchronizationStatus = store => {
  console.log('store plugins')
  const userInfo = JSON.parse(Vue.localStorage.get('userInfo'))
  const group = JSON.parse(Vue.localStorage.get('group'))
  const login = JSON.parse(Vue.localStorage.get('login'))

  if (userInfo) {
      store.commit('setUserInfo', userInfo)
  }
  if (group) {
      store.commit('group', group)
  }
  if (login) {
      store.commit('login', login)
  }
}

export default {
  plugins: []
}