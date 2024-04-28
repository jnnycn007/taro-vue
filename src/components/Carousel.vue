<script setup lang="ts">
import { ref } from 'vue'
import Taro from '@tarojs/taro'
interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
}
interface Props {
  images: Image[] // 图片数组
  height?: number // 走马灯宽度 
  autoplay?: boolean // 是否自动切换
  circular?: boolean // 是否采用衔接滑动
  vertical?: boolean // 滑动方向是否为纵向
  interval?: number // 自动切换时间间隔
  duration?: number // 滑动动画时长
  easingFunction?: 'default'|'linear'|'easeInCubic'|'easeOutCubic'|'easeInOutCubic' // 默认缓动函数 线性动画 缓入动画 缓出动画 缓入缓出动画
  indicatorDots?: boolean // 是否显示面板指示点
  indicatorColor?: string // 指示点颜色
  indicatorActiveColor?: string // 当前选中的指示点颜色
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  height: 450,
  autoplay: true,
  circular: true,
  vertical: false,
  interval: 3000,
  duration: 500,
  easingFunction: 'default',
  indicatorDots: true,
  indicatorColor: 'rgba(0, 0, 0, .3)',
  indicatorActiveColor: '#1677FF' // #000000
})
const showPreview = ref(false)

function onPreview () {
  showPreview.value = true
}
function onClose () {
  showPreview.value = false
}
</script>
<template>
  <swiper
    class="m-swiper"
    :style="`height: ${height}rpx;`"
    :interval="interval"
    :autoplay="autoplay"
    :circular="circular"
    :vertical="vertical"
    :duration="duration"
    :easingFunction="easingFunction"
    :indicator-dots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    v-bind="$attrs">
    <swiper-item
      @tap="onPreview"
      v-for="(image, index) in images" :key="index">
      <image class="u-image" :src="image.src" />
    </swiper-item>
  </swiper>
  <nut-image-preview
    :show="showPreview"
    :images="props.images"
    is-Loop
    pagination-visible
    closeable
    close-icon-position="top-left"
    @close="onClose" />
</template>4
<style lang="less">
.m-swiper {
  .u-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
