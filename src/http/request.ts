import Taro from '@tarojs/taro'
import { encryptData } from './encrypt'

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('TARO_APP_PROXY', process.env.TARO_APP_PROXY)
const baseUrl = process.env.TARO_APP_PROXY

interface RequestParams {
  url: string
  method: 'OPTIONS'|'GET'|'HEAD'|'POST'|'PUT'|'PATCH'|'DELETE'|'TRACE'|'CONNECT'
  data: any
  header?: any
  timeout?: number
  loadingTitle?: string
  [key: string]: any
}
export function request (params: RequestParams) {
  const { url, method, data, header, args: { timeout = 6000, loadingTitle = '' } } = params
  Taro.showLoading({
    title: loadingTitle,
    mask: true
  })
  return new Promise((resolve, reject)=>{
    Taro.request({
      data: encryptData(data, method),
      url: baseUrl + url,
      method: method,
      timeout: timeout,
      header: {
        'content-type': 'application/json;charset=UTF-8,text/plain,*/*',
        ...header
      },
      success: (res) => { // 接口调用成功的回调函数
        console.log('success', res)
        if (res.data.message.code === 0) {
          resolve(res.data.data)
        } else {
          console.log('message', res.data.message.message)
          showError(res.data.message.message)
          reject({ message: res.data.message.message })
        }
      },
      fail: (res) => {
        console.log('fail', res)
        showError('请求失败')
        reject({ fail: res })
      },
      complete: (res: any) => { // 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log('complete', res)
        Taro.hideLoading()
      }
    }).catch(e => {
      console.log('catch err', e)
      showError(e.errMsg)
    })
  })
}
function showError (message: string) {
  Taro.showToast({
    title: message,
    icon: 'none', // 'error' 'success' 'loading' 'none'
    duration: 2000
  })
}