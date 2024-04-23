<template>
  <view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
const show = ref(false);

usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})
const click = () => {
  show.value = true;
};
</script>
