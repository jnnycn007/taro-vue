<script setup lang="ts">
import Taro, { Events } from '@tarojs/taro'

const events = new Events()

// 监听一个事件，接受参数
events.on('monitorEventA', (arg: any) => {
  // doSth
  console.log('来自页面 A 触发的事件，arg', arg)
  Taro.showToast({
    title: '监听到来自页面A的事件',
    icon: 'none'
  })
})

// 触发一个事件，传参
events.trigger('monitorEventB', true)
events.trigger('monitorEventB', { submit: true })
function onRoute () {
  Taro.navigateTo({
    url: '/subpackages/pageA/index'
  })
}
</script>
<template>
  <view>
    <text>页面B</text>
    <button @tap="onRoute">访问页面A</button>
  </view>
</template>
