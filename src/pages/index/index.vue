<script setup lang="ts">
import Taro, { usePullDownRefresh } from '@tarojs/taro'

usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})
</script>
<template>
  <view>
    <text>首页</text>
    <Swiper />
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
