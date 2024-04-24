export default defineAppConfig({
  darkmode: true,
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
        'login/index'
      ]
      // independent: true
    }
  ],
  window: {
    backgroundTextStyle: '@bgTxtStyle',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
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
