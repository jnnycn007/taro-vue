import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'
import path from 'path'
import Components from 'unplugin-vue-components/webpack'
import NutUIResolver from '@nutui/auto-import-resolver'
// import path from 'path'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
// @ts-ignore
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport = {
    projectName: 'taro-vue',
    date: '2024-4-15',
    designWidth (input) {
      // 配置 NutUI 375 尺寸
      // @ts-ignore
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    // 开启 HTML 插件
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {
    },
    alias: {
      '@/images': path.resolve(__dirname, '..', 'src/images'),
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/utils': path.resolve(__dirname, '..', 'src/utils')
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'vue3',
    /*
      解决引入 @nutui/icons-vue-taro 后使用 webpack5 编辑报错
      app.js错误:
      Error: module 'prebundle/vendors-node_modules_taro_weapp_prebundle_nutui_icons-vue-taro_js.wxss.js' is not defined,
      require args is './prebundle/vendors-node_modules_taro_weapp_prebundle_nutui_icons-vue-taro_js.wxss'
    */
    compiler: {
      type: 'webpack5',
      prebundle: { // 是否开启依赖预编译功能
        enable: false
      }
    },
    cache: { // Webpack5 持久化缓存配置。默认不开启持久化缓存功能。但当开发者能处理好缓存策略时，强烈建议开启缓存，这能大大提高二次编译速度。
      enable: true // 是否开启持久化缓存。参考：https://docs.taro.zone/docs/config-detail#cacheenable
    },
    mini: {
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.plugin('unplugin-vue-components').use(Components({
          resolvers: [
            NutUIResolver({
              taro: true
            })
          ]
        }))
      },
      lessLoaderOption: { // 配置全局less变量
        lessOptions: {
          modifyVars: {
            themeColor: '#1677FF', // 主题色
            linkColor: '#008EEE', // 链接色
            textColor: 'rgba(0, 0, 0, 0.88)' // 文本基础色
          }
        }
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            // selectorBlackList: ['nut-']
          }
        },
        url: {
          enable: true,
          config: {
            limit: 1024 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.plugin('unplugin-vue-components').use(Components({
          resolvers: [
            NutUIResolver({
              taro: true
            })
          ]
        }))
      },
      publicPath: '/',
      staticDirectory: 'static',
      esnextModules: ['nutui-taro', 'icons-vue-taro'],
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      lessLoaderOption: { // 配置全局less变量
        lessOptions: {
          modifyVars: {
            themeColor: '#1677FF', // 主题色
            linkColor: '#008EEE', // 链接色
            textColor: 'rgba(0, 0, 0, 0.88)' // 文本基础色
          }
        }
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      devServer: {
        port: 10086
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
