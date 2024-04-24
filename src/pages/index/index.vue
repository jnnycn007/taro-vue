<template>
  <view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Taro, { usePullDownRefresh } from '@tarojs/taro'

usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})
</script>
