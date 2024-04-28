<script setup lang="ts">
import { ref } from 'vue'
// import NutCarousel from '@/components/NutCarousel.vue'

const images = ref([
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section1x760.jpg?'
  },
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section2x760.jpg?'
  },
  {
    src: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section4x760.jpg?'
  }
])
</script>
<template>
  <NutCarousel :images="images" />
</template>
