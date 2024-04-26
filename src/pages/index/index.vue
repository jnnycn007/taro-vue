<script setup lang="ts">
import { ref } from 'vue'
import Taro, { usePullDownRefresh } from '@tarojs/taro'

const images = ref([
  {
    src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrCyyAGpfYACOwAdvw7-U664.jpg'
  },
  {
    src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC0-AN4AuAEG_1BH2UC4235.jpg'
  },
  {
    src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC1-AI8CkACCfeeBYNiY179.jpg'
  },
  {
    src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC22ARxJGACQ2VDqQ37M810.jpg'
  },
  {
    src: 'https://download.jinhui365.cn/group1/M00/06/25/CgABcmYrC3mAVJ4NAFSY1hy3v_g975.jpg'
  }
])
usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})
</script>
<template>
  <view>
    <Carousel :images="images" />
  </view>
</template>
<style lang="less">
.m-image-wrap {
  margin: 20px auto;
  padding: 24px 28px 40px;
  width: 690px;
  height: 349px;
  background: #FFFFFF;
  border-radius: 12px;
  .m-upload-wrap {
    margin-top: 40px;
    .nut-uploader__preview {
      margin-bottom: 0;
      margin-right: 0;
      &:not(:last-child) {
        margin-right: 17px;
      }
    }
  }
}
</style>
