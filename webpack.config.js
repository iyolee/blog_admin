const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// 读取同一目录下的 base config
const config = require('./webpack.base.config')

// 配置模块相关
config.module.rules.push({
  test: /\.less$/,
  use: ['style-loader', 'css-loader?minimize', 'postcss-loader', 'less-loader'],
  include: path.resolve(__dirname, 'src'),
  exclude: path.resolve(__dirname, 'node_modules')
})

// 插件配置
config.plugins.push(
  // 官方文档推荐使用下面的插件确保 NODE_ENV
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }),
  new UglifyJSPlugin({
    uglifyOptions: {
      ie8: false,
      output: {
        // 删除所有的注释
        comments: false,
        // 最紧凑的输出
        beautify: false
      },
      mangle: {
        // prevent discarding or mangling of function names
        keep_fnames: true
      },
      compress: {
        // 删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有console语句
        drop_console: true,
        // 内嵌已定义但是只是用到一次的变量
        collapse_vars: true,
        // 提取出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }
  }),
  
  // 启动 minify
  // new webpack.LoaderOptionsPlugin({ minimize: true }),

  // 抽取 CSS 文件
  new ExtractTextPlugin({
    filename: '[name]_[contenthash: 8].css',
    allChunks: true,
    ignoreOrder: true
  })
)

module.exports = config
