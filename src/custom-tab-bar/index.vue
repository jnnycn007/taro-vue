<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Taro from '@tarojs/taro'
import { useSelectedStore } from '@/stores/selected'
import { IconFont } from '@nutui/icons-vue-taro'

const store = useSelectedStore()
const { selected } = storeToRefs(store)

const color = '#AAAAAA'
const activeColor = '#000000'
const tabBarList = [
  {
    text: 'Home',
    icon: 'JD',
    url: '/pages/index/index'
  },
  {
    text: 'Find',
    icon: 'find',
    url: '/pages/find/index'
  },
  {
    text: 'My',
    icon: 'my',
    url: '/pages/my/index'
  }
]
function switchTab (index: number, url: string) {
  const isUserLoggedIn = Taro.getStorageSync('isUserLoggedIn') || false
  const loginInterception = ['/pages/my/index']
  if (!isUserLoggedIn && loginInterception.includes(url)) {
    Taro.navigateTo({
      url: `/subpackages/login/index?redirect=${encodeURIComponent(url)}&index=${index}`
    })
  } else {
    store.setSelected(index)
    Taro.switchTab({ url })
  }
}
</script>
<template>
  <view class="m-tab-bar">
    <view
      class="m-tab-bar-item"
      v-for="(item, index) in tabBarList" :key="index"
      @tap="switchTab(index, item.url)">
      <IconFont class="u-icon" :name="item.icon" :color="selected === index ? activeColor : color" />
      <text class="u-view" :style="{ color: selected === index ? activeColor : color }">{{ item.text }}</text>
    </view>
  </view>
</template>
<style lang="less">
.m-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100px + env(safe-area-inset-bottom));
  background: #FFFFFF;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  z-index: 999;
  border-top: 1px solid #E3E3E3;
  .m-tab-bar-item {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    .u-icon {
      font-size: 40px;
      width: 68px;
      height: 68px;
    }
    .u-view {
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
    }
  }
}
</style>
