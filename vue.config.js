'use strict'
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 8384;

module.exports = {
  publicPath: '/',
  outputDir: 'build',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/styles/sass/_variables.scss';`
      }
    }
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    name: process.env.VUE_APP_NAME,
    performance: {
      hints: false
    },
    resolve: {
      extensions: ['.ts', 'tsx', '.js', '.vue', '.json'],
      alias: {
        '@': resolve('src')
      }
    }
  },
  pluginOptions: {},
  transpileDependencies: ['vuetify']
}
