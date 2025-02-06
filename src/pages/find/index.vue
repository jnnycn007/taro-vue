<script setup lang="ts">
import { reactive } from 'vue'
import NutCarousel from '@/components/NutCarousel.vue'
const images = reactive([
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/Ultra_U/m/home_ultra.jpg'
  },
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/Ultra_U/m/ultra_3.jpg'
  },
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/Ultra_U/m/ultra_10.jpg'
  },
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/Ultra_U/m/ultra_15.jpg'
  },
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/Ultra_U/m/ultra_17.jpg'
  }
])
</script>
<template>
  <NutCarousel :images="images" />
</template>
