<script setup lang="ts">
import { reactive } from 'vue'
import Taro, { useLoad, usePullDownRefresh, useShareAppMessage } from '@tarojs/taro'
import Carousel from '@/components/Carousel.vue'
const images = reactive([
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-2-Hero-Mobile-CN.png'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-2-Redesigned-Mobile.png'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-2-Along-the-Way-Mobile-CN.png'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-2-End-of-Page-Mobile-CN.png'
  }
])
useLoad(() => {
})
usePullDownRefresh(async () => {
  // await getDetail()
  Taro.stopPullDownRefresh()
})
// 自定义页面转发分享
useShareAppMessage((res) => {
  console.log('share', res)
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: 'Tesla',
    path: '/pages/index/index'
  }
})
</script>
<template>
  <Carousel :images="images" />
</template>
