import fetch from '../core/fetch'

export function getGroupList (params = {}) {
  return fetch({
    url: '/findAllGroupInfo',
    method: 'post',
    data: params
  })
}
