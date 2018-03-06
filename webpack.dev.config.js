const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// 读取同一目录下的 base config
const config = require('./webpack.base.config')

// 配置不用被打包的模块
// config.externals = {
//   'react': 'React',
//   'react-dom': 'ReactDOM'
// }

// 输出文件的性能检查配置
config.performance = {
  // 有性能问题时输出警告
  hints: 'warning'
}

// 包含有用的文件路径信息到生成的代码里
config.output.pathinfo = true
// 浏览器开发者工具里显示的源码模块名称
config.output.devtoolModuleFilenameTemplate = 'webpack:///[resource-path]'

// 配置source-map类型
config.devtool = 'source-map'

// 控制台输出日志控制
config.stats = {
  assets: true,
  colors: true,
  errors: true,
  errorDetails: true,
  hash: true

}

// 添加 webpack-dev-server 相关的配置项
config.devServer = {
  // 启用gzip压缩
  compress: true,
  // 配置devServer服务器文件根目录
  contentBase: path.join(__dirname, 'src'),
  // 运行端口3000
  port: 8086,
  // 通过代理客户端控制网页刷新
  inline: true,
  //开启模块热替换功能
  hot: true,
  // 开发HTML5 History API网页
  historyApiFallback: true,
  // 启用https
  // https: true,
  // 监听模式选项
  watchOptions: {
    // 不监听的文件或文件夹
    ignored: /node_modules/,
    // 监听到变化后等300ms再执行
    aggregateTimeout: 300,
    // 每秒询问1000次指定的文件有没有变化
    poll: 1000
  }
}
// 有关 Webpack 的 API 本地代理，另请参考 https://webpack.github.io/docs/webpack-dev-server.html#proxy

// 配置模块相关
config.module.rules.push({
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader',
    'less-loader'
  ],
  include: path.resolve(__dirname, 'src'),
  exclude: path.resolve(__dirname, 'node_modules')
})

// 添加 Sourcemap 支持
config.plugins.push(
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    // vendor 通常不需要 sourcemap
    exclude: ['vendor.js']
  })
)

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin()
)

module.exports = config
