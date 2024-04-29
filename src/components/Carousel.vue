<script setup lang="ts">
import Taro from '@tarojs/taro'
import { ref, computed } from 'vue'

interface Image {
  title?: string // 图片名称
  src: string // 图片地址
  link?: string // 图片跳转链接
}
interface Props {
  images: Image[] // 图片数组
  height?: number|string // 走马灯宽度 
  mode?: string // 图片裁剪、缩放的模式，与微信小程序 <image> 标签 mode 属性一致
  autoplay?: boolean // 是否自动切换
  circular?: boolean // 是否采用衔接滑动
  vertical?: boolean // 滑动方向是否为纵向
  interval?: number // 自动切换时间间隔
  duration?: number // 滑动动画时长
  easingFunction?: 'default'|'linear'|'easeInCubic'|'easeOutCubic'|'easeInOutCubic' // 默认缓动函数 线性动画 缓入动画 缓出动画 缓入缓出动画
  indicatorDots?: boolean // 是否显示面板指示点
  indicatorColor?: string // 指示点颜色
  indicatorActiveColor?: string // 当前选中的指示点颜色
  preview?: boolean // 是否开启图片预览
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  height: '100vh',
  mode: 'aspectFill', // 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
  autoplay: true,
  circular: true,
  vertical: false,
  interval: 3000,
  duration: 1000,
  easingFunction: 'default',
  indicatorDots: true,
  indicatorColor: 'rgba(0, 0, 0, .3)',
  indicatorActiveColor: '#1677FF', // #000000
  preview: false
})
const CarouselHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'rpx'
  }
  return props.height
})
function onRoute (url: string) {
  Taro.navigateTo({
    url: url
  })
}
const isWeapp = process.env.TARO_ENV === 'weapp'
const showPreview = ref(false)
const showIndex = ref(0)
function onPreview (index: number) {
  showIndex.value = index
  showPreview.value = true
}
function onClose () {
  showPreview.value = false
}
</script>
<template>
  <swiper
    class="m-swiper"
    :style="`height: ${CarouselHeight};`"
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
    <swiper-item v-for="(image, index) in images" :key="index">
      <view class="m-image" @tap="image.link ? onRoute(image.link) : () => false">
        <image @tap="preview ? onPreview(index) : () => false" class="u-image" :src="image.src" :mode="mode" />
      </view>
    </swiper-item>
  </swiper>
  <nut-image-preview
    v-if="isWeapp && preview"
    :init-no="showIndex"
    :show="showPreview"
    :images="props.images"
    is-Loop
    pagination-visible
    closeable
    close-icon-position="top-left"
    @close="onClose" />
</template>
<style lang="less">
.m-swiper {
  max-height: calc(100vh - 100px - env(safe-area-inset-bottom));
  .m-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .u-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
  