<script setup lang="ts">
import Taro, { useRouter, useLoad } from '@tarojs/taro'

const router = useRouter()
console.log('router', router)
const params = router.params
console.log('params', params)

useLoad((options) => {
  console.log('load', options)
})

function getPhoneNumber (e) {
  console.log('e', e)
  console.log('detail', e.detail)
  console.log('code', e.detail.code)
  if (e.detail.code) { // 授权成功
    // onLogin(e.detail) // 调用接口登录
    Taro.showToast({
      title: '授权成功: ' + e.detail.code,
      icon: 'none',
      mask: true
    })
  } else { // 授权失败
    Taro.showToast({
      title: '手机号授权失败',
      icon: 'error',
      mask: true
    })
  }
}
</script>
<template>
  <view>
    <button type="primary" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber">微信一键登录</button>
  </view>
</template>
<style lang="less">
</style>
