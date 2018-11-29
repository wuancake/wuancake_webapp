import fetch from '../core/fetch'

export function submitWeekly (params = {}) {
  return fetch({
    url: '/submit',
    method: 'post',
    data: params
  })
}