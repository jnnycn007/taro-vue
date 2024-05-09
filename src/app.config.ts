export default defineAppConfig({
  darkmode: true, // 所有基础组件均会根据系统主题展示不同的默认样式，navigation bar 和 tab bar 也会根据下面的配置自动切换
  themeLocation: 'theme.json',
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/index/index',
    'pages/find/index',
    'pages/my/index'
  ],
  subpackages: [
    {
      root: 'subpackages',
      pages: [
        'login/index',
        'pageA/index',
        'pageB/index'
      ]
    }
  ],
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  window: {
    // backgroundColor: '@bgColor', // 窗口的背景色
    backgroundColorTop: '@bgColorTop', // 顶部窗口的背景色，仅 iOS 支持，默认 #ffffff，即loading背景色
    backgroundColorBottom: '@bgColorBottom', // 底部窗口的背景色，仅 iOS 支持，默认 #ffffff
    backgroundTextStyle: '@bgTxtStyle', // 下拉 loading 的样式，仅支持 dark / light，默认 dark
    // navigationStyle: 'custom', // 全局导航栏样式，仅支持以下值：default 默认样式；custom 自定义导航栏，只保留右上角胶囊按钮
    navigationBarBackgroundColor: '@navBgColor', // 导航栏背景颜色，默认 #000000
    navigationBarTitleText: 'WeChat', // 导航栏标题文字内容
    navigationBarTextStyle: '@navTxtStyle' // 导航栏标题颜色，仅支持 black | white
  },
  tabBar: {
    custom: true,
    color: '#AAAAAA',
    selectedColor: '#000000',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'images/home_unactive.png',
        selectedIconPath: 'images/home_active.png',
        text: 'Home'
      },
      {
        pagePath: 'pages/find/index',
        iconPath: 'images/home_unactive.png',
        selectedIconPath: 'images/home_active.png',
        text: 'Find'
      },
      {
        pagePath: 'pages/my/index',
        iconPath: 'images/home_unactive.png',
        selectedIconPath: 'images/home_active.png',
        text: 'My'
      }
    ]
  }
})
