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
  const { url, method, data, header, args: { timeout = 6000, loadingTitle = '', toastDuration = 1500 } } = params
  Taro.showLoading({
    title: loadingTitle,
    mask: true
  })
  return new Promise(resolve =>{
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
        Taro.hideLoading()
        console.log('success', res)
        if (res.data.message.code === 0) { // 具体参考接口响应的数据结构定义
          if (Array.isArray(res.data.data)) {
            resolve(res.data.data)
          } else {
            resolve({...res.data.data, success: true })
          }
        } else {
          console.log('message', res.data.message.message)
          resolve({ message: res.data.message.message, success: false })
          showError(res.data.message.message, toastDuration)
        }
      },
      fail: (res) => {
        Taro.hideLoading()
        console.log('fail', res)
        resolve({ message: res, success: false })
        showError('请求失败', toastDuration)
      },
      complete: (res: any) => { // 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log('complete', res)
      }
    }).catch(e => {
      Taro.hideLoading()
      console.log('catch err', e)
      resolve({ message: e.errMsg, success: false })
      showError(e.errMsg, toastDuration)
    })
  })
}
function showError (message: string, duration = 1500) {
  Taro.showToast({
    title: message,
    icon: 'none', // 'error' 'success' 'loading' 'none'
    duration: duration
  })
}