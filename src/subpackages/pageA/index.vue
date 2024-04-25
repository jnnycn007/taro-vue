<script setup lang="ts">
import Taro, { Events, useUnload } from '@tarojs/taro'

const pages: any[] = Taro.getCurrentPages()
console.log('pages', pages)
useUnload(() => {
  // if (!['subpackages/order/index'].includes(pages[1].route)) {
  //   Taro.redirectTo({
  //     url: '/subpackages/order/index'
  //   })
  // }
})
const events = new Events()

// 监听一个事件，接受参数
events.on('monitorEventB', (arg: any) => {
  // doSth
  console.log('来自页面 B 触发的事件，arg', arg)
  Taro.showToast({
    title: '监听到来自页面B的事件',
    icon: 'none'
  })
})

// 触发一个事件，传参
events.trigger('monitorEventA', true)
events.trigger('monitorEventA', { submit: true })
function onRoute () {
  Taro.navigateTo({
    url: '/subpackages/pageB/index'
  })
}
</script>
<template>
  <view>
    <text>页面A</text>
    <button @tap="onRoute">访问页面B</button>
  </view>
</template>
