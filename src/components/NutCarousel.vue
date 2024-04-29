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
  height?: number|string // 轮播卡片的高度
  direction?: 'horizontal'|'vertical' // 轮播方向
  mode?: string // 图片裁剪、缩放的模式，与微信小程序 <image> 标签 mode 属性一致
  loop?: boolean // 是否循环轮播
  duration?: number|string // 动画时长（单位是 ms）
  autoPlay?: number|string // 自动轮播时长，0 表示不会自动轮播
  initPage?: number|string // 初始化索引值
  touchable?: boolean // 是否可触摸滑动
  paginationVisible?: boolean // 分页指示器是否展示
  paginationUnselectedColor?: string // 分页指示器没有选中的颜色
  paginationColor?: string // 分页指示器选中的颜色
  preview?: boolean // 是否开启图片预览
}
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  height: 'calc(100vh - 100rpx - env(safe-area-inset-bottom))',
  direction: 'horizontal',
  mode: 'aspectFill', // 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
  loop: true,
  duration: 500,
  autoPlay: 3000,
  initPage: 0,
  touchable: true,
  paginationVisible: true,
  paginationUnselectedColor: 'rgba(0, 0, 0, .3)',
  paginationColor: '#FF5B29',
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
  <nut-swiper
    :style="`height: ${CarouselHeight};`"
    :direction="direction"
    :loop="loop"
    :duration="duration"
    :auto-play="autoPlay"
    :init-page="initPage"
    :touchable="touchable"
    :pagination-visible="paginationVisible"
    :pagination-unselected-color="paginationUnselectedColor"
    :pagination-color="paginationColor"
    v-bind="$attrs">
    <nut-swiper-item v-for="(image, index) in images" :key="index">
      <view class="m-image" @tap="image.link ? onRoute(image.link) : () => false">
        <image @tap="preview ? onPreview(index) : () => false" class="u-image" :src="image.src" :mode="mode" />
      </view>
      </nut-swiper-item>
  </nut-swiper>
  <nut-image-preview
    v-if="preview"
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
.nut-swiper-pagination .h5-i {
  width: 48px;
  height: 10px;
  border-radius: 6px;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
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
</style>
