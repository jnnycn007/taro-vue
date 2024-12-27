<script setup lang="ts">
import { reactive } from 'vue'
import Taro, { useLoad, usePullDownRefresh, useShareAppMessage } from '@tarojs/taro'
import Carousel from '@/components/Carousel.vue'
const images = reactive([
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-Y-Mobile-CN-v2.png'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-3-Mobile-LHD-v2.jpg'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1624,w_750,c_fit,f_auto,q_auto:best/Model-S-homepage-mobile'
  },
  {
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1700,w_800,c_fit,f_auto,q_auto:best/Homepage-Model-X-Mobile-LHD_001'
  }
])
useLoad(() => {
})
usePullDownRefresh(async () => {
  // await getDetail()
  Taro.stopPullDownRefresh()
})
useShareAppMessage((res) => {
  console.log('share', res)
  if (res.from === 'button') {
    // 来自页面内转发按钮
    console.log(res.target)
  }
  return {
    title: '纵横命运之上',
    path: '/pages/index/index'
  }
})
</script>
<template>
  <Carousel :images="images" />
</template>
