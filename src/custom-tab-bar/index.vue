<script lang="ts">
  export default {
    options: {
      addGlobalClass: true // 解决tabbar样式隔离导致的<IconFont />图标无法显示问题
    }
  }
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import Taro from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'
import { storeToRefs } from 'pinia'
import { useSelectedStore } from '@/stores/selected'

const store = useSelectedStore()
const { selected } = storeToRefs(store)

const deviceInfo = Taro.getDeviceInfo() // 获取设备基础信息
const windowInfo = Taro.getWindowInfo() // 获取窗口信息
const appBaseInfo = Taro.getAppBaseInfo() // 获取微信APP基础信息
const theme:'light'|'dark' = appBaseInfo.theme || 'light'
console.log('deviceInfo', deviceInfo)
console.log('windowInfo', windowInfo)
console.log('appBaseInfo', appBaseInfo)
console.log('theme', theme)

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
interface TabBar {
  title: string
  icon: string
  url: string
}
const tabBarList = reactive<TabBar[]>([
  {
    title: 'Home',
    icon: 'home',
    url: '/pages/index/index'
  },
  {
    title: 'Find',
    icon: 'find',
    url: '/pages/find/index'
  },
  {
    title: 'My',
    icon: 'my',
    url: '/pages/my/index'
  }
])
function switchTab (index: number, url: string) {
  const isAuthorized = Taro.getStorageSync('isAuthorized') || false
  const authorizeInterception = ['/pages/my/index']
  if (!isAuthorized && authorizeInterception.includes(url)) {
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
      <text class="u-view" :style="{ color: selected === index ? themeStyle[theme].activeColor : themeStyle[theme].color }">{{ tabBar.title }}</text>
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
