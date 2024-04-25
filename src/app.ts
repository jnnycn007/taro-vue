
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './app.less'
import LOGO from './images/logo.jpg'

interface ShareType {
  from: 'button'|'menu' // 页面内转发按钮 | 右上角转发菜单
  target: object
}
// @ts-ignore
const originPage = Page
console.log('originPage', originPage)
// @ts-ignore
Page = function (pageConfig) {
  console.log('pageConfig', pageConfig)
  // 设置全局默认分享
  const globalShareConfig = {
    onShareAppMessage: (res: ShareType) => {
      console.log('index share', res)
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '纵横命运之上', // 转发标题 当前小程序名称
        // path: '/pages/index/index', // 转发路径，当前页面 path ，必须是以 / 开头的完整路径
        // 使用默认截图 设置转发显示的图片，可以使用网络图片 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持 PNG 及 JPG 。显示图片长宽比是 5:4
        imageUrl: LOGO, // 相对路径图片
        // imageUrl: 'https://image-path.png' // 网络图片
      }
    }
  }
  // 将全局分享配置合并到当前页面的配置中
  const newPageConfig = Object.assign({}, globalShareConfig, pageConfig)
  // 使用原始Page函数创建页面实例
  return originPage(newPageConfig)
}

const pinia = createPinia()
const App = createApp({
  onShow (options) {
    console.log('App onShow', options)
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(pinia)

export default App
