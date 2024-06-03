import type { UserConfigExport } from '@tarojs/cli'
export default {
  logger: {
    quiet: false,
    stats: true
  },
  env: { // 设置环境变量
    NODE_ENV: '"development"', // JSON.stringify('development')
    TARO_APP_PROXY: '"https://request.cn"'
    // TARO_APP_PROXY: '"https://collectwinep.jinhui365.cn"'
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport
