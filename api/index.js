import fetch from '../core/fetch'

export function login (params = {}) {
  return fetch({
    url: '/login',
    method: 'post',
    data: params
  })
}