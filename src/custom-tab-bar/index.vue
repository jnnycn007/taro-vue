<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Taro from '@tarojs/taro'
import { useSelectedStore } from '@/stores/selected'
import { IconFont } from '@nutui/icons-vue-taro'

const systemInfo = Taro.getSystemInfoSync() // 获取系统信息
const theme:'light'|'dark' = systemInfo.theme || 'light'
console.log('systemInfo', systemInfo)
console.log('theme', theme)

const store = useSelectedStore()
const { selected } = storeToRefs(store)
const themeStyle = {
  light: {
    color: '#AAAAAA',
    activeColor: '#000000',
    backgroundColor: '#F9F9F9'
  },
  dark: {
    color: '#AAAAAA',
    activeColor: '#F5F5F5',
    backgroundColor: 'rgba(0, 0, 0, .65)'
  }
}
const tabBarList = [
  {
    text: 'Home',
    icon: 'home',
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
  <view class="m-tab-bar" :style="`background-color: ${themeStyle[theme].backgroundColor};`">
    <view
      class="m-tab-bar-item"
      v-for="(tabBar, index) in tabBarList" :key="index"
      @tap="switchTab(index, tabBar.url)">
      <IconFont class="u-icon" :name="tabBar.icon" v-show="selected === index" :color="themeStyle[theme].activeColor" />
      <IconFont class="u-icon" :name="tabBar.icon" v-show="selected !== index" :color="themeStyle[theme].color" />
      <text class="u-view" :style="{ color: selected === index ? themeStyle[theme].activeColor : themeStyle[theme].color }">{{ tabBar.text }}</text>
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
  z-index: 999;
  .m-tab-bar-item {
    flex: 1;
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
