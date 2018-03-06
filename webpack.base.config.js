const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 配置常量
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve(__dirname, 'src')
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve(__dirname, 'build')
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSETS_PUBLIC_PATH = '/assets/'

module.exports = {
  // 设置源代码的默认根路径
  context: SRC_PATH,
  // 注意 entry 中的路径都是相对于 SRC_PATH 的路径
  entry: {
    bundle: './app.js',
    vendor: './vendor'
  },
  output: {
    path: ASSETS_BUILD_PATH,
    // 所有资源的url前缀
    // publicPath: ASSETS_PUBLIC_PATH,
    filename: '[name].js',
    // 为动态加载的chunk配置输出文件的名称
    chunkFilename: '[name].js'
  },
  // 配置处理模块规则
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        // 缓存babel的编译结果
        use: ['babel-loader?cacheDirectory'],
        include: SRC_PATH,
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  // 配置寻找模块的规则
  resolve: {
    // 模块的后缀名
    extensions: ['.js', '.jsx'],
    // 是否强制导入语句写明文件后缀
    enforceExtension: false
  },
  // 配置插件
  plugins: [
    // 每次打包前，先清空原来目录中的内容
    new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
    // 启用 CommonChunkPlugin，提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: Infinity
    })
  ],
}
