<script setup lang="ts">
import Image1 from '@/images/1.jpeg'
import Image2 from '@/images/2.jpeg'
import Image3 from '@/images/3.jpeg'
const swiperList = [
  {
    src: Image1
  },
  {
    src: Image2
  },
  {
    src: Image3
  }
]
</script>
<template>
  <swiper
    class='m-swiper'
    indicator-color='#999'
    indicator-active-color='#333'
    :vertical="true"
    :circular="true"
    :indicator-dots="true"
    :autoplay="true"
  >
    <swiper-item v-for="(image, index) in swiperList" :key="index">
      <image :src="image.src" />
    </swiper-item>
  </swiper>
</template>
<style lang="less">
.m-swiper {
  width: 100%;
  height: 380px;
}
</style>
