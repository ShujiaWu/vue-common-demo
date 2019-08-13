'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// HTML 标题
const name = 'Vue Element UI 管理后台 Demo'
// 调试端口
const port = 18080 // dev port

// 详细配置查看 https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: '../dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    after: require('./mock/mock-server.js'),
    proxy: {
      '/api/': {
        target: 'http://localhost:7001'
        // target: 'http://lwf-admin.somibo.cn:18080'
      },
      '/file/': {
        target: 'http://localhost:3000'
        // target: 'http://lwf-admin.somibo.cn:18080'
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@vue-common': resolve('../vue-common'),
        '@common': resolve('../common')
      }
    }
  },
  chainWebpack (config) {
    const cdn = {
      // inject tinymce into index.html
      // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
      js: ['https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js']
    }
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })

    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg')).add(resolve('../common/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg')).add(resolve('../common/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
