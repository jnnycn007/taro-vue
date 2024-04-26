<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import Taro from '@tarojs/taro'
import { useSelectedStore } from '@/stores/selected'
import { Home, Find, My } from '@nutui/icons-vue-taro'

const store = useSelectedStore()
const { selected } = storeToRefs(store)

const systemInfo = Taro.getSystemInfoSync() // 获取系统信息
const theme:'light'|'dark' = systemInfo.theme || 'light'
console.log('theme', theme)

const themeStyle = {
  light: {
    color: '#AAAAAA',
    activeColor: '#000000',
    backgroundColor: '#FFFFFF'
  },
  dark: {
    color: '#AAAAAA',
    activeColor: '#F5F5F5',
    backgroundColor: 'rgba(0, 0, 0, .65)'
  }
}
const tabBarList = [
  {
    title: 'Home',
    icon: h(Home),
    url: '/pages/index/index'
  },
  {
    title: 'Find',
    icon: h(Find),
    url: '/pages/find/index'
  },
  {
    title: 'My',
    icon: h(My),
    url: '/pages/my/index'
  }
]
function switchTab (index: number, url: string) {
  // const isUserLoggedIn = Taro.getStorageSync('isUserLoggedIn') || false
  // const loginInterception = ['/pages/my/index']
  // if (!isUserLoggedIn && loginInterception.includes(url)) {
  //   Taro.navigateTo({
  //     url: `/subpackages/login/index?redirect=${encodeURIComponent(url)}&index=${index}`
  //   })
  // } else {
  store.setSelected(index)
  Taro.switchTab({ url })
  // }
}
</script>
<template>
  <nut-tabbar
    :style="`--backgroundColor: ${themeStyle[theme].backgroundColor};`"
    :unactive-color="themeStyle[theme].color"
    :active-color="themeStyle[theme].activeColor"
    bottom
    safe-area-inset-bottom
    placeholder
    v-model="selected">
    <nut-tabbar-item
      v-for="(tabBar, index) in tabBarList" :key="index"
      :tab-title="tabBar.title"
      :icon="tabBar.icon"
      @tap="switchTab(index, tabBar.url)">
    </nut-tabbar-item>
  </nut-tabbar>
</template>
<style lang="less">
.nut-tabbar {
  background-color: var(--backgroundColor);
}
</style>
