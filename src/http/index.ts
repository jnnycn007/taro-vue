import { request } from './request'

export function getAction (url: string, parameter = {}, args = {}) {
  return request({
    url: url,
    method: 'GET',
    data: parameter,
    args: args
  })
}
export function postAction (url: string, parameter = {}, args = {}) {
  return request({
    url: url,
    method: 'POST',
    data: parameter,
    args: args,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
