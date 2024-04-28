<script setup lang="ts">
import { ref } from 'vue'
import Taro, { useLoad, usePullDownRefresh } from '@tarojs/taro'
import { getAction } from '@/apis/index'
import Carousel from '@/components/Carousel.vue'

const images = ref([
  {
    // src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrCyyAGpfYACOwAdvw7-U664.jpg'
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-Y-Mobile-CN-v2.png'
  },
  {
    // src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC0-AN4AuAEG_1BH2UC4235.jpg'
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-3-Mobile-LHD-v2.jpg'
  },
  {
    // src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC1-AI8CkACCfeeBYNiY179.jpg'
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1624,w_750,c_fit,f_auto,q_auto:best/Model-S-homepage-mobile'
  },
  {
    // src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC22ARxJGACQ2VDqQ37M810.jpg'
    src: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1700,w_800,c_fit,f_auto,q_auto:best/Homepage-Model-X-Mobile-LHD_001'
  }
  // {
  //   src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC3mAVJ4NAFSY1hy3v_g975.jpg'
  // }
])
const url = {
  detail: '/api/activity/getActivityTemplateByKeyWord'
}
useLoad(() => {
  // getDetail()
})
usePullDownRefresh(async () => {
  await getDetail()
  Taro.stopPullDownRefresh()
})
const detailData = ref()
function getDetail () {
  getAction(url.detail, { keyWord: 'collectWine' }).then((res: any) => {
    console.log('detail', res)
    detailData.value = res.data
  }).catch((err) => {
    console.log('err', err)
  })
}
</script>
<template>
  <Carousel :images="images" />
</template>
