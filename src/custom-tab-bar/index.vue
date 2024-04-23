<script setup lang="ts">
import Taro from '@tarojs/taro'
import { computed }  from 'vue'
import { useStore } from 'vuex'
import { IconFont } from '@nutui/icons-vue-taro'

const store = useStore()
const selectedIndex = computed(() => store.getters.getSelected)

const color = '#AAAAAA'
const activeColor = '#000000'
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
function switchTab (index, url) {
  store.dispatch('setSelected', index)
  Taro.switchTab({ url })
}
</script>
<template>
  <view class="m-tab-bar">
    <view
      class="m-tab-bar-item"
      @tap="switchTab(index, item.url)"
      v-for="(item, index) in tabBarList" :key="index">
      <IconFont class="u-icon" :name="item.icon" :color="selectedIndex === index ? activeColor : color" />
      <text class="u-view" :style="{ color: selectedIndex === index ? activeColor : color }">{{ item.text }}</text>
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
  border-top: 1px solid #E3E3E3;
  .m-tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: flex-start;
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
    }
  }
}
</style>
