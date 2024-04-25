import Taro from '@tarojs/taro'
import { appkey, getSigncode } from './signature'

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