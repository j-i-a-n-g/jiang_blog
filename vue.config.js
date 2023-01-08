// const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      // 生产环境
      // 删除所有的console.log
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      optimization: {
        minimize: true
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              }
            }
          }),
          new HtmlWebpackPlugin({
            minify:{
              minifyCSS:false, // 是否压缩css
              collapseWhitespace:true, // 是否折叠空格
              removeComments:true // 是否移除注释
            }
          })
        ]
      }
    } else {
      // 开发环境
    }
    return {
      resolve: {
        alias: {
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/img'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://music.zzhitong.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/node' : {
        target: 'http://localhost:120',
        ws:true,
        changeOrigin: true,
        pathRewrite: {
          '^/node': ''
        }
      }
    }
  }
}
