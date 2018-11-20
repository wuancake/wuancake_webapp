import fetch from '../core/fetch'

export function login (params = {}) {
  return fetch({
    url: '/login',
    method: 'post',
    data: params
  })
}

export function signup (params = {}) {
  return fetch({
    url: '/regist',
    method: 'post',
    data: params
  })
}

export function pushEmail (params = {}) {
  return fetch({
    url: '/forget',
    method: 'post',
    data: params
  })
}


export function group (params = {}) {
  return fetch({
    url: '/group',
    method: 'post',
    data: params
  })
}

export function findAllGroupInfo (params = {}) {
  return fetch({
    url: '/findAllGroupInfo',
    method: 'post',
    data: params
  })
}

export function changePassword (params = {}) {
  return fetch({
    url: '/updatePassword',
    method: 'post',
    data: params
  })
}