import Taro from '@tarojs/taro'
import { appkeyTest, getSigncodeTest } from './signatureTest'
import { appkeyProd, getSigncodeProd } from './signatureProd'

let appkey
let getSigncode

if (process.env.NODE_ENV === 'production') { // 生产
  appkey = appkeyProd
  getSigncode = getSigncodeProd
} else { // 除生产外均按测试处理
  appkey = appkeyTest
  getSigncode = getSigncodeTest
}

export function encryptData (data: any, method: string) {
  const time = Date.now()
  const token = Taro.getStorageSync('token') || ''
  const uid = Taro.getStorageSync('uid') || ''
  const formData = {
    ...data,
    appkey: appkey,
    timestamp: time,
    token: token,
    uid: uid
  }
  const signcode = getSigncode(formData, method)
  return {
    ...formData,
    signcode: signcode
  }
}