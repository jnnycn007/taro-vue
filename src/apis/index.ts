import { request } from '@/http/request'

export function getAction (url: string, parameter: any) {
  return request({
    url: url,
    method: 'GET',
    data: parameter
  })
}
export function postAction (url: string, parameter: any) {
  return request({
    url: url,
    method: 'POST',
    data: parameter,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

