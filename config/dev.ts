import type { UserConfigExport } from '@tarojs/cli'
export default {
  logger: {
    quiet: false,
    stats: true
  },
  env: { // 设置环境变量
    NODE_ENV: '"development"', // JSON.stringify('development')
    TARO_APP_PROXY: '"https://www.request.cn"'
  },
  mini: {},
  h5: {
    devServer: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: 'https://www.h5.cn',  // h5 服务端地址
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
} satisfies UserConfigExport
