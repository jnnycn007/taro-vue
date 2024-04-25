import Taro from '@tarojs/taro'

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
  const { url, method, data, header, timeout = 6000, loadingTitle = '', ...otherData } = params
  Taro.showLoading({
    title: loadingTitle,
    mask: true
  })
  return new Promise((resolve)=>{
    Taro.request({
      data: data,
      url: baseUrl + url,
      method: method,
      timeout: timeout,
      header: {
        'content-type': 'application/json;charset=UTF-8,text/plain,*/*',
        ...header
      },
      ...otherData,
      success: (res) => { // 接口调用成功的回调函数
        console.log('success', res)
        if (res.data.message.code === 0) {
          resolve(res.data)
        } else {
          console.log('message', res.data.message.message)
          showErrorToast(res.data.message.message)
          resolve({ message: res.data.message.message, success: false })
        }
      },
      fail: (res) => {
        console.log('fail', res)
        showErrorToast('请求失败')
        resolve({ fail: res, success: false })
      },
      complete: (res: any) => { // 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log('complete', res)
        Taro.hideLoading()
      }
    }).catch(e => {
      console.log('catch err', e)
      showErrorToast(e.errMsg)
    })
  })
}
function showErrorToast (message: string) {
  Taro.showToast({
    title: message,
    icon: 'none', // 'error' 'success' 'loading' 'none'
    duration: 2000
  })
}